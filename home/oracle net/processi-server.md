## Che cos'è?

I processi che servono le sessioni dei client: dedicated server o shared server.

## A cosa serve?

Si sceglie nel `tnsnames.ora` con `(SERVER = DEDICATED)` o `(SERVER = SHARED)` in `CONNECT_DATA`.

## Codice

```text
# tnsnames.ora: lo stesso servizio con un processo dedicato o condiviso
SERVIZIO_A_DED =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.56.101)(PORT = 1521))
    (CONNECT_DATA = (SERVER = DEDICATED)(SERVICE_NAME = servizio_a))
  )

SERVIZIO_A_SHA =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.56.101)(PORT = 1521))
    (CONNECT_DATA = (SERVER = SHARED)(SERVICE_NAME = servizio_a))
  )
```

```sql
SELECT username, server FROM v$session WHERE username IS NOT NULL;
```
