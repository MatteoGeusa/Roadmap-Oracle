## Che cos'è?

Una clausola del `GRANT` per privilegi di sistema e ruoli.

## A cosa serve?

Chi la riceve può concedere quel privilegio o ruolo ad altri, e anche revocarlo. Si può concedere a un ruolo, e la revoca **non** è a cascata.

## Codice

```sql
GRANT CREATE TABLE TO nome_utente WITH ADMIN OPTION;   -- privilegio di sistema
GRANT nome_ruolo TO nome_utente WITH ADMIN OPTION;     -- ruolo

-- ADMIN_OPTION = YES: può concederli e revocarli ad altri
SELECT privilege, admin_option FROM dba_sys_privs WHERE grantee = 'NOME_UTENTE';
SELECT granted_role, admin_option FROM dba_role_privs WHERE grantee = 'NOME_UTENTE';
```
