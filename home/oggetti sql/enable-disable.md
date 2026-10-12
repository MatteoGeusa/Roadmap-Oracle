## Che cos'è?

L'interruttore del vincolo che riguarda le righe nuove.

## A cosa serve?

Decide se le righe inserite o modificate da ora in poi vengono controllate.

## Codice

```sql
ALTER TABLE dipendenti DISABLE CONSTRAINT dipendenti_rep_fk;   -- le righe nuove non vengono controllate
ALTER TABLE dipendenti ENABLE CONSTRAINT dipendenti_rep_fk;    -- di nuovo controllate (e verifica le esistenti)
```
