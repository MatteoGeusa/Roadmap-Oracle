## Che cos'è?

La registrazione fatta dal database, tramite LREG e il parametro `local_listener`.

## A cosa serve?

È il default consigliato: annuncia tutti i servizi attivi, lo stato in `lsnrctl` è `READY` (OPEN) o `BLOCKED` (NOMOUNT, MOUNT), supporta load balancing e failover. A database spento il servizio sparisce.

## Codice

```sql
-- dove LREG trova il listener (vuoto = hostname, porta 1521)
SHOW PARAMETER local_listener
ALTER SYSTEM REGISTER;
```

```bash
lsnrctl services    # READY con il database OPEN, BLOCKED in NOMOUNT o MOUNT
```
