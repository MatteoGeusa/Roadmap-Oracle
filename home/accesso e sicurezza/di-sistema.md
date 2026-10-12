## Che cos'è?

Un privilegio che riguarda un'azione in generale, come `CREATE TABLE`, `CREATE USER`, `CREATE SESSION`. Non ha la parola `ON`.

## A cosa serve?

Autorizza azioni sul database. Di solito li gestisce il DBA.

## Codice

```sql
GRANT CREATE TABLE, CREATE VIEW TO nome_utente;
REVOKE CREATE VIEW FROM nome_utente;

-- privilegi di sistema concessi direttamente
SELECT privilege, admin_option
FROM dba_sys_privs
WHERE grantee = 'NOME_UTENTE';
```
