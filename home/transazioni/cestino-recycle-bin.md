## Che cos'è?

Il cestino (recycle bin), in cui finisce una tabella eliminata con `DROP`. Si consulta con `user_recyclebin`.

## A cosa serve?

Permette di recuperare la tabella con `FLASHBACK TABLE … TO BEFORE DROP`. `DROP TABLE … PURGE` elimina senza passare dal cestino.

## Codice

```sql
SHOW RECYCLEBIN
SELECT object_name, original_name, droptime FROM user_recyclebin;

FLASHBACK TABLE emp TO BEFORE DROP;    -- recupera la tabella...
PURGE TABLE emp;                       -- ...oppure la elimina per sempre
PURGE RECYCLEBIN;                      -- svuota il cestino
```
