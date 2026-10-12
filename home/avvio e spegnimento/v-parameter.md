## Che cos'è?

La vista dinamica dei parametri dell'istanza.

## A cosa serve?

Consultare i parametri: `SELECT * FROM v$parameter WHERE isdefault='FALSE'` mostra quelli impostati con valori diversi dal default.

## Codice

```sql
-- parametri con valori diversi dal default
SELECT name, value FROM v$parameter WHERE isdefault = 'FALSE' ORDER BY name;

-- cercare un parametro anche per nome parziale
SHOW PARAMETER undo
SELECT name, value, issys_modifiable FROM v$parameter WHERE name LIKE '%undo%';
```
