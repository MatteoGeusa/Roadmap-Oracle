## Che cos'è?

La procedura per creare un database senza DBCA.

## A cosa serve?

Ambiente e password file, PFILE minimo, `STARTUP NOMOUNT`, `CREATE DATABASE`, poi `catalog.sql` e `catproc.sql`, e infine verifica con `v$database` e `v$instance`.

## Codice

**1. Ambiente, cartelle e password file**

```bash
export ORACLE_SID=ORATEST
export ORACLE_HOME=/u01/app/oracle/product/19.0.0/dbhome1
export PATH=$ORACLE_HOME/bin:$PATH

mkdir -p /u01/app/oracle/oradata/ORATEST
mkdir -p /u01/app/oracle/admin/ORATEST/adump

# chiede la password di SYS
orapwd file=$ORACLE_HOME/dbs/orapw$ORACLE_SID
```

**2. PFILE minimo**, in `$ORACLE_HOME/dbs/initORATEST.ora`

```text
db_name=ORATEST
# in produzione le copie del control file vanno su dischi diversi
control_files=('/u01/app/oracle/oradata/ORATEST/control01.ctl','/u01/app/oracle/oradata/ORATEST/control02.ctl')
memory_target=1G
undo_tablespace=UNDOTBS1
db_block_size=8192
audit_file_dest='/u01/app/oracle/admin/ORATEST/adump'
diagnostic_dest='/u01/app/oracle'
```

**3. NOMOUNT e CREATE DATABASE** (`sqlplus / as sysdba`)

```sql
STARTUP NOMOUNT PFILE='/u01/app/oracle/product/19.0.0/dbhome1/dbs/initORATEST.ora';

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

**4. Viste del dizionario e PL/SQL**

```sql
@?/rdbms/admin/catalog.sql
@?/rdbms/admin/catproc.sql
@?/rdbms/admin/utlrp.sql      -- ricompila gli oggetti rimasti invalidi
```

**5. Verifica e passaggio allo SPFILE**

```sql
SELECT name, open_mode FROM v$database;
SELECT instance_name, status FROM v$instance;

-- così ALTER SYSTEM potrà salvare le modifiche su file
CREATE SPFILE FROM PFILE;
```
