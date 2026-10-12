## Che cos'è?

La scelta di quanti blocchi compongono un extent.

## A cosa serve?

Può deciderlo Oracle in autonomia (scelta di default, fortemente consigliata) oppure il DBA manualmente.

## Codice

```sql
-- Oracle sceglie la dimensione degli extent (default, consigliato)
CREATE TABLESPACE dati_auto
  DATAFILE '/u02/oradata/ORATEST/dati_auto01.dbf' SIZE 500M
  EXTENT MANAGEMENT LOCAL AUTOALLOCATE;

-- il DBA fissa la dimensione: tutti gli extent da 1 MB
CREATE TABLESPACE dati_uniform
  DATAFILE '/u02/oradata/ORATEST/dati_uniform01.dbf' SIZE 500M
  EXTENT MANAGEMENT LOCAL UNIFORM SIZE 1M;

-- ALLOCATION_TYPE: SYSTEM (automatica) o UNIFORM
SELECT tablespace_name, allocation_type FROM dba_tablespaces;
```
