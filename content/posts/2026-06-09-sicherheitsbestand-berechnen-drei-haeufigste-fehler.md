---
title: "Sicherheitsbestand berechnen: Die drei häufigsten Fehler im Mittelstand"
date: "2026-06-09"
draft: false
tags: ["Sicherheitsbestand", "Bestandsplanung", "Disposition", "SCM"]
description: "Viele Mittelständler berechnen ihren Sicherheitsbestand falsch – und zahlen dafür mit Lieferausfällen oder überhöhten Lagerkosten. Die drei häufigsten Fehler."
---

Zu viel Lager kostet Kapital. Zu wenig führt zu Lieferausfällen. Der Sicherheitsbestand soll genau diesen Zielkonflikt lösen – aber nur, wenn er richtig berechnet wird. In der Praxis sieht das oft anders aus: Viele mittelständische Unternehmen arbeiten mit Faustformeln oder Excel-Tabellen, die grundlegende Zusammenhänge ignorieren. Das Ergebnis sind entweder dauerhaft überhöhte Bestände oder regelmäßige Fehlmengen, die den Betrieb stören.

Dieser Artikel beschreibt die drei Fehler, die am häufigsten auftreten – und was eine belastbare Berechnung stattdessen berücksichtigen muss.

---

## Fehler 1: Nur den Durchschnittsverbrauch als Basis nehmen

Die einfachste Methode zur Berechnung des Sicherheitsbestands lautet: Durchschnittsverbrauch pro Tag multipliziert mit einer fixen Anzahl von Puffertagen. Das ist einfach zu verstehen und einfach umzusetzen – aber es bildet die Realität nicht ab.

Das Problem liegt in der Streuung des Verbrauchs. Ein Artikel, der im Schnitt 50 Einheiten pro Woche abgeht, kann in einer Woche 20 Einheiten und in der nächsten 90 Einheiten verbrauchen. Ein Sicherheitsbestand, der nur auf dem Mittelwert basiert, schützt nicht vor diesen Ausschlägen. Er liefert eine trügerische Sicherheit.

Richtig gemacht wird der Sicherheitsbestand auf Basis der Verbrauchsschwankung berechnet – also der Standardabweichung des Verbrauchs über einen repräsentativen Zeitraum. Je größer die Schwankung, desto höher muss der Puffer sein. Artikel mit konstantem Abgang brauchen deutlich weniger Sicherheitsbestand als Artikel mit hoher Variabilität – auch wenn der Durchschnittsverbrauch identisch ist.

Die Formel berücksichtigt außerdem den angestrebten Servicegrad: Welche Lieferfähigkeit soll für diesen Artikel gelten? 95 %, 98 %, 99,5 %? Jede Stufe hat einen Sicherheitsfaktor (z-Wert), der in die Berechnung einfließt. Dieser Schritt fehlt in vielen Mittelstandssystemen vollständig.

**Prüffragen für Ihre Disposition:**
- **Basiert Ihr Sicherheitsbestand auf der Standardabweichung des Verbrauchs oder nur auf dem Durchschnitt?**
- **Haben Sie für verschiedene Artikelklassen unterschiedliche Servicegrade definiert?**
- **Wann wurden Ihre Sicherheitsbestände zuletzt an das aktuelle Verbrauchsverhalten angepasst?**

---

## Fehler 2: Lieferzeitschwankungen werden ignoriert

Der zweite häufige Fehler ist ebenso systematisch: Die Berechnung berücksichtigt zwar die Lieferzeit – aber nur als fixen Durchschnittswert. Was fehlt, ist die Schwankung der Lieferzeit.

Ein Lieferant, der im Schnitt sieben Tage benötigt, liefert in der Praxis manchmal nach fünf Tagen, manchmal nach zwölf. Wenn Ihre Berechnung mit einem starren Wert von sieben Tagen arbeitet, ist der Sicherheitsbestand für alle Fälle ausgelegt, in denen die Lieferung pünktlich kommt. Die Fälle, in denen sie zu spät kommt, werden nicht abgedeckt.

Die korrekte Formel kombiniert beide Unsicherheitsquellen: Verbrauchsschwankung und Lieferzeitsschwankung. Das ergibt eine höhere Genauigkeit, weil die eigentliche Gefahr einer Fehlmenge meist nicht aus einem plötzlichen Nachfragepeak entsteht, sondern aus dem Zusammentreffen von etwas erhöhtem Verbrauch und etwas verzögerter Lieferung.

