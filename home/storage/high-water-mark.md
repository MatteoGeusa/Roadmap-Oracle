## Che cos'è?

Un puntatore all'ultimo blocco del segmento che contiene record.

## A cosa serve?

Dice al database l'ultimo blocco oltre il quale non ci sono dati da cercare: un full table scan legge fino all'high water mark. `DELETE` non lo abbassa, `TRUNCATE` sì.

## Codice

```sql
-- blocchi sotto l'high water mark, secondo le statistiche
EXEC DBMS_STATS.GATHER_TABLE_STATS(USER, 'EMP');
SELECT blocks FROM user_tables WHERE table_name = 'EMP';

-- svuotare la tabella riportando giù l'high water mark
TRUNCATE TABLE emp;

-- oppure compattarla tenendo le righe (tablespace con gestione automatica dello spazio)
ALTER TABLE emp ENABLE ROW MOVEMENT;
ALTER TABLE emp SHRINK SPACE;
```
