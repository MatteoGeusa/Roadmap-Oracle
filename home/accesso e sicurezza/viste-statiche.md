## Che cos'è?

Le viste del dizionario con prefisso `USER_`, `ALL_`, `DBA_` (e `CDB_`).

## A cosa serve?

Contengono le informazioni essenziali per l'amministrazione. Alcune esistono in tutte le categorie (`USER_TABLES`, `ALL_TABLES`, `DBA_TABLES`), altre solo in una o due (`DBA_DATA_FILES`).

## Codice

```sql
-- la stessa informazione ai tre livelli
SELECT table_name FROM user_tables;          -- le mie
SELECT owner, table_name FROM all_tables;    -- quelle a cui ho accesso
SELECT owner, table_name FROM dba_tables;    -- tutte (serve un DBA)

-- una vista che esiste solo come DBA_
SELECT file_name, tablespace_name FROM dba_data_files;
```
