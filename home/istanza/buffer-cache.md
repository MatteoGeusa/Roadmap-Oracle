## Che cos'è?

Un'area della SGA: la cache delle letture dal disco.

## A cosa serve?

Riduce l'I/O fisico. È gestita con l'algoritmo LRU, e i suoi blocchi hanno la stessa dimensione dei blocchi del database.

## Codice

```sql
-- dimensione e utilizzo della buffer cache
SELECT * FROM v$sgastat WHERE name LIKE '%buffer%';
SELECT bytes / 1024 / 1024 AS mb FROM v$sgainfo WHERE name = 'Buffer Cache Size';
```
