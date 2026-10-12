## Che cos'è?

Il comando `SET ROLE nome_ruolo` e l'impostazione `ALTER USER … DEFAULT ROLE …`.

## A cosa serve?

Un ruolo concesso può essere attivo di default oppure da attivare con `SET ROLE`.

## Codice

```sql
-- nella sessione: attiva solo questo ruolo, oppure nessuno
SET ROLE nome_ruolo;
SET ROLE NONE;

-- quali ruoli sono attivi al login
ALTER USER nome_utente DEFAULT ROLE ALL EXCEPT nome_ruolo;
ALTER USER nome_utente DEFAULT ROLE ALL;

-- ruoli attivi adesso
SELECT * FROM session_roles;
```
