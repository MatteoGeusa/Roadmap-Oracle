## Che cos'è?

Un linguaggio di programmazione a tutti gli effetti (Procedure Language): cicli, variabili, condizioni e gestione strutturata delle eccezioni. SQL, invece, è un linguaggio di interrogazione senza variabili né costrutti di programmazione.

## A cosa serve?

Scrivere procedure, funzioni, package e trigger, che vengono salvati all'interno del database.

## Codice

```sql
CREATE OR REPLACE PROCEDURE aumenta_stipendio (
  p_id_dip IN NUMBER,
  p_perc   IN NUMBER
) AS
BEGIN
  UPDATE dipendenti
     SET stipendio = stipendio * (1 + p_perc / 100)
   WHERE id_dip = p_id_dip;

  IF SQL%ROWCOUNT = 0 THEN
    RAISE_APPLICATION_ERROR(-20001, 'Dipendente ' || p_id_dip || ' non trovato');
  END IF;
END;
/

-- eseguirla
EXEC aumenta_stipendio(100, 10);
```
