## Che cos'è?

Un PFILE con i soli parametri indispensabili: `db_name`, `control_files`, `memory_target`, `undo_tablespace` ecc.

## A cosa serve?

Permette di avviare l'istanza in NOMOUNT per lanciare `CREATE DATABASE`.

## Codice

```text
# $ORACLE_HOME/dbs/initORATEST.ora
db_name=ORATEST
control_files=('/u01/app/oracle/oradata/ORATEST/control01.ctl','/u01/app/oracle/oradata/ORATEST/control02.ctl')
memory_target=1G
undo_tablespace=UNDOTBS1
db_block_size=8192
audit_file_dest='/u01/app/oracle/admin/ORATEST/adump'
diagnostic_dest='/u01/app/oracle'
```

```sql
STARTUP NOMOUNT PFILE='/u01/app/oracle/product/19.0.0/dbhome1/dbs/initORATEST.ora';
```
