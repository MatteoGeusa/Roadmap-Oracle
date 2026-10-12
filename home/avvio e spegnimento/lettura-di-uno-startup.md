## Che cos'è?

L'analisi della sequenza di uno `STARTUP` nell'alert log (esempio ORATEST).

## A cosa serve?

Riconoscere le fasi: allocazione della SGA, lettura dello SPFILE (inizio NOMOUNT) con i parametri non di default, avvio dei processi, `ALTER DATABASE MOUNT`, `ALTER DATABASE OPEN` con inizializzazione dell'undo.

## Codice

```bash
# le fasi di uno STARTUP
grep -n -E "Starting ORACLE instance|Using parameter settings|ALTER DATABASE (MOUNT|OPEN)" \
  /u01/app/oracle/diag/rdbms/oratest/ORATEST/trace/alert_ORATEST.log
```
