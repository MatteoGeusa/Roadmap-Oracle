## Che cos'è?

Un'opzione del tablespace di undo: `ALTER TABLESPACE … RETENTION GUARANTEE`.

## A cosa serve?

Rende la retention "dura": l'undo non viene sovrascritto entro la finestra, a costo di far fallire nuove scritture se lo spazio manca.

## Codice

```sql
ALTER TABLESPACE undotbs1 RETENTION GUARANTEE;
ALTER TABLESPACE undotbs1 RETENTION NOGUARANTEE;   -- torna al default

SELECT tablespace_name, retention FROM dba_tablespaces WHERE contents = 'UNDO';
```
