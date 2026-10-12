## Che cos'è?

Il comportamento di Oracle alla creazione di un oggetto: non scrive ancora nulla nel datafile, prende solo nota di dove si troverà il segment.

## A cosa serve?

Lo spazio viene allocato solo quando arrivano i dati.

## Codice

```sql
SHOW PARAMETER deferred_segment_creation    -- TRUE: il segment nasce con il primo INSERT

-- con un utente diverso da SYS
CREATE TABLE prova (id NUMBER);
SELECT segment_name FROM user_segments WHERE segment_name = 'PROVA';           -- nessuna riga

INSERT INTO prova VALUES (1);
SELECT segment_name, bytes FROM user_segments WHERE segment_name = 'PROVA';    -- ora c'è
```
