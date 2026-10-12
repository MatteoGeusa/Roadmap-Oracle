## Che cos'è?

Uno snapshot dei dati risultanti da una query, salvato fisicamente come segment: occupa spazio.

## A cosa serve?

Query pesanti e aggregazioni, dove serve velocità e un piccolo ritardo sui dati è accettabile: i dati sono già pronti. Va refreshata per restare allineata.

## Codice

```sql
CREATE MATERIALIZED VIEW emp_dept60_mv
  REFRESH COMPLETE ON DEMAND AS
  SELECT employee_id, last_name FROM employees WHERE department_id = 60;

-- refresh a richiesta
EXEC DBMS_MVIEW.REFRESH('EMP_DEPT60_MV');

-- oppure refresh automatico ogni ora
ALTER MATERIALIZED VIEW emp_dept60_mv REFRESH COMPLETE START WITH SYSDATE NEXT SYSDATE + 1/24;
```
