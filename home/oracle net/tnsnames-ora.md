## Che cos'è?

Un file di configurazione, lato client e lato server.

## A cosa serve?

Traduce un alias leggibile (es. `PROD_DB`) in host, porta, servizio ed eventuali parametri. Sul server serve per le connessioni locali, i database link e gli alias usati in `local_listener`. L'alias deve iniziare in prima colonna.

## Codice

```text
# $TNS_ADMIN/tnsnames.ora: l'alias parte dalla prima colonna
SERVIZIO_A =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.56.101)(PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = servizio_a)
    )
  )

# due nodi: se il primo non risponde, prova il secondo
SERVIZIO_HA =
  (DESCRIPTION =
    (ADDRESS_LIST =
      (FAILOVER = ON)
      (ADDRESS = (PROTOCOL = TCP)(HOST = nodo1)(PORT = 1521))
      (ADDRESS = (PROTOCOL = TCP)(HOST = nodo2)(PORT = 1521))
    )
    (CONNECT_DATA = (SERVICE_NAME = mio_servizio))
  )
```

```bash
sqlplus nome_utente@SERVIZIO_A
```
