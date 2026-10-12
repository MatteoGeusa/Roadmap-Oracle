## Che cos'è?

Il comando SQL `CREATE USER nome_utente IDENTIFIED BY password`.

## A cosa serve?

Crea un utente. Per potersi collegare gli serve poi il privilegio `CREATE SESSION`.

## Codice

```sql
CREATE USER nome_utente IDENTIFIED BY password
  DEFAULT TABLESPACE users
  QUOTA 100M ON users;

GRANT CREATE SESSION TO nome_utente;   -- senza, il login fallisce con ORA-01045
```
