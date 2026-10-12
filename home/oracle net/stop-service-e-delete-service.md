## Che cos'è?

Le procedure `DBMS_SERVICE.STOP_SERVICE` e `DBMS_SERVICE.DELETE_SERVICE`.

## A cosa serve?

`STOP_SERVICE` fa togliere il servizio dal listener (le sessioni aperte restano); `DELETE_SERVICE` lo elimina (ORA-44305 se è ancora avviato).

## Codice

```sql
EXEC DBMS_SERVICE.STOP_SERVICE('servizio_a');     -- LREG lo toglie dal listener
EXEC DBMS_SERVICE.DELETE_SERVICE('servizio_a');   -- ORA-44305 se è ancora avviato

-- l'eventuale trigger che lo avviava
SELECT trigger_name FROM dba_triggers WHERE triggering_event LIKE 'STARTUP%';
DROP TRIGGER start_servizio_a;
```
