## Che cos'è?

Il file delle password, creato con `orapwd`.

## A cosa serve?

Fa parte della preparazione alla creazione manuale del database, e serve per l'accesso `SYSDBA` da remoto.

## Codice

```bash
# chiede la password di SYS; il file deve chiamarsi orapw<SID>
orapwd file=$ORACLE_HOME/dbs/orapw$ORACLE_SID
```

```sql
-- per l'accesso SYSDBA da remoto deve valere EXCLUSIVE (il default)
SHOW PARAMETER remote_login_passwordfile
SELECT username, sysdba FROM v$pwfile_users;
```
