# BKMRK Backend

Das Backend von bkmrk hat Endpunkte für REST und GraphQL. Das Backend ist in ExpressJS geschrieben. Der GraphQL Endpunkt ist mit Apollo Server umgesetzt. Die Authentifizierung ist mit PassportJS implementiert. Die App erwartet zwei Datenbanken, eine Redis Datenbank für das Sessionhandling und eine PostgreSQL Datenbank für persistente Daten.

## Datenbanken mit Docker Development

docker run -p 5433:5432 --name bkmrk-backend-postgres -e POSTGRES_USER=root -e POSTGRES_PASSWORD=mysecretpassword -d postgres

## Build docker image

`docker build -t jurekbarth/bkmrk-backend .`

Update Docker Compose with newer Image

`docker-compose up -d --no-deps --build backend`
