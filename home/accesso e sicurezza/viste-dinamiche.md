## Che cos'è?

Le viste `V$` e `GV$`: il loro contenuto cambia continuamente in funzione dello stato del database. Le `V$` sono di proprietà di `SYS` e vengono create da `catalog.sql`.

## A cosa serve?

Leggere lo stato dell'istanza in tempo reale: per esempio `V$SGASTAT`, `V$BGPROCESS`, `V$SESSION`, `v$parameter`.

## Codice

```sql
-- memoria della SGA
SELECT * FROM v$sgastat WHERE name LIKE '%buffer%';

-- processi in background attivi
SELECT pname, description FROM v$bgprocess WHERE paddr <> '00';

-- sessioni degli utenti collegati
SELECT sid, serial#, username, status, program FROM v$session WHERE username IS NOT NULL;

-- parametri con valori diversi dal default
SELECT name, value FROM v$parameter WHERE isdefault = 'FALSE';
```
