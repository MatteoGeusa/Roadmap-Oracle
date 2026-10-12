## Che cos'è?

Il tablespace di UNDO creato da `CREATE DATABASE` (`UNDOTBS1`), indicato dal parametro `undo_tablespace`.

## A cosa serve?

Conserva gli undo record: servono per il rollback e per fornire una vista coerente alle altre sessioni.

## Codice

```sql
SHOW PARAMETER undo_tablespace

-- i suoi data file
SELECT file_name, bytes / 1024 / 1024 AS mb, autoextensible
FROM dba_data_files
WHERE tablespace_name = 'UNDOTBS1';
```
