## Che cos'è?

La terza fase di avvio (`STARTUP OPEN`): lo stadio "normale" di funzionamento.

## A cosa serve?

L'istanza apre data file e redo log file referenziati dal control file: il database diventa pienamente accessibile a sessioni utente e applicazioni.

## Codice

```sql
STARTUP;                  -- da istanza spenta: NOMOUNT, MOUNT e OPEN
ALTER DATABASE OPEN;      -- oppure da MOUNT

SELECT open_mode FROM v$database;   -- READ WRITE
```
