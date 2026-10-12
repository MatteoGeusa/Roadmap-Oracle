## Che cos'è?

Il comando TCL che chiude una transazione annullandola.

## A cosa serve?

Annulla le modifiche non ancora confermate, usando i vecchi valori conservati nell'undo.

## Codice

```sql
UPDATE emp SET sal = 0;
ROLLBACK;                                  -- annulla tutto ciò che non è confermato

-- annullare solo una parte
UPDATE emp SET sal = sal + 100 WHERE deptno = 10;
SAVEPOINT dopo_reparto_10;
UPDATE emp SET sal = sal + 100 WHERE deptno = 20;
ROLLBACK TO SAVEPOINT dopo_reparto_10;     -- annulla solo il secondo UPDATE
COMMIT;
```
