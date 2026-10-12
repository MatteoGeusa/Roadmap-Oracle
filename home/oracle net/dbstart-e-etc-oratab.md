## Che cos'è?

Lo script `dbstart` e il file `/etc/oratab`, che elenca i SID con le relative home.

## A cosa serve?

`dbstart $ORACLE_HOME` avvia il listener e i database segnati con flag `Y` in `/etc/oratab`; `dbshut` li ferma.
