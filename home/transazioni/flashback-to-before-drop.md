## Che cos'è?

Il comando `FLASHBACK TABLE … TO BEFORE DROP`.

## A cosa serve?

Recupera dal cestino una tabella eliminata con `DROP`.

## Codice

```sql
DROP TABLE emp;
FLASHBACK TABLE emp TO BEFORE DROP;

-- se nel frattempo è stata creata un'altra EMP, la si recupera con un altro nome
FLASHBACK TABLE emp TO BEFORE DROP RENAME TO emp_recuperata;
```
