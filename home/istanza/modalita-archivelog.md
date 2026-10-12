## Che cos'è?

La modalità di funzionamento in cui il processo ARCn è attivo. In NOARCHIVELOG l'alert log riporta `Archiving is disabled`.

## A cosa serve?

Conserva i redo log come archived redo log: è necessaria per i backup a caldo con RMAN e per il point-in-time recovery.

## Codice

```sql
ARCHIVE LOG LIST                    -- "Database log mode": No Archive Mode o Archive Mode

-- passaggio in ARCHIVELOG (serve il MOUNT)
SHUTDOWN IMMEDIATE;
STARTUP MOUNT;
ALTER DATABASE ARCHIVELOG;
ALTER DATABASE OPEN;

SELECT log_mode FROM v$database;    -- ARCHIVELOG

-- facoltativo: dove scrivere gli archived redo log
ALTER SYSTEM SET log_archive_dest_1 = 'LOCATION=/u02/oradata/ORATEST/archive' SCOPE = BOTH;
```
