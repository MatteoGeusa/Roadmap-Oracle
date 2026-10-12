## Che cos'è?

Le viste del dizionario con prefisso `USER_`.

## A cosa serve?

Mostrano gli oggetti di proprietà dell'utente che esegue la query. Non hanno la colonna `OWNER`, perché il proprietario è sempre lui.

## Codice

```sql
-- oggetti dell'utente corrente: niente colonna OWNER
SELECT table_name, tablespace_name FROM user_tables;
SELECT object_name, object_type, status FROM user_objects;
```
