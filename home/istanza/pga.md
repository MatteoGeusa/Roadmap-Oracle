## Che cos'è?

La Program Global Area: memoria **privata**, riservata a ciascun processo server o sessione e non condivisa, nemmeno in RAC. Si divide in SQL work area e memoria di sessione.

## A cosa serve?

Ospita ciò che serve solo alla singola sessione: per esempio l'ordinamento dei risultati di una query (`ORDER BY`).

## Codice

```sql
SHOW PARAMETER pga_aggregate_target
ALTER SYSTEM SET pga_aggregate_target = 1G SCOPE = BOTH;

-- PGA allocata in questo momento
SELECT name, ROUND(value / 1024 / 1024) AS mb
FROM v$pgastat
WHERE name IN ('aggregate PGA target parameter', 'total PGA allocated');
```
