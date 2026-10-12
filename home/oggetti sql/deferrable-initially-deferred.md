## Che cos'è?

Un vincolo controllato solo al COMMIT: se è violato, il COMMIT fallisce e la transazione viene annullata.

## A cosa serve?

Inserire madre e figlio in ordine qualsiasi.

## Codice

```sql
ALTER TABLE dipendenti ADD CONSTRAINT dipendenti_rep_fk
  FOREIGN KEY (id_reparto) REFERENCES reparti (id_reparto)
  DEFERRABLE INITIALLY DEFERRED;

-- prima il figlio, poi la madre: il controllo avviene al COMMIT
INSERT INTO dipendenti (id_dip, id_reparto) VALUES (1, 50);
INSERT INTO reparti (id_reparto, nome) VALUES (50, 'Ricerca');
COMMIT;
```
