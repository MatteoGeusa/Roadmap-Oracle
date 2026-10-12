## Che cos'è?

L'insieme degli shared server condivisi tra le sessioni.

## A cosa serve?

La sua dimensione stabilisce quante richieste vengono gestite contemporaneamente.

## Codice

```sql
ALTER SYSTEM SET shared_servers = 5 SCOPE = BOTH;         -- quanti ne partono all'avvio
ALTER SYSTEM SET max_shared_servers = 20 SCOPE = BOTH;    -- tetto massimo

SELECT name, status, requests FROM v$shared_server;
```
