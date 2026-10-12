## Che cos'è?

Il file di log del listener: `tnslsnr/<host>/<listener>/trace/listener.log` sotto `$ORACLE_BASE/diag`.

## A cosa serve?

Ricostruire l'attività del listener, comprese le righe `service_register` della registrazione dei servizi.

## Codice

```bash
# ultime righe, comprese le registrazioni dei servizi
tail -50 $ORACLE_BASE/diag/tnslsnr/*/listener/trace/listener.log
grep service_register $ORACLE_BASE/diag/tnslsnr/*/listener/trace/listener.log | tail
```
