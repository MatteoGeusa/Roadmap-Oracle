## Che cos'è?

Il System Change Number: un numero progressivo univoco assegnato a ogni transazione committata.

## A cosa serve?

Confrontando gli SCN nei vari file, Oracle sa subito se un data file è aggiornato, senza confrontarne l'intero contenuto con i redo log. Lo usano anche il CR clone e il Flashback.

## Codice

```sql
SELECT current_scn FROM v$database;

-- conversione tra SCN e istante (utile per FLASHBACK TABLE ... TO SCN)
SELECT SCN_TO_TIMESTAMP(current_scn) AS istante FROM v$database;
SELECT TIMESTAMP_TO_SCN(SYSTIMESTAMP - INTERVAL '10' MINUTE) AS scn FROM dual;
```
