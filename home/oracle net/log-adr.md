## Che cos'è?

L'Automatic Diagnostic Repository, in `$ORACLE_BASE/diag`.

## A cosa serve?

Raccoglie i log del database (`rdbms/…/trace/alert_<SID>.log`) e del listener (`tnslsnr/…/trace/listener.log` e `alert/log.xml`).

## Codice

```bash
adrci exec="show homes"    # cartelle ADR di database e listener

tail -100 $ORACLE_BASE/diag/rdbms/oratest/ORATEST/trace/alert_ORATEST.log
tail -100 $ORACLE_BASE/diag/tnslsnr/*/listener/trace/listener.log
```
