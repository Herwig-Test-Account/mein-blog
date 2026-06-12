// functions/api/publish.js
// Schreibt einen generierten Artikel als ENTWURF (draft) ins Repo.
// Sicherheitsregeln gemaess SECURITY.md:
//  - Token nur server-seitig (env.GITHUB_TOKEN), nie an den Browser
//  - Eingabevalidierung (Pflichtfelder, Laengengrenzen)
//  - Slug gegen Path Traversal gehaertet (nur a-z, 0-9, Bindestrich)
//  - draft:true wird erzwungen, bevor geschrieben wird
//  - keine internen Fehlerdetails an den Browser

const OWNER = "Herwig-Test-Account";
const REPO = "mein-blog";
const POSTS_DIR = "content/posts";
const MAX_TITLE = 200;
const MAX_CONTENT = 100000; // ~100 KB Schutzgrenze

// Titel -> sicherer Dateiname-Slug. Entfernt alles ausser a-z, 0-9, Bindestrich.
function makeSlug(title) {
  return title
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")   // alles Nicht-Erlaubte -> Bindestrich
    .replace(/^-+|-+$/g, "")        // fuehrende/abschliessende Bindestriche weg
    .slice(0, 80);                  // Laenge begrenzen
}

// Stellt sicher, dass das Frontmatter draft: true enthaelt.
// Wenn ein draft-Feld existiert, wird es auf true gesetzt; sonst ergaenzt.
function enforceDraft(markdown) {
  if (!markdown.startsWith("---")) {
    // Kein Frontmatter -> minimales Frontmatter mit draft:true voranstellen
    return `---\ndraft: true\n---\n\n${markdown}`;
  }
  const end = markdown.indexOf("---", 3);
  if (end === -1) {
    return `---\ndraft: true\n---\n\n${markdown}`;
  }
  let front = markdown.slice(3, end);
  const body = markdown.slice(end + 3);
  if (/^\s*draft\s*:/m.test(front)) {
    front = front.replace(/^\s*draft\s*:.*$/m, "draft: true");
  } else {
    front = front.replace(/\s*$/, "\n") + "draft: true\n";
  }
  return `---${front}---${body}`;
}

// UTF-8 sicher nach Base64 (fuer GitHub API content-Feld)
function toBase64Utf8(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // Token muss vorhanden sein (server-seitig)
  if (!env.GITHUB_TOKEN) {
    return json({ error: "Server nicht korrekt konfiguriert." }, 500);
  }

  // Body lesen
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Ungueltige Anfrage." }, 400);
  }

  const title = (body.title || "").trim();
  const markdown = (body.content || "").toString();

  // Eingabevalidierung
  if (!title || title.length > MAX_TITLE) {
    return json({ error: "Titel fehlt oder ist zu lang." }, 400);
  }
  if (!markdown || markdown.length > MAX_CONTENT) {
    return json({ error: "Inhalt fehlt oder ist zu gross." }, 400);
  }

  // Sicheren Dateinamen bauen
  const slug = makeSlug(title);
  if (!slug) {
    return json({ error: "Aus dem Titel liess sich kein gueltiger Dateiname bilden." }, 400);
  }
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const path = `${POSTS_DIR}/${date}-${slug}.md`;

  // draft:true erzwingen
  const safeMarkdown = enforceDraft(markdown);
  const contentB64 = toBase64Utf8(safeMarkdown);

  // An GitHub API schreiben
  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
  let ghRes;
  try {
    ghRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "circly-ai-test-publish",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Entwurf via AI-Generator: ${title}`,
        content: contentB64,
        branch: "main",
      }),
    });
  } catch {
    return json({ error: "Verbindung zu GitHub fehlgeschlagen." }, 502);
  }

  if (ghRes.status === 201 || ghRes.status === 200) {
    return json({ ok: true, path, draft: true });
  }
  if (ghRes.status === 422) {
    // 422 = Datei existiert evtl. schon (gleicher Titel am selben Tag)
    return json({ error: "Datei existiert bereits. Titel leicht aendern und erneut versuchen." }, 409);
  }
  // Keine internen Details/Token nach aussen geben
  return json({ error: "Speichern fehlgeschlagen." }, 502);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
