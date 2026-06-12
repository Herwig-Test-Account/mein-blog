export async function onRequestPost(context) {
  const { request, env } = context;
  
  const body = await request.json();
  const { title, description, tags, language, context_docs } = body;

  const systemPrompt = `Du bist ein professioneller Content-Autor für Supply Chain Management im deutschsprachigen Mittelstand. 
Schreibe sachlich, direkt und ohne Marketing-Sprache.
Struktur: Einleitung → H2-Abschnitte → Prüffragen → Fazit.
Länge: 800-1200 Wörter.
Format: Markdown mit Frontmatter.
${context_docs ? `Kontext-Dokumente:\n${context_docs}` : ''}`;

  const userPrompt = `Schreibe einen Blogartikel über: "${title}"
${description ? `Zusätzliche Anweisungen: ${description}` : ''}
${tags ? `Tags: ${tags.join(', ')}` : ''}
${language ? `Sprache: ${language}` : 'Sprache: Deutsch'}

Antworte NUR mit dem fertigen Markdown-Artikel inklusive Frontmatter.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      system: systemPrompt,
      messages: [
        { role: 'user', content: userPrompt }
      ]
    })
  });

  const data = await response.json();
  
  return new Response(JSON.stringify({
    content: data.content[0].text
  }), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}