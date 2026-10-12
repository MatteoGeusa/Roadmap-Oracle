## Che cos'è?

Il comando da shell di Data Pump per l'export (`expdp utente DIRECTORY=… DUMPFILE=… LOGFILE=… SCHEMAS=…`).

## A cosa serve?

Esportare dati in un file di dump nella directory indicata.

## Codice

```bash
# schema intero
expdp nome_utente DIRECTORY=dp_dir DUMPFILE=nome_utente.dmp LOGFILE=nome_utente_exp.log SCHEMAS=nome_utente

# solo alcune tabelle
expdp nome_utente DIRECTORY=dp_dir DUMPFILE=tabelle.dmp LOGFILE=tabelle_exp.log TABLES=emp,dept
```
