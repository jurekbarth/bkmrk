# bkmrk

Bkmrk ist eine Bookmarking Website/App.

## Systemvorraussetzungen

* PostgreSQL Datenbank
* REDIS Datenbank
* Node Version 9.30 und neuer
* NPM Version 5 und neuer
* Docker Version 17 und neuer
* Optional: Docker Compose

## Systemkomponenten

### bkmrk-backend

Das Backend, stellt die API zu Verfügung.

### bkmrk-crawler

Sammelt die Metadaten der Websites, die gespeichert werden. Wird über HTTP Endpunkte angesprochen. Ist nach außen nicht erreichbar.

### bkmrk-chrome

Headless Chrome Docker Instanz. Macht einen Screenshot einer Website und speichert diesen ab.

### bkmrk-frontend-rest

REST Frontend

mutation { registerUser(firstName: "abc", lastName: "ef", email: "post@jurekb.de", password: "12345678") { token } }

fetch('http://localhost:3000/login', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: 'post@jurek.de', password: '12345678' }) })

mutation { addLink(url: "https://test.de", tags: [{title: "test"}, {title: "abc"}]) { url } }
