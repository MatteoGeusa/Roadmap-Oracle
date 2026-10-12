## Che cos'è?

Un'impostazione della transazione (`SET TRANSACTION ISOLATION LEVEL …`): READ COMMITTED o SERIALIZABLE.

## A cosa serve?

Stabilisce "quanto indietro" si legge, cioè a quale momento è riferita la fotografia dei dati.

## Codice

```sql
-- per la transazione corrente: deve essere la prima istruzione
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- per tutte le transazioni della sessione
ALTER SESSION SET ISOLATION_LEVEL = SERIALIZABLE;
```
