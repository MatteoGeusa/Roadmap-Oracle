## Che cos'è?

Uno scope di `ALTER SYSTEM`.

## A cosa serve?

Modifica solo l'istanza in RAM: la modifica si perde al riavvio. Funziona sia con SPFILE sia con PFILE.

## Codice

```sql
-- vale fino al prossimo riavvio, sia con SPFILE sia con PFILE
ALTER SYSTEM SET undo_retention = 1800 SCOPE = MEMORY;
```
