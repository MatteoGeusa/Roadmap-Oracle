## Che cos'è?

Un nome dato a una query: non contiene dati propri e non è un segment fisico. Quando la si usa, Oracle sostituisce al volo il nome con la query.

## A cosa serve?

Vedere insieme dati di più tabelle senza riscrivere la join ogni volta, oppure filtrare righe e colonne di una tabella.

## Codice

```sql
CREATE OR REPLACE VIEW emp_dept60 AS
  SELECT employee_id, last_name FROM employees WHERE department_id = 60;

SELECT * FROM emp_dept60;     -- Oracle esegue al volo la query della vista

-- la query salvata
SELECT text FROM user_views WHERE view_name = 'EMP_DEPT60';

DROP VIEW emp_dept60;
```
