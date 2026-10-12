## Che cos'è?

Una regola sui privilegi ricevuti tramite ruolo.

## A cosa serve?

Non valgono dentro le procedure PL/SQL compilate con i diritti del proprietario (definer's rights, il default): lì servono privilegi concessi direttamente all'utente.

## Codice

```sql
-- collegati come scott: il privilegio arriva a nome_utente solo tramite ruolo...
GRANT SELECT ON emp TO nome_ruolo;
GRANT nome_ruolo TO nome_utente;

-- collegati come nome_utente: ...quindi la procedura è creata con errori (ORA-00942)
CREATE OR REPLACE PROCEDURE conta_dipendenti AS
  n NUMBER;
BEGIN
  SELECT COUNT(*) INTO n FROM scott.emp;
END;
/
SHOW ERRORS

-- collegati come scott: serve il GRANT diretto all'utente
GRANT SELECT ON emp TO nome_utente;

-- collegati come nome_utente: ora compila
ALTER PROCEDURE conta_dipendenti COMPILE;
```
