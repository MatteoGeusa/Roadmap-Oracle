## Che cos'è?

Il componente dello shared server a cui il listener passa la connessione.

## A cosa serve?

Mette le richieste in coda, da cui le prende uno shared server libero.

## Codice

```sql
-- 2 dispatcher TCP per lo shared server (sostituisce il valore attuale: SHOW PARAMETER dispatchers)
ALTER SYSTEM SET dispatchers = '(PROTOCOL=TCP)(DISPATCHERS=2)' SCOPE = BOTH;

SELECT name, network, status FROM v$dispatcher;
```
