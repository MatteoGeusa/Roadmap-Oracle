## Che cos'è?

L'uso tipico della registrazione statica.

## A cosa serve?

Poiché il servizio statico resta registrato anche a database spento, un utente `SYSDBA` collegato da remoto può lanciare `STARTUP`.

## Codice

```text
# listener.ora del server: servizio statico, resta noto anche a istanza spenta
SID_LIST_LISTENER =
  (SID_LIST =
    (SID_DESC =
      (GLOBAL_DBNAME = ORATEST_STATICO)
      (ORACLE_HOME = /u01/app/oracle/product/19.0.0/dbhome1)
      (SID_NAME = ORATEST)
    )
  )
```

```bash
# sul server
lsnrctl reload

# dal client: serve un utente SYSDBA nel password file
sqlplus sys@//192.168.56.101:1521/ORATEST_STATICO as sysdba
```

```sql
-- "Connected to an idle instance"
STARTUP;
```
