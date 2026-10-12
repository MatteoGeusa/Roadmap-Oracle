## Che cos'è?

I due usi di una vista: su una sola tabella (per filtrare righe o colonne) o su più tabelle tramite join.

## A cosa serve?

Solo le viste su una sola tabella si possono usare anche per scrivere; quelle su più tabelle in genere no, perché Oracle non saprebbe su quale tabella riversare la modifica.

## Codice

```sql
-- su una tabella: filtra righe e colonne, e si può usare anche per scrivere
CREATE OR REPLACE VIEW maschi AS
  SELECT nome, cognome, sesso FROM persone WHERE sesso = 'M';

-- su più tabelle: la join scritta una volta sola
CREATE OR REPLACE VIEW dipendenti_reparti AS
  SELECT d.id_dip, d.cod_fiscale, r.nome AS reparto
  FROM dipendenti d
  JOIN reparti r ON r.id_reparto = d.id_reparto;

-- quali colonne di una vista si possono modificare
SELECT column_name, updatable FROM user_updatable_columns WHERE table_name = 'DIPENDENTI_REPARTI';
```
