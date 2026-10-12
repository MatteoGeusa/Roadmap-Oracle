## Che cos'è?

Il comando TCL che chiude una transazione confermandola.

## A cosa serve?

Rende permanenti le modifiche: Oracle assegna un SCN, LGWR scrive il redo su disco e i lock vengono rilasciati. Da quel momento la durabilità è garantita anche in caso di crash.

## Codice

```sql
UPDATE emp SET sal = sal * 1.1 WHERE deptno = 10;
COMMIT;    -- da qui la modifica è permanente e visibile alle altre sessioni
```
