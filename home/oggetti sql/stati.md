## Che cos'è?

I due interruttori di un vincolo: **ENABLE/DISABLE** riguarda le righe nuove, **VALIDATE/NOVALIDATE** quelle già presenti.

## A cosa serve?

Adattare il controllo alla situazione: normale (`ENABLE VALIDATE`), dati storici "sporchi" (`ENABLE NOVALIDATE`), caricamenti massivi (`DISABLE NOVALIDATE`), tabelle in sola lettura (`DISABLE VALIDATE`).

## Codice

```sql
-- situazione normale: controlla righe nuove ed esistenti
ALTER TABLE dipendenti MODIFY CONSTRAINT dipendenti_sal_ck ENABLE VALIDATE;

-- dati storici "sporchi": controlla solo le righe nuove
ALTER TABLE dipendenti MODIFY CONSTRAINT dipendenti_sal_ck ENABLE NOVALIDATE;

-- caricamento massivo: nessun controllo, poi si riabilita
ALTER TABLE dipendenti MODIFY CONSTRAINT dipendenti_sal_ck DISABLE NOVALIDATE;

-- sola lettura: nessun INSERT, UPDATE o DELETE sulla tabella
ALTER TABLE dipendenti MODIFY CONSTRAINT dipendenti_sal_ck DISABLE VALIDATE;

SELECT constraint_name, status, validated FROM user_constraints WHERE table_name = 'DIPENDENTI';
```
