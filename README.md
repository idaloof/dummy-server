# VTEAM - dummy-server med api-routes

Det här repot består av en express-server som innehåller ett antal api-routes (se nedan för detaljer).
Dummy-servern ska användas under utveckling av klienterna i kursen vteam.

Jag har skapat api-routes och modeller som ska likna slutprodukten så långt som möjligt.

## Kom igång
Klona repot och kör ```npm install```.

Starta servern med ```npm run start``` från roten av repot.

Alternativet är att starta den via docker. Då startar du den med ```docker-compose up --build``` från roten av repot.

I båda fallen kommer du åt servern på ```localhost:1338/<route>```

För att kunna använda routen ```/login``` krävs en .env-fil med variabeln JWT_SECRET i roten av repot.

Tips: generera din hemliga nyckel (32 tecken) i terminalen med kommandot ```openssl rand -base64 32```

## Routes (v1)

För att testa API:ets routes, föreslår jag att du jobbar i Postman. Detta gäller framförallt routes som inte är GET-routes.

### Auth-routes (i princip direkt från jsramverk, credit: Julia Lind)

Skapa ny admin-användare med:
```
POST /v1/admin/register
```
Request-bodyn måste innehålla ett objekt med nycklarna:

* email
* password

Request-headern måste innehålla token med admin-access i payload

________________________________________________________________

Logga in med admin-användare och få tillbaka token:
```
POST /v1/admin/login
```
Request-bodyn måste innehålla ett objekt med nycklarna:

* email
* password

________________________________________________________________

### Bike-routes

Hämta alla cyklar:
```
GET /v1/bikes
```
________________________________________________________________

Hämta en cykel:
```
GET /v1/bikes/:id
```
________________________________________________________________

Uppdatera en cykel:
```
PUT /v1/bikes/:id
```
Request-bodyn måste innehålla ett objekt med nycklarna:

* city_id
* status_id
* coords (array med lat och long)
________________________________________________________________

Hyr en cykel:
```
POST /v1/bikes/:id/rent
```

Request-bodyn måste innehålla ett objekt med nyckeln:

* userId

________________________________________________________________

Avsluta cykeltur (ej klar):
```
POST /v1/bikes/:id/return
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
GET /v1/cities
```
________________________________________________________________

Hämta en stad:
```
GET /v1/cities/:id
```
________________________________________________________________

Lägg till en stad (tillfällig route):
```
POST /v1/cities
```

Request-bodyn måste innehålla ett objekt med nycklarna:

* name
* coords (array med arrayer innehållandes lat och long)

________________________________________________________________

### Trip-routes

Hämta alla resor:
```
GET /v1/trips
```
________________________________________________________________

Hämta en resa:
```
GET /v1/trips/:id
```
________________________________________________________________

### User-routes

Hämta alla användare:
```
GET /v1/users
```
________________________________________________________________

Hämta en användare:
```
GET /v1/users/:id
```
________________________________________________________________

Uppdatera en användare:
```
PUT /v1/users/:id
```
Request-bodyn måste innehålla ett objekt med nycklarna:

* email
* cardnr
* balance
* active
________________________________________________________________

### Zone-routes

Hämta alla zoner:
```
GET /v1/zones
```
________________________________________________________________

Hämta en zon:
```
GET /v1/zones/:id
```
________________________________________________________________

Lägg till en zon (tillfällig route):
```
POST /v1/zones
```

Request-bodyn måste innehålla ett objekt med nycklarna:

* zoneTypeId
* cityId
* coords (array med arrayer innehållandes lat och long)
