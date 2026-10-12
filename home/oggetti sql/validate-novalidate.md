## Che cos'è?

L'interruttore del vincolo che riguarda le righe già presenti.

## A cosa serve?

Decide se le righe esistenti vengono controllate.

## Codice

```sql
-- attiva il vincolo senza controllare le righe già presenti
ALTER TABLE dipendenti MODIFY CONSTRAINT dipendenti_sal_ck ENABLE NOVALIDATE;

-- una volta ripuliti i dati, controlla anche quelle
ALTER TABLE dipendenti MODIFY CONSTRAINT dipendenti_sal_ck ENABLE VALIDATE;
```
