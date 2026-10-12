## Che cos'è?

La configurazione in cui il control file viene scritto su più path: per questo nell'alert log `control_files` compare due volte.

## A cosa serve?

Ridondanza: il control file non dipende da una sola copia.

## Codice

```sql
-- 1. aggiungi il secondo path allo SPFILE
ALTER SYSTEM SET control_files =
  '/u01/app/oracle/oradata/ORATEST/control01.ctl',
  '/u02/oradata/ORATEST/control02.ctl'
  SCOPE = SPFILE;

-- 2. ferma il database
SHUTDOWN IMMEDIATE;
```

```bash
# 3. copia il control file nel nuovo path
cp /u01/app/oracle/oradata/ORATEST/control01.ctl /u02/oradata/ORATEST/control02.ctl
```

```sql
-- 4. riavvia e verifica
STARTUP;
SELECT name FROM v$controlfile;
```
