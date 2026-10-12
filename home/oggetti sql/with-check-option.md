## Che cos'è?

Un vincolo su una vista scrivibile.

## A cosa serve?

Impedisce di inserire o modificare tramite la vista righe che la vista stessa escluderebbe (es. una `F` nella vista `MASCHI`).

## Codice

```sql
CREATE OR REPLACE VIEW maschi AS
  SELECT nome, cognome, sesso FROM persone WHERE sesso = 'M'
  WITH CHECK OPTION;

INSERT INTO maschi (nome, cognome, sesso) VALUES ('Mario', 'Rossi', 'M');   -- ok
INSERT INTO maschi (nome, cognome, sesso) VALUES ('Anna', 'Rossi', 'F');    -- ORA-01402
```
