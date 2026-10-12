## Che cos'è?

Il comando `DROP TABLE … PURGE`.

## A cosa serve?

Eliminare una tabella senza passare dal cestino.

## Codice

```sql
DROP TABLE emp PURGE;    -- non passa dal cestino: non si recupera più
PURGE TABLE emp;         -- toglie dal cestino una tabella già eliminata
PURGE RECYCLEBIN;        -- svuota il cestino dell'utente
```
