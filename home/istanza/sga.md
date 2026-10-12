## Che cos'è?

La System Global Area: la RAM **condivisa** tra tutte le sessioni e i processi connessi all'istanza. Si compone di buffer cache, shared pool e redo log buffer.

## A cosa serve?

Ospita tutto ciò che può essere utile a più utenti contemporaneamente. Viene allocata già nella fase NOMOUNT.

## Codice

```sql
SHOW SGA
SHOW PARAMETER sga_target
SELECT name, ROUND(bytes / 1024 / 1024) AS mb FROM v$sgainfo;

-- nuova dimensione dal prossimo avvio
ALTER SYSTEM SET sga_target = 2G SCOPE = SPFILE;
```
