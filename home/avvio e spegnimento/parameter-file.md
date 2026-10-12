## Che cos'è?

Il file dei parametri dell'istanza: PFILE o SPFILE.

## A cosa serve?

Viene letto all'avvio in NOMOUNT: fissa, tra gli altri, `DB_NAME` e `CONTROL_FILES`. È il parameter file che indica la strada al control file.

## Codice

```sql
-- quale file usa l'istanza? valore vuoto = PFILE
SHOW PARAMETER spfile
```

```bash
# dove Oracle li cerca all'avvio, in quest'ordine
ls $ORACLE_HOME/dbs/spfile$ORACLE_SID.ora $ORACLE_HOME/dbs/spfile.ora $ORACLE_HOME/dbs/init$ORACLE_SID.ora
```
