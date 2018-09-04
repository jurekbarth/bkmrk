# BKMRK Graphiql Explorer

Um die GraphQL API anschaulicher zu gestalten, gibt eine Bibliothek: GraphiQL. Mit GraphQL lässt sich die API spielerisch erkunden. Da GraphiQL von sich aus Authorisierung übernimmt, gibt es dieses extra Modul von bkmrk.space.

## Installation

1. `npm install`
2. `npm start`
3. Anschließend ist die Applikation unter `http://localhost:3004` zu finden.

## Verwendung

Das ganze ist recht selbsterklärend, bis auf den Token. Dieser Token wird auch in der Hauptapplikation verwendet. Es gibt also zwei Möglichkeiten entweder im normalen Frontend den Token über die Entwickler Tools raussuchen, oder einen neuen Nutzer erstellen oder sich über die API anmelden.

Anmeldung:

```
mutation {
  login(username: "DEINE_EMAIL", password: "DEIN_PASSWORT") {
    token
  }
}
```

Registrierung:

```
mutation {
  registerUser(firstName: "Vorname", lastName: "Nachname", email: "DEINE@MAIL.de", password: "SUPERSECRET") {
    token
  }
}
```

Wichtig hier wird bereits ein Token zurückgegeben, allerdings ist die Email-Adresse zu diesem Zeitpunkt noch nicht bestätigt. Es ist also notwendig eine echte Email anzugeben, damit der Email-Token an die angebene Emailadresse geschickt werden kann.

Gebt diesen bereits oben in das Feld ein und drückt auf `Set Token`

Anschließend bekommt man eine Email die in etwa so aussieht:

```
Wenn der Button nicht funktioniert verwende diese URL: http://localhost:3002/verify/51c004cb695def6a35e6aac9ffee40e9d696bf46
```

Der Email-Token ist also `51c004cb695def6a35e6aac9ffee40e9d696bf46`

Mit folgender Query könnt ihr eure Emailadresse bestätigen:

```
mutation {
  validateUserEmail(token: "51c004cb695def6a35e6aac9ffee40e9d696bf46") {
    success
  }
}
```

Anschließend kann man die API testen.

## Fragen?

Bei Fragen am besten einfach per Issue :)
