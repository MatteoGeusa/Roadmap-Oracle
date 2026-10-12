## Che cos'è?

La registrazione scritta nel `listener.ora`, nella sezione `SID_LIST_<listener>`.

## A cosa serve?

Il servizio resta noto anche a database spento (stato `UNKNOWN`): una connessione dà ORA-01034, ma un `SYSDBA` remoto può fare `STARTUP`. Usi tipici: avvio remoto, RMAN duplicate, Enterprise Manager, Data Guard.

## Codice

```text
# listener.ora: servizio statico ORATEST_STATICO sul listener LISTENER
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
lsnrctl reload
lsnrctl services    # ORATEST_STATICO con stato UNKNOWN
```
