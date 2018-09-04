# BKMRK Reader

Um Unterwegs das Datenvolumen zu minimieren, reicht es häufig eine reine Textversion einer Website zu haben. Dazu wird der Hauptinhalt aus der Seite extrahiert (BKMRK Crawler).
Diese Inhalte könnte man nun direkt ausspielen über einen einfachen Webserver. Die Inhalte können allerdings auch Bilder und/oder Videos enthalten. Die Inhalte werden als Javascript Template Literal ausgespielt und Clientseitig geparsed. Dadurch können Bilder und IFrames ersetzt werden und nur bei Klick geladen werden. So können Seiten um ein vielfaches kleiner gehalten werden. So hat z.B. folgender SmashingMagazine Artikel, https://www.smashingmagazine.com/2018/01/front-end-performance-checklist-2018-pdf-pages/,ca. 30mb auf dem Desktop, auf dem Handy noch 3.4mb und optimiert auf den Text noch 40kb komprimiert.
Diese kleine Optimierung macht das Lesen von Artikeln unterwegs zum Kinderspiel.

## Build docker image

`docker build -t jurekbarth/bkmrk-reader .`
