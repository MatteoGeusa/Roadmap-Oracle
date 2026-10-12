## Che cos'è?

Il metodo di risoluzione basato sugli alias del `tnsnames.ora`.

## A cosa serve?

Collegarsi con un nome leggibile: `sqlplus system@SERVIZIO_A`.

## Codice

```text
# tnsnames.ora del client
SERVIZIO_A =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.56.101)(PORT = 1521))
    (CONNECT_DATA = (SERVICE_NAME = servizio_a))
  )
```

```bash
tnsping SERVIZIO_A
sqlplus system@SERVIZIO_A
```
