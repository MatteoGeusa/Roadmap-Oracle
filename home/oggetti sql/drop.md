## Che cos'è?

Un comando DDL, con COMMIT implicito, che elimina la tabella intera: dati e struttura, con indici, vincoli, trigger e grant.

## A cosa serve?

Eliminare l'oggetto. La tabella finisce nel cestino e si recupera con `FLASHBACK TABLE … TO BEFORE DROP`; viste e procedure che la usavano diventano INVALID.

## Codice

```sql
DROP TABLE emp;                          -- finisce nel cestino
FLASHBACK TABLE emp TO BEFORE DROP;      -- recupero

-- se altre tabelle la referenziano con una foreign key
DROP TABLE reparti CASCADE CONSTRAINTS;

-- viste e procedure rimaste INVALID
SELECT object_name, object_type FROM user_objects WHERE status = 'INVALID';
```
