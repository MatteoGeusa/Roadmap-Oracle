## Che cos'è?

Le viste del dizionario con prefisso `DBA_`.

## A cosa serve?

Mostrano tutti gli oggetti del database; sono accessibili solo agli utenti con privilegi da database administrator.

## Codice

```sql
-- tabelle di uno schema qualsiasi
SELECT owner, table_name, tablespace_name
FROM dba_tables
WHERE owner = 'SCOTT';

-- data file del database (esiste solo la versione DBA_)
SELECT file_name, tablespace_name, bytes / 1024 / 1024 AS mb
FROM dba_data_files;
```
