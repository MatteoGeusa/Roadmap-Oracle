## Che cos'è?

La registrazione fatta dal database, tramite LREG e il parametro `local_listener`.

## A cosa serve?

È il default consigliato: annuncia tutti i servizi attivi, lo stato in `lsnrctl` è `READY` (OPEN) o `BLOCKED` (NOMOUNT, MOUNT), supporta load balancing e failover. A database spento il servizio sparisce.
