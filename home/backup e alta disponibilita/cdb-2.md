## Che cos'è?

Il Container Database, in particolare `CDB$ROOT`.

## A cosa serve?

Contiene la gestione condivisa di memoria, istanza e componenti di sistema; **non** contiene i dati applicativi.

## Codice

```sql
SELECT cdb FROM v$database;   -- YES se è un container database
SHOW CON_NAME                 -- CDB$ROOT
SHOW PDBS
```
