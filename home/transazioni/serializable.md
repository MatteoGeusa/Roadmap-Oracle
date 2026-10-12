## Che cos'è?

Un isolation level.

## A cosa serve?

La fotografia è fissata al momento in cui è iniziata **l'intera transazione**: tutte le SELECT vedono lo stesso SCN di riferimento, anche se nel frattempo avvengono altri commit.

## Codice

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SELECT SUM(sal) FROM emp;    -- tutte le SELECT vedono lo stesso istante
SELECT COUNT(*) FROM emp;
-- un UPDATE su righe che altri hanno modificato dopo l'inizio dà ORA-08177
COMMIT;
```
