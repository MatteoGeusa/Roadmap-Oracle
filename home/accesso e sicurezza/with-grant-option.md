## Che cos'è?

Una clausola del `GRANT` per i privilegi di oggetto.

## A cosa serve?

Chi la riceve può girare il privilegio ad altri. Si concede solo a utenti o a PUBLIC, non ai ruoli, e la revoca è a cascata.

## Codice

```sql
GRANT SELECT ON emp TO nome_utente WITH GRANT OPTION;

-- GRANTABLE = YES: può girarlo ad altri
SELECT grantee, table_name, privilege, grantable
FROM user_tab_privs
WHERE table_name = 'EMP';
```
