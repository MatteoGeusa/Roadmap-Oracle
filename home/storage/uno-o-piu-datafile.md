## Che cos'è?

La relazione tra tablespace e datafile: ogni tablespace è composto da uno o più datafile.

## A cosa serve?

I dati di una tabella stanno sempre nello stesso tablespace, ma i suoi extent possono trovarsi in datafile diversi di quel tablespace.

## Codice

```sql
-- un secondo datafile per lo stesso tablespace
ALTER TABLESPACE users ADD DATAFILE '/u02/oradata/ORATEST/users02.dbf' SIZE 1G;

-- in quali datafile stanno gli extent di una tabella
SELECT f.file_name, COUNT(*) AS num_extent
FROM dba_extents e
JOIN dba_data_files f ON f.file_id = e.file_id
WHERE e.owner = 'SCOTT' AND e.segment_name = 'EMP'
GROUP BY f.file_name;
```
