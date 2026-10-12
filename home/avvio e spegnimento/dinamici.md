## Che cos'è?

Un parametro che si può modificare a caldo.

## A cosa serve?

Permette di cambiare il comportamento senza riavviare (es. `UNDO_RETENTION`, `local_listener`).

## Codice

```sql
-- IMMEDIATE = modificabile a caldo, FALSE = statico
SELECT name, issys_modifiable
FROM v$parameter
WHERE name IN ('undo_retention', 'local_listener', 'processes');

-- un parametro dinamico cambia subito, senza riavvio
ALTER SYSTEM SET undo_retention = 1800 SCOPE = BOTH;
```
