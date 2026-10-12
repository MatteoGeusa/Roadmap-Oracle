## Che cos'è?

La procedura `DBMS_SERVICE.CREATE_SERVICE(service_name => …, network_name => …)`.

## A cosa serve?

Salva solo la definizione del servizio (`dba_services`). `network_name` è il nome annunciato al listener e usato dai client.

## Codice

```sql
EXEC DBMS_SERVICE.CREATE_SERVICE(service_name => 'servizio_a', network_name => 'servizio_a');

-- definito, ma non ancora avviato
SELECT name, network_name FROM dba_services;
SELECT name FROM v$active_services;
```
