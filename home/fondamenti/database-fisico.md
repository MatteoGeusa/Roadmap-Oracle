## Che cos'è?

Il contenitore **fisico** dei dati: bit su disco, organizzati in tre categorie di file principali (data file, redo log file e control file).

## A cosa serve?

Conserva su disco i dati, le modifiche e i metadati. L'istanza è la parte che gestisce l'accesso a questi file.

## Codice

```sql
-- i file del database, per categoria
SELECT 'data file' AS tipo, name AS percorso FROM v$datafile
UNION ALL
SELECT 'redo log file', member FROM v$logfile
UNION ALL
SELECT 'control file', name FROM v$controlfile;
```
