## Che cos'è?

Chi esegue il GRANT (**grantor**) e chi riceve il permesso (**grantee**).

## A cosa serve?

Chiarisce chi può concedere (il proprietario dell'oggetto, chi ha `WITH GRANT OPTION` o `WITH ADMIN OPTION`, chi ha `GRANT ANY PRIVILEGE` / `GRANT ANY OBJECT PRIVILEGE`) e chi può ricevere: un utente, un ruolo o PUBLIC.

## Codice

```sql
-- chi ha concesso cosa, e a chi, sugli oggetti di SCOTT
SELECT grantor, grantee, table_name, privilege, grantable
FROM dba_tab_privs
WHERE owner = 'SCOTT';
```
