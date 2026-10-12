## Che cos'è?

Il comando `ALTER SYSTEM SET … SCOPE=…`, con scope `MEMORY`, `SPFILE` o `BOTH`.

## A cosa serve?

Modifica un parametro scegliendo dove applicarlo: nell'istanza in RAM, nel file, o in entrambi.

## Codice

```sql
ALTER SYSTEM SET undo_retention = 1800 SCOPE = MEMORY;   -- solo istanza, si perde al riavvio
ALTER SYSTEM SET undo_retention = 1800 SCOPE = SPFILE;   -- solo file, vale dal prossimo avvio
ALTER SYSTEM SET undo_retention = 1800 SCOPE = BOTH;     -- subito e su file (default con lo SPFILE)

SHOW PARAMETER undo_retention
```
