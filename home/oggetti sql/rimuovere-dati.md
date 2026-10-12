## Che cos'è?

Tre comandi che "tolgono" dati a livelli diversi: `DELETE` toglie righe, `TRUNCATE` svuota il segment, `DROP` elimina l'oggetto.

## A cosa serve?

Scegliere il comando giusto in base a cosa si vuole eliminare e a come si vuole poter tornare indietro.

## Codice

```sql
DELETE FROM emp WHERE deptno = 10;        -- righe scelte, serve COMMIT
TRUNCATE TABLE emp;                       -- svuota tutto, nessun ritorno con ROLLBACK
TRUNCATE TABLE emp REUSE STORAGE;         -- svuota ma tiene gli extent allocati
DROP TABLE emp;                           -- va nel cestino (recycle bin)
FLASHBACK TABLE emp TO BEFORE DROP;       -- recupera dal cestino
DROP TABLE emp PURGE;                     -- elimina senza passare dal cestino

SELECT object_name, original_name, droptime FROM user_recyclebin;
```
