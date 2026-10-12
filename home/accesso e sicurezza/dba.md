## Che cos'è?

Un ruolo predefinito, assegnato di default all'utente `SYSTEM`.

## A cosa serve?

L'amministrazione completa del database. È molto ampio, ma non equivale a SYSDBA.

## Codice

```sql
GRANT DBA TO nome_utente;

-- chi ha il ruolo DBA
SELECT grantee, admin_option
FROM dba_role_privs
WHERE granted_role = 'DBA';
```
