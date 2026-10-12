## Che cos'è?

L'isolation level di default in Oracle.

## A cosa serve?

Ogni singola query vede una fotografia riferita al momento in cui **quella query** è iniziata: query diverse nella stessa transazione possono vedere versioni diverse se nel frattempo altri hanno fatto commit.

## Codice

```sql
-- è il default: si scrive solo per tornarci
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
```
