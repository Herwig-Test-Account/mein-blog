---
draft: true
---

```markdown
---
title: "Wiederbeschaffungszeit richtig berechnen"
description: "Wie mittelständische Unternehmen die Wiederbeschaffungszeit korrekt ermitteln und welche Fehler dabei regelmäßig unterlaufen."
tags: []
date: 2025-01-01
---

# Wiederbeschaffungszeit richtig berechnen

Die Wiederbeschaffungszeit ist eine der zentralen Kennzahlen im Bestandsmanagement. Sie bestimmt, wie hoch der Sicherheitsbestand sein muss, wann eine Bestellung ausgelöst wird und wie reaktionsfähig ein Unternehmen bei Lieferengpässen ist. Dennoch wird sie in vielen mittelständischen Unternehmen entweder geschätzt, aus dem ERP-System ungeprüft übernommen oder schlicht zu vereinfacht berechnet. Das führt zu überhöhten Lagerbeständen, unnötigen Fehlmengen oder beidem gleichzeitig.

Dieser Artikel erklärt, wie die Wiederbeschaffungszeit korrekt berechnet wird, welche Zeitanteile darin enthalten sein müssen und wie Sie die Zahl in Ihrem Unternehmen überprüfen können.

---

## Was die Wiederbeschaffungszeit tatsächlich umfasst

Die Wiederbeschaffungszeit (WBZ) ist der Zeitraum vom Erkennen eines Bedarfs bis zur Verfügbarkeit des Materials am Verbrauchsort. Viele Unternehmen setzen sie mit der reinen Lieferzeit des Lieferanten gleich. Das ist falsch.

Die vollständige Wiederbeschaffungszeit setzt sich aus mehreren Zeitanteilen zusammen:

**1. Bedarfserkennungszeit**
Die Zeit, die vergeht, bis ein Bedarf überhaupt identifiziert wird. Bei manuell gesteuerten Prozessen oder wöchentlichen Disposition kann das mehrere Tage betragen.

**2. Bestellabwicklungszeit**
Die interne Bearbeitungszeit: Angebot einholen, Bestellung erstellen, freigeben, versenden. Je nach Genehmigungsprozess und Beleglauf dauert das zwischen wenigen Stunden und mehreren Tagen.

**3. Lieferantenvorlaufzeit**
Die Zeit, die der Lieferant vom Bestelleingang bis zur Warenbereitstellung benötigt. Dieser Wert steht häufig im Lieferantenvertrag oder in der Artikelstammdatei – aber entspricht er der Realität?

**4. Transportzeit**
Vom Lieferanten bis zum Wareneingang des eigenen Unternehmens. Abhängig von Verkehrsträger, geografischer Entfernung und gewähltem Incoterm.

**5. Wareneingangsbearbeitung**
Entladen, Eingangsprüfung, Qualitätskontrolle, Einlagerung. Gerade bei prüfpflichtigen Teilen oder bei hohem Wareneingangsaufkommen kann das ein bis drei Tage dauern.

**Formel:**

```
WBZ = Bedarfserkennungszeit + Bestellabwicklungszeit + Lieferantenvorlaufzeit + Transportzeit + Wareneingangsbearbeitung
```

---

## Häufige Fehler bei der Berechnung

**Fehler 1: Nur die Lieferantenvorlaufzeit ansetzen**

Wird im ERP lediglich der Wert aus der Lieferantenvereinbarung gepflegt, fehlen sämtliche internen Zeitanteile. Bei einer nominellen Lieferzeit von sieben Tagen und zwei Tagen interner Bearbeitungszeit auf jeder Seite beträgt die tatsächliche WBZ elf Tage oder mehr. Der Sicherheitsbestand ist entsprechend zu niedrig kalkuliert.

**Fehler 2: Durchschnittswerte ohne Streuung**

Die Wiederbeschaffungszeit schwankt. Ein Lieferant liefert mal in fünf, mal in zwölf Tagen. Wer nur den Mittelwert ansetzt und die Varianz ignoriert, wird regelmäßig von Verzögerungen überrascht. Für die Sicherheitsbestandsberechnung ist die Standardabweichung der WBZ genauso relevant wie der Erwartungswert.

**Fehler 3: Einmalig berechnet, nie aktualisiert**

Wiederbeschaffungszeiten verändern sich. Lieferanten wechseln ihren Produktionsstandort, Transportrouten werden angepasst, interne Prozesse werden digitalisiert oder durch Personalwechsel langsamer. Ein WBZ-Wert, der vor drei Jahren eingepflegt wurde, ist selten noch aktuell.

**Fehler 4: Gleichbehandlung aller Artikel**

Nicht jedes Material hat dieselbe WBZ. A-Teile mit kritischem Einfluss auf die Produktion, Standardartikel beim Großhändler und Sonderanfertigungen beim Spezialisten haben vollständig unterschiedliche Beschaffungszeiten. Pauschale Annahmen führen zu systematischen Fehlern.

---

## So ermitteln Sie realistische Werte

**Schritt 1: Historische Daten auswerten**

Ziehen Sie aus Ihrem ERP die tatsächlichen Durchlaufzeiten der letzten 12 bis 24 Monate. Relevante Felder: Bestelldatum, Bestätigungsdatum, tatsächliches Lieferdatum, Wareneingangs-Buchungsdatum. Die Differenz zwischen Bestellauslösung und Einlagerung ist Ihre reale WBZ.

**Schritt 2: Verteilung analysieren**

Berechnen Sie nicht nur den Mittelwert, sondern auch den Median, das 85. Perzentil und die Standardabweichung. Das 85. Perzentil ist besonders nützlich: Es gibt die WBZ an, die in 85 Prozent der Fälle eingehalten wird – ein sinnvoller Planungsansatz für den Sicherheitsbestand.

**Schritt 3: Interne Zeitanteile messen**

Protokollieren Sie für einen repräsentativen Zeitraum, wann ein Bedarf erkannt wird und wann die Bestellung tatsächlich beim Lieferanten eingeht. Dieser interne Vorlauf wird erfahrungsgemäß stark unterschätzt.

**Schritt 4: Segmentieren nach Materialgruppe und Lieferant**

Bilden Sie WBZ-Klassen: zum Beispiel nach Lieferant, Warengruppe oder ABC-Klassifikation. Pflegen Sie im ERP artikelspezifische Werte statt eines Pauschalwerts je Lieferant.

**Schritt 5: Regelmäßig überprüfen**

Legen Sie fest, in welchem Rhythmus WBZ-Werte überprüft werden – mindestens einmal jährlich, bei Lieferantenwechsel oder nach signifikanten Lieferverzögerungen sofort.

---

## Auswirkungen auf Sicherheitsbestand und Bestellpunkt

Die Wiederbeschaffungszeit ist direkt mit zwei weiteren Kennzahlen verknüpft.

**Sicherheitsbestand:**

```
Sicherheitsbestand = Sicherheitsfaktor × √(WBZ) × Standardabweichung des Verbrauchs
```

Eine zu kurz angesetzte WBZ führt zu einem zu niedrigen Sicherheitsbestand. Selbst wenn der Servicelevel-Faktor korrekt gewählt ist, sind Fehlmengen vorprogrammiert.

**Bestellpunkt (Meldebestand):**

```
Bestellpunkt = (durchschnittlicher Verbrauch pro Tag × WBZ) + Sicherheitsbestand
```

Wer die WBZ um zwei Tage unterschätzt, löst Bestellungen systematisch zu spät aus. Bei einem Tagesverbrauch von 50 Einheiten bedeutet das ein Defizit von 100 Einheiten, das der Sicherheitsbestand auffangen muss – oder nicht.

---

## Prüffragen für Ihre Praxis

Nutzen Sie die folgenden Fragen, um den Stand in Ihrem Unternehmen einzuschätzen:

- Enthält die im ERP hinterlegte WBZ die internen Bearbeitungszeiten auf Einkaufs- und Wareneingangsseite?
- Basiert die WBZ auf historischen Ist-Daten oder auf Schätzungen bzw. Lieferantenangaben?
- Kennen Sie die Streuung der Wiederbeschaffungszeit für Ihre A-Teile?
- Wann wurden die WBZ-Werte zuletzt systematisch überprüft?
- Gibt es Artikel mit einem einzelnen Lieferanten, deren WBZ trotzdem pauschal hinterlegt ist?
- Wie groß ist die Differenz zwischen dem gebuchten Bestelldatum und dem tatsächlichen Eingang der Auftragsbestätigung?

---

## Fazit

Die Wiederbeschaffungszeit ist keine statische Zahl im Artikelstamm. Sie ist das Ergebnis mehrerer Zeitanteile entlang des Bestellprozesses, schwankt in der Praxis erheblich und verändert sich mit Lieferanten, Prozessen und Rahmenbedingungen. Wer sie korrekt berechnet – auf Basis realer Durchlaufzeiten, inklusive interner Anteile und mit Blick auf die Streuung – legt die Grundlage für einen bedarfsgerechten Sicherheitsbestand und einen funktionierenden Meldebestand.

Der erste Schritt ist meistens derselbe: die eigenen ERP-Daten auswerten und prüfen, ob die hinterlegten Werte der Realität entsprechen. Häufig ist die Abweichung größer als erwartet.
```