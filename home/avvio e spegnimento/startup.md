## Che cos'è?

Il comando che avvia l'istanza, in tre fasi in sequenza: NOMOUNT, MOUNT e OPEN.

## A cosa serve?

Porta il database fino allo stato accessibile. `STARTUP` da solo esegue tutte e tre le fasi; ogni operazione di startup viene registrata nell'alert log.

## Codice

```sql
STARTUP;                  -- tutte e tre le fasi

-- oppure una fase alla volta
STARTUP NOMOUNT;
ALTER DATABASE MOUNT;
ALTER DATABASE OPEN;
```
