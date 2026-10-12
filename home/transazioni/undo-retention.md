## Che cos'è?

Un parametro, in secondi (default 900).

## A cosa serve?

Indica per quanto tempo Oracle *cerca* di trattenere l'undo già committato prima di riciclarlo, così una query già aperta può ancora leggere i dati "vecchi". Non è una garanzia se il tablespace è sotto pressione e configurato senza `GUARANTEE`.

## Codice

```sql
-- modifica dinamica, effetto immediato
ALTER SYSTEM SET undo_retention = 1800 SCOPE = BOTH;
SHOW PARAMETER undo_retention

-- retention "dura": l'undo non viene sovrascritto entro la finestra,
-- a costo di far fallire nuove scritture se lo spazio manca
ALTER TABLESPACE undotbs1 RETENTION GUARANTEE;

-- stato dell'undo tablespace e consumo per sessione
SELECT tablespace_name, status, retention FROM dba_tablespaces WHERE tablespace_name LIKE '%UNDO%';
SELECT s.sid, s.username, t.used_ublk
FROM v$transaction t JOIN v$session s ON t.ses_addr = s.saddr;
```
