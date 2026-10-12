## Che cos'è?

Il parametro del parameter file (`CONTROL_FILES`) che contiene il path del control file.

## A cosa serve?

Indica all'istanza dove trovare il control file in MOUNT. Con `CREATE DATABASE`, Oracle crea fisicamente il control file proprio in quel path.

## Codice

```text
# nel PFILE: uno o più path, separati da virgola
control_files=('/u01/app/oracle/oradata/ORATEST/control01.ctl','/u02/oradata/ORATEST/control02.ctl')
```

```sql
SHOW PARAMETER control_files
SELECT name FROM v$controlfile;
```
