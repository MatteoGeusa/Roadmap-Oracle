## Che cos'è?

Le viste del dizionario con prefisso `ALL_`.

## A cosa serve?

Mostrano gli oggetti a cui l'utente ha diritto di accedere: i propri e quelli ricevuti tramite GRANT. Rispetto alle `USER_` hanno la colonna `OWNER`.

## Codice

```sql
-- tabelle che l'utente corrente può leggere, con il proprietario
SELECT owner, table_name
FROM all_tables
ORDER BY owner, table_name;

-- oggetti accessibili di un certo proprietario
SELECT object_name, object_type
FROM all_objects
WHERE owner = 'SCOTT';
```
