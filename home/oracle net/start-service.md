## Che cos'è?

La procedura `DBMS_SERVICE.START_SERVICE`.

## A cosa serve?

Attiva il servizio (`v$active_services`) e LREG lo annuncia al listener. Vale fino al prossimo `SHUTDOWN`.

## Codice

```sql
EXEC DBMS_SERVICE.START_SERVICE('servizio_a');
SELECT name FROM v$active_services;

-- vale fino al prossimo SHUTDOWN: per riavviarlo da solo (database non multitenant)
CREATE OR REPLACE TRIGGER start_servizio_a
AFTER STARTUP ON DATABASE
BEGIN
  DBMS_SERVICE.START_SERVICE('servizio_a');
END;
/
```
