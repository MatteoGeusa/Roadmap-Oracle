## Che cos'è?

Uno dei tre tipi di file fisici del database.

## A cosa serve?

Contiene i dati veri e propri: tabelle e indici.

## Codice

```sql
SELECT file_name, tablespace_name, bytes / 1024 / 1024 AS mb
FROM dba_data_files
ORDER BY tablespace_name;
```
