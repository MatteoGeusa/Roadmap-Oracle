## Che cos'è?

Uno script SQL presente nell'Oracle Home dall'installazione: `$ORACLE_HOME/rdbms/admin/catalog.sql`.

## A cosa serve?

Crea le viste del data dictionary (`DBA_*`, `ALL_*`, `USER_*`) e le viste dinamiche `V$`. Senza di esso il database è aperto ma praticamente inutilizzabile per l'amministrazione.

## Codice

```sql
-- in SQL*Plus come SYSDBA, dopo CREATE DATABASE (? sta per $ORACLE_HOME)
@?/rdbms/admin/catalog.sql
```
