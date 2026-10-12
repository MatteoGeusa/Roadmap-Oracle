## Che cos'è?

Un ruolo predefinito.

## A cosa serve?

Permettere la creazione di oggetti nel proprio schema.

## Codice

```sql
GRANT RESOURCE TO nome_utente;

-- da Oracle 12c RESOURCE non dà spazio: serve una quota sul tablespace
ALTER USER nome_utente QUOTA 100M ON users;

-- cosa contiene il ruolo
SELECT privilege FROM dba_sys_privs WHERE grantee = 'RESOURCE';
```
