# SECURITY.md — Sicherheitsrichtlinie

> **Status:** Verbindliche technische Detailregeln für dieses Repository.
> **Geltung:** Diese Datei ist bei ALLEN sicherheitsrelevanten Schritten
> (Functions, Tokens, Authentifizierung, Deployment, Abhängigkeiten)
> maßgeblich und einzuhalten.
> **Herkunft:** Entwickelt am Test-Dummy, übertragbar auf alle Projektseiten
> (golf-lernen.at, Circly.at). Pro Seite anzupassen, nicht blind zu kopieren.

---

## 0. Grundprinzip

Sicherheit hat Vorrang vor Geschwindigkeit und Bequemlichkeit. Im Zweifel
gilt die sichere, langsamere Variante. Kein unsauberer Workaround geht in
Produktion — wenn etwas nicht sauber lösbar ist, wird das benannt und
nicht umgangen.

Dieses Setup ist für kommerziellen Einsatz vorgesehen. Das bedeutet:
professioneller technischer Standard ist Pflicht. Es bedeutet NICHT, dass
diese Datei ein externes Security-Audit oder eine rechtliche Prüfung
(z. B. DSGVO, Auftragsverarbeitung) ersetzt. Vor dem Go-live mit echten
Kunden- oder Personendaten ist beides separat zu klären (siehe Abschnitt 8).

---

## 1. Secrets-Management

**Regel:** Tokens, API-Keys und Passwörter gehören niemals in den Browser,
ins Frontend-JavaScript oder ins Git-Repository.

Erlaubt ist ausschließlich:
- Speicherung als verschlüsseltes Server-Secret (Cloudflare Environment
  Secret, Typ "Secret", nicht "Text").
- Lokal in einer `.env`-Datei, die in `.gitignore` steht und niemals
  committet wird.

Konkret für dieses Repo:
- `ANTHROPIC_API_KEY` → nur als Cloudflare Secret + lokal in `.env`.
- `TINA_TOKEN` → nur als Cloudflare Secret + lokal in `.env`.
- `GITHUB_TOKEN` (Publish-Function) → nur als Cloudflare Secret + lokal in `.env`.
- `NEXT_PUBLIC_TINA_CLIENT_ID` → ist öffentlich (Client-ID, kein Secret),
  darf als "Text" gesetzt werden.

**Prüfschritt vor jedem Commit:** Enthält der Diff einen String, der wie
ein Schlüssel aussieht (sk-, ghp_, github_pat_, lange Hex-Strings)? Wenn ja:
STOPP, nicht committen, Ursache beheben.

**Token-Rotation:** Wird ein Secret versehentlich exponiert (Logs, Screenshot,
versehentlicher Commit), wird es sofort widerrufen und neu erzeugt — nicht
"später". Ein einmal exponierter Token gilt dauerhaft als kompromittiert.

---

## 2. Least Privilege (minimale Rechte)

**Regel:** Jeder Zugang und jeder Token erhält nur die minimal nötigen
Rechte und den engstmöglichen Scope. Keine Allzweck-Tokens.

- GitHub-Tokens: immer **Fine-grained Personal Access Tokens**, beschränkt
  auf das EINE benötigte Repository, mit nur den nötigen Berechtigungen
  (für Publish: "Contents: Read and write" — mehr nicht).
- Klassische GitHub-Tokens (classic PAT) mit kontoweitem Zugriff sind
  untersagt.
- TinaCloud-Tokens: read-only wo möglich; Schreibrechte nur wo zwingend.
- Pro Funktion ein eigener Token mit eigenem Scope, statt eines Tokens
  für alles. So begrenzt ein Leak den Schaden.
- Ablaufdatum (Expiration) setzen, wo die Plattform es erlaubt.

---

## 3. Authentifizierung & Zugang

- **2-Faktor-Authentifizierung (2FA) ist Pflicht** auf allen beteiligten
  Plattformen: GitHub, Cloudflare, TinaCloud, Anthropic Console.
- Für das Redaktions-Team: definiertes Rollenkonzept (z. B. Admin, Editor,
  Autor) mit jeweils nur den nötigen Rechten.
- Keine geteilten Sammel-Accounts. Jede Person hat einen eigenen Zugang,
  damit Änderungen zurückverfolgbar bleiben.
- Zugänge ausgeschiedener Team-Mitglieder werden umgehend entzogen.

---

## 4. Functions, Eingaben & Missbrauchsschutz

Cloudflare Functions sind die einzige Stelle, an der Secrets verwendet
werden. Sie sind die Sicherheitsgrenze zwischen Browser und externen APIs.

**Regeln:**
- Der Browser ruft nur die eigene Function auf. Die Function spricht mit
  externen APIs (Anthropic, GitHub). Secrets verlassen nie den Server.
