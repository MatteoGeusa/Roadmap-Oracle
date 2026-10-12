## Che cos'è?

Il comando da shell di Data Pump per l'import (`impdp utente DIRECTORY=… DUMPFILE=… LOGFILE=…`).

## A cosa serve?

Reimportare i dati da un file di dump.

## Codice

```bash
# reimporta il contenuto del dump
impdp nome_utente DIRECTORY=dp_dir DUMPFILE=nome_utente.dmp LOGFILE=nome_utente_imp.log

# in un altro schema, sostituendo le tabelle già presenti (serve un utente DBA)
impdp system DIRECTORY=dp_dir DUMPFILE=nome_utente.dmp LOGFILE=imp_copia.log \
  REMAP_SCHEMA=nome_utente:nome_utente_copia TABLE_EXISTS_ACTION=REPLACE
```
