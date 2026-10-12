## Che cos'è?

Uno dei tre tipi di file fisici del database: contiene i **redo record**.

## A cosa serve?

Registra ogni comando o modifica (DDL e DML) non ancora applicato ai data file. LGWR ci scrive a ogni COMMIT, ed è il redo log a garantire fisicamente la durabilità: dopo un crash, SMON lo riapplica per ricostruire i blocchi mancanti.

## Codice

```sql
-- gruppi, membri e stato dei redo log
SELECT group#, sequence#, bytes / 1024 / 1024 AS mb, members, status FROM v$log;
SELECT group#, member FROM v$logfile;

-- passa subito al gruppo successivo
ALTER SYSTEM SWITCH LOGFILE;
```