- **Eingabevalidierung:** Alle vom Browser kommenden Daten werden in der
  Function geprüft, bevor sie verwendet werden (Pflichtfelder vorhanden,
  Länge begrenzt, Typ korrekt). Kein ungeprüftes Durchreichen an APIs oder
  in Dateipfade.
- **Pfad-Sicherheit:** Bei Dateinamen, die aus Nutzereingaben entstehen
  (z. B. Artikel-Slug), nur erlaubte Zeichen zulassen (a–z, 0–9, Bindestrich).
  Punkte, Schrägstriche und Backslashes entfernen, um zu verhindern, dass
  außerhalb des Zielordners geschrieben wird (Path Traversal).
- **Missbrauch / Kostenschutz:** Generier- und Publish-Endpunkte rufen
  bezahlte APIs auf. Sie sind gegen Massenaufrufe abzusichern (Rate Limiting),
  damit niemand API-Kosten in die Höhe treibt oder das Repo flutet.
  Mindestens: Zugang zu diesen Endpunkten nicht anonym/öffentlich
  bewerben; perspektivisch hinter Authentifizierung legen.
- **CORS:** Functions, die nur von der eigenen Seite aufgerufen werden,
  brauchen keine offenen Cross-Origin-Header (`Access-Control-Allow-Origin: *`).
  Solche Header werden entfernt, wenn sie nicht gebraucht werden.
- **Fehlermeldungen:** Keine internen Details (Stacktraces, Token-Teile,
  interne Pfade) an den Browser zurückgeben.

---

## 5. Deployment & Trennung der Umgebungen

- **Nichts Ungeprüftes geht live.** Automatisch (AI-)generierte Inhalte
  werden immer mit `draft: true` erstellt und erst nach menschlicher Prüfung
  veröffentlicht.
- **Test vs. Produktion trennen.** Testumgebungen (Dummy, Staging) sind über
  `robots.txt` und `noindex` für Suchmaschinen und LLM-Crawler gesperrt.
  Produktionsseiten haben dies bewusst NICHT — diese Unterscheidung wird pro
  Seite überprüft, bevor sie live geht.
- **Build-Output (`public/`) gehört nicht ins Repo** — er wird beim Deploy
  erzeugt. Steht in `.gitignore`.
- Der `noindex`-Status einer Testseite wird vor jedem Übergang in Produktion
  bewusst geprüft und ggf. umgestellt.

---

## 6. Abhängigkeiten (Dependencies)

- Pakete (npm) werden aktuell gehalten; bekannte Schwachstellen werden
  zeitnah behoben.
- Vor dem Hinzufügen einer neuen Abhängigkeit: Ist sie nötig? Ist sie
  gepflegt und verbreitet? Jede Abhängigkeit ist potenzielle Angriffsfläche.
- `npm audit` regelmäßig prüfen; kritische Funde vor Produktion schließen.

---

## 7. Audit & Nachvollziehbarkeit

- Alle inhaltlichen Änderungen laufen über Git und sind damit versioniert
  und zurückverfolgbar (wer, wann, was).
- Im Team: Co-Authoring/eindeutige Identitäten aktiv, damit Commits der
  richtigen Person zugeordnet sind.
- Sicherheitsrelevante Änderungen (neue Tokens, neue Functions, Auth-Änderungen)
  werden im Commit-Text klar benannt.

---

## 8. Grenzen dieses Dokuments (ehrliche Erwartungssteuerung)

Diese Richtlinie schafft ein solides technisches Fundament und vermeidet die
häufigsten gravierenden Fehler. Sie ersetzt NICHT:

- ein **externes Security-Audit / Penetrationstest** vor produktivem Einsatz
  mit echten Daten,
- eine **rechtliche Prüfung** (DSGVO, Auftragsverarbeitungsverträge,
  Datenschutzerklärung, Impressum, Cookie-/Tracking-Rechtslage),
- formale **Zertifizierungen** (z. B. ISO 27001), falls vertraglich gefordert.

Diese Punkte werden markiert und separat adressiert, sobald eine Seite
tatsächlich kommerziell mit Kunden- oder Personendaten live geht.

---

## 9. Schnell-Checkliste vor jedem sicherheitsrelevanten Schritt

1. Wurde die Sicherheitsimplikation ZUERST benannt?
2. Liegt ein Secret im Spiel? → Nur als Cloudflare Secret / `.env`, nie im Browser/Repo.
3. Hat der Token den minimal nötigen Scope?
4. Werden Eingaben in der Function validiert?
5. Geht generierter Inhalt als `draft: true`?
6. Ist Test von Produktion getrennt (noindex korrekt)?
7. Steht im Diff versehentlich ein Schlüssel?
8. Braucht es ein externes Audit / rechtliche Prüfung, bevor das live geht?
