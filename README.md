# VTEAM - dummy-server med api-routes

Det här repot består av en express-server som innehåller ett antal api-routes (se nedan för detaljer).
Dummy-servern ska användas under utveckling av klienterna i kursen vteam.

Jag har skapat api-routes och modeller som ska likna slutprodukten så långt som möjligt.

## Kom igång
Klona repot och kör ```npm install```.

Starta servern med ```npm run start``` från roten av repot.

Alternativet är att starta den via docker. Då startar du den med ```docker-compose up --build``` från roten av repot.

I båda fallen kommer du åt servern på ```localhost:1338/<route>```

## Routes

För att testa API:ets routes, föreslår jag att du jobbar i Postman. Detta gäller framförallt routes som inte är GET-routes.

### Auth-routes (i princip direkt från jsramverk, credit: Julia Lind)

Skapa ny admin-användare med:
```
POST /register
```
Request-objektet måste innehålla ett objekt med nycklarna:

* email
* password

________________________________________________________________

Logga in med admin-användare och få tillbaka token:
```
POST /login
```
Request-objektet måste innehålla ett objekt med nycklarna:

* email
* password

________________________________________________________________

### Bike-routes

Hämta alla cyklar:
```
GET /bikes
```
________________________________________________________________

Hämta en cykel:
```
GET /bikes/:id
```
________________________________________________________________

Uppdatera en cykel (ej klar):
```
PUT /bikes/:id
```
Request-objektet måste innehålla ett objekt med nycklarna:

* city_id
* status_id
* coords (array med lat och long)
________________________________________________________________

Hyr en cykel (ej klar):
```
POST /bikes/:id/rent
```

När rent-routen anropas ska följande hända
* Cykelns status ska ändras
* En trip skapas (user_id, bike_id, starttid, startposition)
* När skickar vi in värden för cost-attributen?

________________________________________________________________

Avsluta cykeltur (ej klar):
```
POST /bikes/:id/return
```

När return-routen anropas ska följande hända:
* Cykelns status ska ändras
* En trip uppdateras (sluttid, slutposition)
* När skickar vi in värden för cost-attributen?
* Kundens saldo ändras

________________________________________________________________

### City-routes

Hämta alla städer:
```
GET /cities
```
________________________________________________________________

Hämta en stad:
```
GET /cities/:id
```
________________________________________________________________

Lägg till en stad (tillfällig route):
```
POST /cities
```

Request-objektet måste innehålla ett objekt med nycklarna:

* name
* coords (array med arrayer innehållandes lat och long)

________________________________________________________________

### Trip-routes

Hämta alla resor:
```
GET /trips
```
________________________________________________________________

Hämta en resa:
```
GET /trips/:id
```
________________________________________________________________

### User-routes

Hämta alla användare:
```
GET /users
```
________________________________________________________________

Hämta en användare:
```
GET /users/:id
```
________________________________________________________________

Uppdatera en användare (ej klar):
```
PUT /users/:id
```
Request-objektet måste innehålla ett objekt med nycklarna:

* email
* cardnr
* balance
* active
________________________________________________________________

### Zone-routes

Hämta alla zoner:
```
GET /zones
```
________________________________________________________________

Hämta en zon:
```
GET /zones/:id
```
________________________________________________________________

Lägg till en zon (tillfällig route):
```
POST /zones
```

Request-objektet måste innehålla ett objekt med nycklarna:

* zone_id
* city_id
* coords (array med arrayer innehållandes lat och long)
