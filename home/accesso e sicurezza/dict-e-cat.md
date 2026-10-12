## Che cos'è?

`DICTIONARY` (abbreviata `DICT`) è la tabella principale del dizionario: contiene nome e descrizione di tutte le tabelle del dizionario. `USER_CATALOG` (abbreviata `CAT`) elenca gli oggetti dell'utente.

## A cosa serve?

Trovare quale vista del dizionario interrogare (`DICT`) e vedere gli oggetti di proprietà di chi esegue la query (`CAT`).

## Codice

```sql
-- quali viste del dizionario parlano di privilegi?
SELECT table_name, comments
FROM dict
WHERE table_name LIKE '%PRIVS%';

-- oggetti dell'utente corrente
SELECT * FROM cat;
```
