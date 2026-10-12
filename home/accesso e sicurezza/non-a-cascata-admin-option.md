## Che cos'è?

Il comportamento della revoca per i privilegi concessi `WITH ADMIN OPTION`.

## A cosa serve?

Revocando il privilegio, chi lo aveva ricevuto da quell'utente lo conserva.

## Codice

```sql
-- collegati come DBA: concede il privilegio di sistema con ADMIN OPTION
GRANT CREATE TABLE TO utente_a WITH ADMIN OPTION;

-- collegati come utente_a: lo gira a utente_b
GRANT CREATE TABLE TO utente_b;

-- collegati come DBA: lo revoca a utente_a, ma utente_b lo conserva
REVOKE CREATE TABLE FROM utente_a;
```
