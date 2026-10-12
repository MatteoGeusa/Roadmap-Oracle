## Che cos'è?

I due passi centrali della creazione manuale: `STARTUP NOMOUNT PFILE=…` e poi `CREATE DATABASE …`.

## A cosa serve?

`CREATE DATABASE` crea data file, redo log, control file e i tablespace principali (`SYSTEM`, `SYSAUX`, `USERS`, `TEMP`, `UNDOTBS1`), oltre alle tabelle base del data dictionary.
