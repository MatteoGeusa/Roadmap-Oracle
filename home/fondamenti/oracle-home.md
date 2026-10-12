## Che cos'è?

La directory dove risiede il **software** del motore RDBMS: binari, librerie e strumenti come `sqlplus`, `dbca`, `lsnrctl` (es. `/u01/app/oracle/product/19.0.0/dbhome1`). È l'unica cosa che si installa in senso classico.

## A cosa serve?

Da qui si avviano le istanze. Ogni Oracle Home corrisponde a una versione fissa del motore: per versioni diverse servono Oracle Home separati, mentre con la stessa versione conviene un solo Oracle Home condiviso da più istanze (meno spazio disco, patch applicate una volta sola).

## Codice

```bash
echo $ORACLE_HOME
cat /etc/oratab                          # SID e Oracle Home di ogni istanza
$ORACLE_HOME/OPatch/opatch lspatches     # patch applicate a questo Oracle Home
```
