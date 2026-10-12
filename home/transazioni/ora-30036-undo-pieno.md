## Che cos'è?

L'errore che si ottiene quando l'undo non ha più spazio.

## A cosa serve?

Segnala che una transazione fallisce perché l'undo delle transazioni ancora aperte non viene mai sovrascritto: serve per il ROLLBACK, e Oracle lo protegge sempre.

## Codice

```sql
-- transazioni aperte e blocchi di undo che occupano
SELECT s.sid, s.username, t.used_ublk
FROM v$transaction t
JOIN v$session s ON t.ses_addr = s.saddr;

-- spazio del tablespace di undo
SELECT file_name, bytes / 1024 / 1024 AS mb, autoextensible
FROM dba_data_files
WHERE tablespace_name = 'UNDOTBS1';

-- dargli più spazio
ALTER TABLESPACE undotbs1 ADD DATAFILE '/u01/app/oracle/oradata/ORATEST/undotbs02.dbf' SIZE 1G;
```
