## Che cos'è?

Il percorso dell'alert log: `/u01/app/oracle/diag/rdbms/<nomedb>/<sid>/trace/alert_<sid>.log`.

## A cosa serve?

Sapere dove leggere i log di avvio e spegnimento.

## Codice

```sql
SELECT value FROM v$diag_info WHERE name = 'Diag Trace';
```

```bash
ls /u01/app/oracle/diag/rdbms/*/*/trace/alert_*.log
tail -100 /u01/app/oracle/diag/rdbms/oratest/ORATEST/trace/alert_ORATEST.log
```
