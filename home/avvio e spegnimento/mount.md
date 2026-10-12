## Che cos'è?

La seconda fase di avvio (`STARTUP MOUNT`).

## A cosa serve?

L'istanza ottiene accesso al control file. Si possono fare operazioni amministrative sull'intero database, per esempio il recovery, ma le tabelle applicative non sono ancora accessibili.

## Codice

```sql
STARTUP MOUNT;            -- da istanza spenta
ALTER DATABASE MOUNT;     -- oppure da NOMOUNT

SELECT status FROM v$instance;   -- MOUNTED
```
