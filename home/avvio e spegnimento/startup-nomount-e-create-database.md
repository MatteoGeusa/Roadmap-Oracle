## Che cos'è?

I due passi centrali della creazione manuale: `STARTUP NOMOUNT PFILE=…` e poi `CREATE DATABASE …`.

## A cosa serve?

`CREATE DATABASE` crea data file, redo log, control file e i tablespace principali (`SYSTEM`, `SYSAUX`, `USERS`, `TEMP`, `UNDOTBS1`), oltre alle tabelle base del data dictionary.

## Codice

```sql
STARTUP NOMOUNT PFILE='/u01/app/oracle/product/19.0.0/dbhome1/dbs/initORATEST.ora';

-- il nome deve essere quello di db_name
CREATE DATABASE oratest
  USER SYS IDENTIFIED BY password_sys
  USER SYSTEM IDENTIFIED BY password_system
  LOGFILE GROUP 1 ('/u01/app/oracle/oradata/ORATEST/redo01.log') SIZE 200M,
          GROUP 2 ('/u01/app/oracle/oradata/ORATEST/redo02.log') SIZE 200M,
          GROUP 3 ('/u01/app/oracle/oradata/ORATEST/redo03.log') SIZE 200M
  CHARACTER SET AL32UTF8
  NATIONAL CHARACTER SET AL16UTF16
  EXTENT MANAGEMENT LOCAL
  DATAFILE '/u01/app/oracle/oradata/ORATEST/system01.dbf' SIZE 700M AUTOEXTEND ON
  SYSAUX DATAFILE '/u01/app/oracle/oradata/ORATEST/sysaux01.dbf' SIZE 550M AUTOEXTEND ON
  DEFAULT TABLESPACE users
    DATAFILE '/u01/app/oracle/oradata/ORATEST/users01.dbf' SIZE 100M AUTOEXTEND ON
  DEFAULT TEMPORARY TABLESPACE temp
    TEMPFILE '/u01/app/oracle/oradata/ORATEST/temp01.dbf' SIZE 100M AUTOEXTEND ON
  UNDO TABLESPACE undotbs1
    DATAFILE '/u01/app/oracle/oradata/ORATEST/undotbs01.dbf' SIZE 200M AUTOEXTEND ON;
```
