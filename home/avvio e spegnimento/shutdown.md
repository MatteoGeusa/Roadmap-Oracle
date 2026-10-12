## Che cos'è?

Il comando che spegne l'istanza, in quattro modalità: NORMAL, TRANSACTIONAL, IMMEDIATE e ABORT.

## A cosa serve?

Spegne il database decidendo cosa fare con utenti e transazioni ancora attivi. Ogni operazione di shutdown viene registrata nell'alert log.

## Codice

```sql
SHUTDOWN;                 -- NORMAL: aspetta che tutti si scolleghino
SHUTDOWN TRANSACTIONAL;   -- aspetta la fine delle transazioni aperte
SHUTDOWN IMMEDIATE;       -- rollback delle transazioni e disconnessione di tutti
SHUTDOWN ABORT;           -- spegnimento istantaneo, crash recovery al riavvio
```
