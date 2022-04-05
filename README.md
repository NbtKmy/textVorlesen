# Vorlesen

Mit diesem Addon kann man die markierte Textstelle auf einer Webseite vorlesen lassen.
... Allerdings ist die Sprache "Japanisch" voreingestellt... Also nur die japanische Textstelle markieren...

Seitdem ich die Version des Manifest von 2 auf 3 ändern wollte, taucht die Fehlermeldung von Chrome "speechSynthesis is not defined"...

## Installation 

1. Die Dateien dieses Repository herunterladen und entpacken
1. Die Seite für "Extensions" für den Browser öffnen
1. "Developer mode" einschalten
1. Den Button "Load unpacked" klicken und den entpackten Ordner auswählen

## Anwendung

1. Eine Textstelle in einer Webseite markieren
1. Durch Rechtsklick das Menü öffnen
1. "Vorlesen!" klicken
1. Dann sollte die ausgewählte Textstelle vorgelesen. 

## ToDo
 ~~- Vielleicht kann man eine Einstellungskonsole erstellen, durch die man Stimmhöhe, Geschwindigkeit und Sprache einstellen kann.~~ 
- Die Textstelle mit Rubi in HTML `<ruby><rb>仏蘭西</rb><rp>（</rp><rt>フランス</rt><rp>）</rp></ruby>` wird dopelt gelesen. Es muss nur den Inhalt vom <rt>-Tag vorgelesen werden

## Thanks to  
[いらすとや](https://www.irasutoya.com/)  
[Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
