## Che cos'è?

Uno scope di `ALTER SYSTEM`.

## A cosa serve?

Scrive solo sul file, senza applicare subito. Con un PFILE fallisce: `ORA-32001: write to SPFILE requested but no SPFILE is in use`.

## Codice

```sql
-- utile per i parametri statici: vale dal prossimo avvio
ALTER SYSTEM SET processes = 500 SCOPE = SPFILE;

-- valore salvato nel file e valore in uso
SELECT value FROM v$spparameter WHERE name = 'processes';
SELECT value FROM v$parameter   WHERE name = 'processes';
```
