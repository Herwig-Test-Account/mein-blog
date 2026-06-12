// functions/api/generate.js
// Generiert einen Artikel via Anthropic API.
// Sicherheits-/Qualitaetsregeln gemaess SECURITY.md:
//  - API-Key nur server-seitig (env.ANTHROPIC_API_KEY)
//  - Eingaben validiert
//  - Ausgabe wird bereinigt: umschliessender Codeblock entfernt
//  - Vollstaendiges Frontmatter (title, date, draft, tags, description)
//    wird erzwungen, damit TinaCMS den Artikel sauber anzeigt
//  - keine offenen CORS-Header (gleiche Domain)

const MAX_TITLE = 200;

// Entfernt einen umschliessenden ```-Codeblock, falls vorhanden.
function stripCodeFence(text) {
  let t = text.trim();
  // Anfangszeile wie ``` oder ```markdown entfernen
  t = t.replace(/^```[a-zA-Z]*\s*\n/, "");
  // Abschliessende ``` entfernen
  t = t.replace(/\n```\s*$/, "");
  return t.trim();
}

// Stellt sicher, dass am Anfang ein vollstaendiges Frontmatter steht.
// Liest vorhandene Felder aus einem eventuellen Frontmatter und ergaenzt
// fehlende Pflichtfelder. Erzwingt draft: true.
function ensureFrontmatter(markdown, { title, description, tags }) {
  const today = new Date().toISOString().slice(0, 10);
  let body = markdown;
  const existing = {};

  // Vorhandenes Frontmatter am Anfang erkennen und herausloesen
  if (markdown.startsWith("---")) {
    const end = markdown.indexOf("\n---", 3);
    if (end !== -1) {
      const front = markdown.slice(3, end).trim();
      body = markdown.slice(end + 4).replace(/^\s*\n/, "");
      front.split("\n").forEach((line) => {
        const m = line.match(/^([a-zA-Z_]+)\s*:\s*(.*)$/);
        if (m) existing[m[1].toLowerCase()] = m[2].trim();
      });
    }
  }

  const esc = (s) => String(s).replace(/"/g, '\\"');
  const finalTitle = existing.title ? existing.title.replace(/^["']|["']$/g, "") : title;
  const finalDesc = existing.description ? existing.description.replace(/^["']|["']$/g, "") : (description || "");
  const tagStr = (tags && tags.length)
    ? `[${tags.map((t) => `"${esc(t)}"`).join(", ")}]`
    : (existing.tags || "[]");

  const fm = [
    "---",
    `title: "${esc(finalTitle)}"`,
    `date: ${today}`,
    "draft: true",
    `tags: ${tagStr}`,
    `description: "${esc(finalDesc)}"`,
    "---",
    "",
  ].join("\n");

  return fm + "\n" + body.trim() + "\n";
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.ANTHROPIC_API_KEY) {
    return json({ error: "Server nicht korrekt konfiguriert." }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Ungueltige Anfrage." }, 400);
  }

  const title = (body.title || "").trim();
  const description = (body.description || "").toString();
  const language = (body.language || "Deutsch").toString();
  const length = (body.length || "800-1200").toString();
  const tags = Array.isArray(body.tags) ? body.tags.slice(0, 10) : [];

  if (!title || title.length > MAX_TITLE) {
    return json({ error: "Titel fehlt oder ist zu lang." }, 400);
  }

  const systemPrompt =
`Du bist ein professioneller Content-Autor fuer Supply Chain Management im deutschsprachigen Mittelstand.
Schreibe sachlich, direkt und ohne Marketing-Sprache.
Struktur: Einleitung, H2-Abschnitte, Prueffragen, Fazit.
Laenge: ${length} Woerter.
Sprache: ${language}.

WICHTIG zur Ausgabe:
- Antworte AUSSCHLIESSLICH mit dem reinen Markdown-Artikel.
- KEINE Code-Bloecke, KEINE umschliessenden Backticks (kein \`\`\`).
- Beginne direkt mit dem YAML-Frontmatter zwischen --- und ---.
- Das Frontmatter enthaelt: title, date, draft, tags, description.`;

  const userPrompt =
`Schreibe einen Blogartikel ueber: "${title}"
${description ? `Zusaetzliche Anweisungen: ${description}` : ""}
${tags.length ? `Tags: ${tags.join(", ")}` : ""}`;

  let apiRes;
  try {
    apiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });
  } catch {
    return json({ error: "Verbindung zur KI fehlgeschlagen." }, 502);
  }

  const data = await apiRes.json();
  if (!data || !data.content || !data.content[0] || !data.content[0].text) {
    return json({ error: "Keine gueltige Antwort von der KI." }, 502);
  }

  const cleaned = stripCodeFence(data.content[0].text);
  const finalArticle = ensureFrontmatter(cleaned, { title, description, tags });

  return json({ content: finalArticle }, 200);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
