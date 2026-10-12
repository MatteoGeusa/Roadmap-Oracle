## Che cos'è?

Un pool di shared server (es. 20) condivisi tra molte sessioni: listener → dispatcher → coda di richieste → shared server libero.

## A cosa serve?

Adatto a molte connessioni concorrenti poco attive.

## Codice

```sql
ALTER SYSTEM SET shared_servers = 5 SCOPE = BOTH;
ALTER SYSTEM SET dispatchers = '(PROTOCOL=TCP)(DISPATCHERS=2)' SCOPE = BOTH;
```

```text
# tnsnames.ora: il client chiede uno shared server
SERVIZIO_A_SHA =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.56.101)(PORT = 1521))
    (CONNECT_DATA = (SERVER = SHARED)(SERVICE_NAME = servizio_a))
  )
```
