## Che cos'è?

Il massimo livello di privilegio, sempre presente per `SYS`.

## A cosa serve?

Fare `STARTUP` e `SHUTDOWN`, creare un database e operare quando il database non è ancora aperto. `SYSTEM` non lo ha, a meno che qualcuno non glielo conceda esplicitamente.

## Codice

```sql
-- concederlo (finisce nel password file)
GRANT SYSDBA TO nome_utente;

-- chi ce l'ha
SELECT username, sysdba FROM v$pwfile_users;
```

```bash
# usarlo: chiede la password
sqlplus nome_utente as sysdba
```
