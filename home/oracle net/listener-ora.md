## Che cos'è?

Il file di configurazione del listener, lato server.

## A cosa serve?

Configura indirizzi di ascolto, servizi statici e parametri di controllo. Supporta `IFILE` e può contenere più listener. Se manca, il listener usa i default.

## Codice

```text
# $TNS_ADMIN/listener.ora (oppure $ORACLE_HOME/network/admin/listener.ora)

# indirizzi di ascolto (obbligatori)
LISTENER =
  (DESCRIPTION_LIST =
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.56.101)(PORT = 1521))
      (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1521))
    )
  )

# servizi statici (facoltativi)
SID_LIST_LISTENER =
  (SID_LIST =
    (SID_DESC =
      (GLOBAL_DBNAME = ORATEST_STATICO)
      (ORACLE_HOME = /u01/app/oracle/product/19.0.0/dbhome1)
      (SID_NAME = ORATEST)
    )
  )

# parametri di controllo: il suffisso è il nome del listener
INBOUND_CONNECT_TIMEOUT_LISTENER = 60
```
