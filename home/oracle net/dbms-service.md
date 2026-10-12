## Che cos'è?

Il package PL/SQL per gestire i servizi.

## A cosa serve?

Creare, avviare, fermare ed eliminare servizi diversi da quello di default.

## Codice

```sql
-- creare e avviare
EXEC DBMS_SERVICE.CREATE_SERVICE(service_name => 'servizio_a', network_name => 'servizio_a');
EXEC DBMS_SERVICE.START_SERVICE('servizio_a');
ALTER SYSTEM REGISTER;

-- farlo ripartire a ogni avvio (database non multitenant)
CREATE OR REPLACE TRIGGER start_servizio_a
AFTER STARTUP ON DATABASE
BEGIN
  DBMS_SERVICE.START_SERVICE('servizio_a');
END;
/

-- fermare ed eliminare
EXEC DBMS_SERVICE.STOP_SERVICE('servizio_a');
EXEC DBMS_SERVICE.DELETE_SERVICE('servizio_a');
DROP TRIGGER start_servizio_a;
```
