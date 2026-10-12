## Che cos'è?

Lo script `dbstart` e il file `/etc/oratab`, che elenca i SID con le relative home.

## A cosa serve?

`dbstart $ORACLE_HOME` avvia il listener e i database segnati con flag `Y` in `/etc/oratab`; `dbshut` li ferma.

## Codice

```text
# /etc/oratab: SID:ORACLE_HOME:avvio automatico (Y o N)
ORATEST:/u01/app/oracle/product/19.0.0/dbhome1:Y
```

```bash
dbstart $ORACLE_HOME    # avvia il listener e i database segnati con Y
dbshut $ORACLE_HOME     # li ferma
```
