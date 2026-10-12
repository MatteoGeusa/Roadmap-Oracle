## Che cos'è?

Le variabili d'ambiente `ORACLE_SID` e `ORACLE_HOME`.

## A cosa serve?

Sono il primo passo della creazione manuale e indicano quale istanza e quale software usare. Se `ORACLE_SID` non corrisponde ai file in `$ORACLE_HOME/dbs`, l'avvio fallisce (ORA-01078).

## Codice

```bash
export ORACLE_BASE=/u01/app/oracle
export ORACLE_HOME=$ORACLE_BASE/product/19.0.0/dbhome1
export ORACLE_SID=ORATEST
export PATH=$ORACLE_HOME/bin:$PATH

# controllo: in $ORACLE_HOME/dbs ci devono essere i file di questo SID
ls $ORACLE_HOME/dbs/*$ORACLE_SID*
```

```bash
# salvate in un file (es. ~/oratest.env) si caricano con
. ~/oratest.env

# oppure, se il SID è in /etc/oratab, chiedendolo a oraenv
. oraenv
```
