## Che cos'è?

Un processo server per ogni sessione, con la sua PGA: il listener passa la connessione al processo dedicato.

## A cosa serve?

Massime prestazioni, adatto al batch.

## Codice

```text
# tnsnames.ora
SERVIZIO_A =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.56.101)(PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = servizio_a)
    )
  )
```

```sql
-- tipo di processo server della sessione corrente
SELECT server FROM v$session WHERE sid = SYS_CONTEXT('USERENV', 'SID');
```
