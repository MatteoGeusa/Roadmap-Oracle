## Che cos'è?

Il blocco forzato di un utente.

## A cosa serve?

Impedirgli di accedere al database senza eliminarlo, per esempio perché possiede elementi ancora utili.

## Codice

```sql
ALTER USER nome_utente ACCOUNT LOCK;     -- il login viene rifiutato con ORA-28000
ALTER USER nome_utente ACCOUNT UNLOCK;

SELECT username, account_status, lock_date
FROM dba_users
WHERE username = 'NOME_UTENTE';
```
