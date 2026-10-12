## Che cos'è?

Uno strumento presente nell'Oracle Home per creare un database.

## A cosa serve?

Crea il database (ed è lì che nasce davvero un'istanza) ed esegue automaticamente `catalog.sql` e `catproc.sql`, che nella creazione manuale vanno lanciati a mano.

## Codice

```bash
# con l'interfaccia grafica
dbca

# senza interfaccia: database ORATEST (non CDB) dal modello General Purpose
dbca -silent -createDatabase \
  -templateName General_Purpose.dbc \
  -gdbName ORATEST -sid ORATEST \
  -createAsContainerDatabase false \
  -characterSet AL32UTF8 \
  -totalMemory 2048 \
  -datafileDestination /u01/app/oracle/oradata \
  -emConfiguration NONE \
  -sysPassword password_sys \
  -systemPassword password_system
```
