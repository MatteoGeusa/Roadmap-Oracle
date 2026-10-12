## Che cos'è?

Una clausola della FOREIGN KEY.

## A cosa serve?

Alla cancellazione di una riga madre, mette a NULL la colonna nelle righe figlie.

## Codice

```sql
ALTER TABLE dipendenti ADD CONSTRAINT dipendenti_rep_fk
  FOREIGN KEY (id_reparto) REFERENCES reparti (id_reparto)
  ON DELETE SET NULL;

DELETE FROM reparti WHERE id_reparto = 10;   -- i dipendenti restano, con id_reparto a NULL
```
