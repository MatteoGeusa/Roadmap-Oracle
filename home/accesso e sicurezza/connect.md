## Che cos'è?

Un ruolo predefinito che contiene solo `CREATE SESSION`.

## A cosa serve?

Permettere a un utente di collegarsi.

## Codice

```sql
GRANT CONNECT TO nome_utente;

-- cosa contiene il ruolo
SELECT privilege FROM dba_sys_privs WHERE grantee = 'CONNECT';
```
