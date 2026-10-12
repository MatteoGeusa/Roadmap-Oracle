## Che cos'è?

Un privilegio che riguarda un oggetto preciso, come "puoi leggere la mia tabella EMP". Ha la parola `ON`.

## A cosa serve?

Autorizza azioni su singoli oggetti di altri. Chi lo riceve indica il proprietario (`scott.emp`) e può fare solo ciò che gli è stato concesso. Sui propri oggetti non serve: il proprietario può sempre leggerli.

## Codice

```sql
-- collegati come proprietario (scott)
GRANT SELECT, INSERT, UPDATE ON emp TO nome_utente;

-- collegati come nome_utente: va indicato il proprietario
SELECT * FROM scott.emp;

-- privilegi di oggetto ricevuti
SELECT owner, table_name, privilege, grantor
FROM user_tab_privs
WHERE grantee = USER;
```
