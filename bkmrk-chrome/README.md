# BKMRK Chrome

Docker Image, dass dazu verwendet wird einen Screenshot einer Website zu machen. Es werden zwei Umgebungsvariablen übergeben, eine für die Url `TARGET_URL` und eine für den Dateinamen `UUID`. Der weiteren gibt es wird ein Volume eingebunden, dass dazu Dient den Screenshot aus dem Crawler Backend abrufen zu können.

## Vorraussetzungen

Eine Version von Docker, das Userverzeichnis muss entsprechend angepasst werden. Am besten Linux als OS, sollte allerdings auch unter Windows und MacOS funktionieren.

## Image erstellen

Um das Image zu erstellen ist der folgende Befehl im Verzeichnis auszuführen.
`docker build -t jurekbarth/bkmrk-chrome:latest .`

Anschließend kann man das erstellte Image testen:
`docker run --cap-add=SYS_ADMIN -v /Users/jurekbarth/dev/bkmrk/data:/images -e TARGET_URL=https://jurekbarth.de -e UUID=test jurekbarth/bkmrk-chrome`
