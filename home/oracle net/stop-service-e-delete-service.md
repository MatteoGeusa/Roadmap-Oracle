## Che cos'è?

Le procedure `DBMS_SERVICE.STOP_SERVICE` e `DBMS_SERVICE.DELETE_SERVICE`.

## A cosa serve?

`STOP_SERVICE` fa togliere il servizio dal listener (le sessioni aperte restano); `DELETE_SERVICE` lo elimina (ORA-44305 se è ancora avviato).
