## Che cos'è?

Il comportamento di default di un vincolo.

## A cosa serve?

Il vincolo è controllato alla fine di ogni istruzione.

## Codice

```sql
-- NOT DEFERRABLE è il default: scriverlo o no è lo stesso
ALTER TABLE dipendenti ADD CONSTRAINT dipendenti_cf_uk UNIQUE (cod_fiscale) NOT DEFERRABLE;

SELECT constraint_name, deferrable, deferred FROM user_constraints WHERE table_name = 'DIPENDENTI';
```
