# Circly-AI-Test — Blog-Kontext für Claude Code

## Über diesen Blog
- Name: Circly-AI-Test
- Thema: Supply Chain Management, Disposition, Bestandsplanung
- Zielgruppe: SCM-Leiter und Einkaufsleiter im deutschsprachigen Mittelstand
- Ton: sachlich, direkt, keine Floskeln, keine Marketing-Sprache
- Sprache: Deutsch

## Technischer Stack
- Static Site Generator: Hugo
- Deployment: Cloudflare Pages (automatisch bei git push)
- Repository: https://github.com/Herwig-Test-Account/mein-blog
- Lokale Vorschau: hugo server -D → http://localhost:1313

## Dateistruktur
- Artikel: /content/posts/DATUM-titel.md
- Layouts: /layouts/
- CSS: /static/css/main.css

## Frontmatter-Format für jeden Artikel
---
title: "Titel des Artikels"
date: "YYYY-MM-DD"
draft: false
tags: ["Tag1", "Tag2"]
description: "Kurze Beschreibung unter 160 Zeichen für SEO."
---

## Artikel-Stil
- Struktur: Einleitung → H2-Abschnitte → konkrete Prueffragen → Fazit
- Laenge: 800-1200 Woerter
- Keine Umlaute im Dateinamen (ae statt ä, oe statt ö, ue statt ü)
- Prüffragen am Ende jedes Abschnitts fett markieren

## Publish-Workflow
1. Artikel schreiben: Datei in /content/posts/ erstellen
2. Lokal pruefen: hugo server -D
3. Publizieren: git add . && git commit -m "Titel" && git push

## Diese Seite ist NICHT indexiert
- robots.txt blockiert alle Crawler
- noindex Meta-Tag auf allen Seiten
- Kein Content darf in Suchmaschinen erscheinen