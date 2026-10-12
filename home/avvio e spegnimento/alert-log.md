## Che cos'è?

Il file di log del database: `alert_<SID>.log`.

## A cosa serve?

Registra ogni operazione di startup e shutdown: leggendolo si riconoscono le fasi di avvio e spegnimento e l'eventuale crash recovery.

## Codice

```sql
-- cartella che contiene l'alert log
SELECT value FROM v$diag_info WHERE name = 'Diag Trace';
```

```bash
# seguirlo in tempo reale durante uno STARTUP o uno SHUTDOWN
tail -f /u01/app/oracle/diag/rdbms/oratest/ORATEST/trace/alert_ORATEST.log
```