Praktisch bedeutet das: Sie brauchen nicht nur den durchschnittlichen Lieferzeitraum Ihrer Lieferanten, sondern auch die Standardabweichung dieser Lieferzeiten. Diese Daten sollten im System gepflegt sein – in vielen Mittelstandsunternehmen fehlen sie aber schlicht, weil Lieferzeitabweichungen nicht systematisch erfasst werden.

Wenn keine historischen Daten vorliegen, ist eine Schätzung immer noch besser als gar keine Berücksichtigung. Selbst eine konservative Annahme von ±20 % Lieferzeitstreuung liefert einen realistischeren Sicherheitsbestand als eine Formel, die diese Dimension komplett ausblendet.

**Prüffragen für Ihre Disposition:**
- **Erfassen Sie Lieferzeitabweichungen je Lieferant und Artikel systematisch?**
- **Fließt die Lieferzeitstreuung in Ihre Sicherheitsbestandsberechnung ein?**
- **Für welche Lieferanten haben Sie die größten Lieferzeitsschwankungen – und sind die betroffenen Artikel entsprechend abgesichert?**

---

## Fehler 3: Fixe Reichweiten statt einer parameterbasierten Berechnung

Der dritte Fehler ist kultureller Natur: Viele Unternehmen arbeiten nicht mit einer Formel, sondern mit Erfahrungswerten. "Wir halten immer drei Wochen Vorrat" oder "Klasse-A-Artikel bekommen vier Wochen Sicherheitsbestand" sind typische Aussagen.

Das klingt pragmatisch, hat aber einen gravierenden Nachteil: Die Reichweite ignoriert den Wert und die Umschlagsgeschwindigkeit des Artikels. Drei Wochen Sicherheitsbestand bei einem Artikel mit hohem Einstandspreis und stabiler Nachfrage ist reines Kapital im Regal. Bei einem günstigen C-Artikel mit stark schwankender Nachfrage kann dieselbe Reichweite zu wenig sein.

Reichweitenbasierte Ansätze führen systematisch zu Fehllagerung: teure Artikel werden zu stark bevorratet, kritische Artikel mit hoher Variabilität zu schwach. Das ist das Gegenteil einer intelligenten Bestandsstrategie.

Eine parameterbasierte Berechnung unterscheidet mindestens nach Verbrauchsschwankung, Lieferzeit und Servicegrad-Anforderung. Ergänzt werden kann sie durch ABC-XYZ-Klassifizierung: A-X-Artikel (hoher Wert, stabile Nachfrage) brauchen wenig Sicherheitsbestand, C-Z-Artikel (geringer Wert, stark schwankende Nachfrage) brauchen überproportional mehr – oder werden aus wirtschaftlichen Gründen komplett aus dem Lager genommen und nur bei Bedarf beschafft.

Wer diesen Schritt konsequent umsetzt, kann in der Regel 15 bis 25 % des gebundenen Kapitals freisetzen, ohne die Lieferfähigkeit zu verschlechtern – oft sogar bei gleichzeitiger Verbesserung.

**Prüffragen für Ihre Disposition:**
- **Basieren Ihre Sicherheitsbestände auf Reichweiten oder auf einer Formel mit Verbrauchsschwankung und Lieferzeit?**
- **Haben Sie Ihre Artikel nach ABC und XYZ klassifiziert – und differenzieren Sie den Sicherheitsbestand entsprechend?**
- **Welche Artikel haben aktuell den höchsten Sicherheitsbestand in Wochenumsätzen – und ist das strategisch begründet?**

---

## Fazit

Sicherheitsbestand ist kein Bauchgefühl und keine Faustregel. Er ist das Ergebnis einer Berechnung, die Verbrauchsschwankung, Lieferzeitstreuung und den angestrebten Servicegrad miteinander verbindet. Wer einen dieser drei Parameter ignoriert – oder mit fixen Reichweiten arbeitet statt mit einer Formel – zahlt dafür: entweder mit gebundenem Kapital oder mit Lieferausfällen.

Die gute Nachricht: Die notwendigen Daten liegen in den meisten ERP-Systemen vor. Was fehlt, ist oft die Methodik, nicht die Information. Wer die drei beschriebenen Fehler systematisch abstellt, macht seinen Sicherheitsbestand zu einem kalkulierten Steuerungsinstrument – und nicht zu einem Hoffnungswert im Regal.
