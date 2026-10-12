## Che cos'è?

La sezione facoltativa `SID_LIST_<listener>` del `listener.ora`, con `SID_DESC` (`GLOBAL_DBNAME`, `ORACLE_HOME`, `SID_NAME`).

## A cosa serve?

Definire i servizi statici. Si elimina togliendola dal file e lanciando `lsnrctl reload`.

## Codice

```text
# listener.ora: un secondo listener con un solo servizio statico
LISTENER2 =
  (DESCRIPTION_LIST =
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.56.101)(PORT = 1522))
    )
  )

SID_LIST_LISTENER2 =
  (SID_LIST =
    (SID_DESC =
      (GLOBAL_DBNAME = servizio_b)
      (ORACLE_HOME = /u01/app/oracle/product/19.0.0/dbhome1)
      (SID_NAME = ORATEST)
    )
  )

DYNAMIC_REGISTRATION_LISTENER2 = OFF
```

```bash
lsnrctl start LISTENER2
lsnrctl services LISTENER2    # servizio_b con stato UNKNOWN
```
