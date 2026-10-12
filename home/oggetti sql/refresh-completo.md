## Che cos'è?

Un modo di aggiornare una vista materializzata.

## A cosa serve?

Cancella tutti i record dalla vista e reinserisce il risultato della query completa.

## Codice

```sql
CREATE MATERIALIZED VIEW emp_dept60_mv
  REFRESH COMPLETE ON DEMAND AS
  SELECT employee_id, last_name FROM employees WHERE department_id = 60;

-- refresh completo, a richiesta
EXEC DBMS_MVIEW.REFRESH('EMP_DEPT60_MV', 'C');
```
