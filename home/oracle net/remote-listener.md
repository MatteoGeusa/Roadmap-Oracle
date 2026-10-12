## Che cos'è?

Un parametro dell'istanza.

## A cosa serve?

Indica a LREG i listener su altre macchine; in RAC, i listener SCAN.

## Codice

```sql
-- in RAC: il nome SCAN e la sua porta
ALTER SYSTEM SET remote_listener = 'scan-cluster.azienda.it:1521' SCOPE = BOTH;
SHOW PARAMETER remote_listener
```
