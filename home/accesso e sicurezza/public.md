## Che cos'è?

Un grantee speciale: tutti gli utenti del database, presenti e futuri.

## A cosa serve?

Concedere un privilegio a tutti (`GRANT SELECT ON emp TO PUBLIC`).

## Codice

```sql
GRANT SELECT ON emp TO PUBLIC;      -- tutti gli utenti, anche quelli futuri
REVOKE SELECT ON emp FROM PUBLIC;
```
