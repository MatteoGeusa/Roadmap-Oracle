## Che cos'è?

DCD: si abilita con `SQLNET.EXPIRE_TIME` nel `sqlnet.ora`.

## A cosa serve?

Chiudere le connessioni abbandonate.

## Codice

```text
# sqlnet.ora del server: ogni 10 minuti verifica che il client ci sia ancora
SQLNET.EXPIRE_TIME = 10
```
