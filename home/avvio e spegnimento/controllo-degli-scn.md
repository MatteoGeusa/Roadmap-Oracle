## Che cos'è?

La verifica che Oracle fa durante l'OPEN tra gli SCN registrati nei data file e quelli nel control file.

## A cosa serve?

Se non coincidono, per esempio dopo un crash, scatta automaticamente il recovery gestito da SMON prima che il database possa considerarsi aperto.

## Codice

```sql
-- già in MOUNT: SCN di checkpoint secondo il control file e secondo l'header dei data file
SELECT d.file#,
       d.checkpoint_change# AS scn_control_file,
       h.checkpoint_change# AS scn_data_file
FROM v$datafile d
JOIN v$datafile_header h ON h.file# = d.file#;
```
