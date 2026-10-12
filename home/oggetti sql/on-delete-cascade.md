## Che cos'è?

Una clausola della FOREIGN KEY.

## A cosa serve?

Alla cancellazione di una riga madre, cancella anche le righe figlie.

## Codice

```sql
ALTER TABLE dipendenti ADD CONSTRAINT dipendenti_rep_fk
  FOREIGN KEY (id_reparto) REFERENCES reparti (id_reparto)
  ON DELETE CASCADE;

DELETE FROM reparti WHERE id_reparto = 10;   -- cancella anche i dipendenti del reparto 10
```
