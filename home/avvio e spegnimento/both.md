## Che cos'è?

Uno scope di `ALTER SYSTEM`.

## A cosa serve?

Applica subito la modifica e la salva su file. Con un PFILE fallisce, per lo stesso motivo di `SCOPE=SPFILE`.

## Codice

```sql
ALTER SYSTEM SET undo_retention = 1800 SCOPE = BOTH;

-- valore in uso e valore salvato nello SPFILE
SELECT value FROM v$parameter   WHERE name = 'undo_retention';
SELECT value FROM v$spparameter WHERE name = 'undo_retention';
```
