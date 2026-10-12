## Che cos'è?

Un insieme di caratteristiche che si possono creare in più varianti.

## A cosa serve?

Ogni utente eredita le caratteristiche del profilo che gli è assegnato.

## Codice

```sql
CREATE PROFILE profilo_app LIMIT
  FAILED_LOGIN_ATTEMPTS 5     -- blocca l'utente dopo 5 tentativi errati...
  PASSWORD_LOCK_TIME    1     -- ...per 1 giorno
  PASSWORD_LIFE_TIME    90    -- la password scade dopo 90 giorni
  SESSIONS_PER_USER     3;    -- al massimo 3 sessioni contemporanee

ALTER USER nome_utente PROFILE profilo_app;

SELECT resource_name, limit
FROM dba_profiles
WHERE profile = 'PROFILO_APP';
```
