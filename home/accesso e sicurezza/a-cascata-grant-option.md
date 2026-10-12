## Che cos'è?

Il comportamento della revoca per i privilegi concessi `WITH GRANT OPTION`.

## A cosa serve?

Revocando il privilegio, sparisce anche a chi lo aveva ricevuto da quell'utente.

## Codice

```sql
-- collegati come scott: concede la SELECT con GRANT OPTION
GRANT SELECT ON emp TO utente_a WITH GRANT OPTION;

-- collegati come utente_a: la gira a utente_b
GRANT SELECT ON scott.emp TO utente_b;

-- collegati come scott: la revoca a utente_a, e la perde anche utente_b
REVOKE SELECT ON emp FROM utente_a;
```
