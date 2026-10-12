## Che cos'è?

L'analisi di uno `SHUTDOWN ABORT` e del riavvio successivo nell'alert log.

## A cosa serve?

Riconoscere il crash recovery dentro `ALTER DATABASE OPEN`: redo scan, applicazione del redo, `Completed crash recovery`.

## Codice

```bash
# dopo SHUTDOWN ABORT e STARTUP: le righe del crash recovery
grep -n -A8 "Beginning crash recovery" \
  /u01/app/oracle/diag/rdbms/oratest/ORATEST/trace/alert_ORATEST.log
```
