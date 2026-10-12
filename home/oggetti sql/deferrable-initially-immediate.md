## Che cos'è?

Un vincolo controllato per istruzione, ma rinviabile.

## A cosa serve?

Si può rimandare il controllo con `SET CONSTRAINTS ALL DEFERRED;`.

## Codice

```sql
ALTER TABLE dipendenti ADD CONSTRAINT dipendenti_rep_fk
  FOREIGN KEY (id_reparto) REFERENCES reparti (id_reparto)
  DEFERRABLE INITIALLY IMMEDIATE;

-- rimanda il controllo al COMMIT, solo per questa transazione
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO dipendenti (id_dip, id_reparto) VALUES (1, 50);
INSERT INTO reparti (id_reparto, nome) VALUES (50, 'Ricerca');
COMMIT;
```
