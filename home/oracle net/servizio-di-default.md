## Che cos'è?

Il servizio che prende il nome da `db_unique_name` (default = `db_name`), più `db_domain` se valorizzato.

## A cosa serve?

Esiste sempre e non si elimina.

## Codice

```sql
SHOW PARAMETER db_unique_name
SHOW PARAMETER db_domain
SELECT name FROM v$active_services;   -- il servizio di default, più XDB e quelli creati
```
