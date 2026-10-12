## Che cos'è?

L'analisi della sequenza di uno `SHUTDOWN IMMEDIATE` nell'alert log (esempio ORATEST).

## A cosa serve?

Riconoscere i passi: blocco dei nuovi accessi, stop dei processi di servizio, `ALTER DATABASE CLOSE NORMAL` (da OPEN a MOUNT), `ALTER DATABASE DISMOUNT` (da MOUNT a NOMOUNT), istanza terminata.

## Codice

```bash
# i passi principali di uno SHUTDOWN IMMEDIATE
grep -n -E "Shutting down|ALTER DATABASE (CLOSE|DISMOUNT)|Instance shutdown complete" \
  /u01/app/oracle/diag/rdbms/oratest/ORATEST/trace/alert_ORATEST.log
```
