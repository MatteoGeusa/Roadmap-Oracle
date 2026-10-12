## Che cos'è?

Le viste del dizionario con prefisso `CDB_`.

## A cosa serve?

Mostrano gli oggetti del database contenitore e di tutti i pluggable database in esso contenuti.

## Codice

```sql
-- dal CDB$ROOT: utenti di tutti i container
SELECT con_id, username
FROM cdb_users
ORDER BY con_id, username;

-- tabelle di uno schema in tutti i PDB aperti
SELECT con_id, owner, table_name
FROM cdb_tables
WHERE owner = 'HR';
```
