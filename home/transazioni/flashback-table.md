## Che cos'è?

Il comando `FLASHBACK TABLE … TO TIMESTAMP …` oppure `… TO SCN …`.

## A cosa serve?

Riporta una tabella com'era a un istante (es. `SYSTIMESTAMP - INTERVAL '10' MINUTE`) o a un SCN specifico.

## Codice

```sql
-- prerequisito: le righe devono poter cambiare rowid
ALTER TABLE employees ENABLE ROW MOVEMENT;

FLASHBACK TABLE employees TO TIMESTAMP (SYSTIMESTAMP - INTERVAL '10' MINUTE);
FLASHBACK TABLE employees TO SCN 123456;

-- lo SCN attuale, da annotare prima di una modifica rischiosa
SELECT current_scn FROM v$database;
```
