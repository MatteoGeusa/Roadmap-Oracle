## Che cos'è?

Un comando DDL, con COMMIT implicito, che elimina tutte le righe senza `WHERE`.

## A cosa serve?

Svuotare una tabella velocemente: quasi nessun undo e redo, rilascia gli extent (o li tiene con `REUSE STORAGE`) e riporta giù l'high water mark. Non si torna indietro con ROLLBACK.

## Codice

```sql
TRUNCATE TABLE emp;                    -- svuota e rilascia gli extent
TRUNCATE TABLE emp REUSE STORAGE;      -- svuota ma tiene gli extent allocati

-- una madre referenziata da una foreign key abilitata dà ORA-02266,
-- anche con la figlia vuota: il vincolo va disabilitato
ALTER TABLE dipendenti DISABLE CONSTRAINT dipendenti_rep_fk;
TRUNCATE TABLE reparti;
ALTER TABLE dipendenti ENABLE CONSTRAINT dipendenti_rep_fk;
```
