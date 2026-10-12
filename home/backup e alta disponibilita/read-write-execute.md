## Che cos'è?

I privilegi di oggetto su una directory.

## A cosa serve?

`READ` legge i file (import, external table, `UTL_FILE`), `WRITE` li scrive (export, log di Data Pump), `EXECUTE` esegue programmi nella cartella (preprocessore delle external table).

## Codice

```sql
GRANT READ ON DIRECTORY dati_dir TO nome_utente;          -- import, external table
GRANT READ, WRITE ON DIRECTORY dp_dir TO nome_utente;     -- export e log di Data Pump
GRANT EXECUTE ON DIRECTORY script_dir TO nome_utente;     -- preprocessore delle external table

-- privilegi concessi sulle directory
SELECT grantee, table_name AS nome_directory, privilege
FROM dba_tab_privs
WHERE type = 'DIRECTORY';
```
