## Che cos'è?

Il comando che toglie un permesso (`REVOKE SELECT ON emp FROM utente`).

## A cosa serve?

Fa il contrario del GRANT. Se la revoca si propaga dipende dall'opzione con cui il privilegio era stato concesso.

## Codice

```sql
REVOKE SELECT ON emp FROM nome_utente;     -- privilegio di oggetto
REVOKE CREATE TABLE FROM nome_utente;      -- privilegio di sistema
REVOKE nome_ruolo FROM nome_utente;        -- ruolo
```
