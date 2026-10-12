## Che cos'è?

Un parametro del parameter file.

## A cosa serve?

Stabilisce fin dal NOMOUNT a quale database l'istanza è destinata a collegarsi, e vincola `CREATE DATABASE`: con `DB_NAME=PIPPO` l'unico comando valido è `CREATE DATABASE pippo`.

## Codice

```text
# nel PFILE
db_name=ORATEST
```

```sql
SHOW PARAMETER db_name
SELECT name FROM v$database;    -- da MOUNT in poi
```
