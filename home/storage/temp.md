## Che cos'è?

Un tablespace di file fisici temporanei: l'estensione della PGA su disco.

## A cosa serve?

Ospita le operazioni, come gli ordinamenti, che superano lo spazio disponibile in PGA. È molto più lento della RAM.

## Codice

```sql
CREATE TEMPORARY TABLESPACE temp2
  TEMPFILE '/u02/oradata/ORATEST/temp2_01.dbf' SIZE 1G AUTOEXTEND ON;

-- il tablespace temporaneo di default del database
ALTER DATABASE DEFAULT TEMPORARY TABLESPACE temp2;

SELECT file_name, tablespace_name, bytes / 1024 / 1024 AS mb FROM dba_temp_files;
SELECT property_value FROM database_properties WHERE property_name = 'DEFAULT_TEMP_TABLESPACE';
```
