# BKMRK Crawler

Der bkmrk crawler, dient dazu die gespeicherten URLs mit Metadaten anzureichern. Der Crawler startet den Screenshot Service und ruft Metadaten über mercury.postlight.com ab. Damit das ganze Skalierbar bleibt, werden die zu crawlenden Websites in eine Warteschlange geschrieben. Anschließend werden diese nacheinander abgearbeitet.

## Mercury Postlight

Mercury Postlight (https://mercury.postlight.com/) ist ein kostenloser Service, der einen API Key benötigt.

## Kue.js

Kue.js ist die Library, die für die Warteschlange eingesetzt wird. Kue benötigt eine Redis Datenbank, diese kann man einfach über Docker lokal laufen lassen:
`docker run --name bkmrk-crawler-redis -d -p 6380:6379 redis`

## Build docker image

`docker build -t jurekbarth/bkmrk-crawler .`
