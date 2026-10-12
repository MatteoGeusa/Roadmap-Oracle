## Che cos'è?

Un modo di aggiornare una vista materializzata: Oracle tiene traccia in una tabella di log delle modifiche alle tabelle originali.

## A cosa serve?

Al nuovo aggiornamento riporta solo i cambiamenti effettivi.

## Codice

```sql
-- la tabella di log delle modifiche sulla tabella originale
CREATE MATERIALIZED VIEW LOG ON employees WITH PRIMARY KEY;

CREATE MATERIALIZED VIEW emp_dept60_fast_mv
  REFRESH FAST ON DEMAND AS
  SELECT employee_id, last_name FROM employees WHERE department_id = 60;

-- riporta solo i cambiamenti dall'ultimo refresh
EXEC DBMS_MVIEW.REFRESH('EMP_DEPT60_FAST_MV', 'F');
```
