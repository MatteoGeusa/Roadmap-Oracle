## Che cos'è?

Data Definition Language: `CREATE TABLE`, `ALTER TABLE`, `DROP`, `TRUNCATE`. Ha il **commit implicito**.

## A cosa serve?

Definisce o modifica la **struttura** degli oggetti. Non serve un COMMIT perché non serve una vecchia versione dell'oggetto: appena lanciato, il comando è già confermato.

## Codice

```sql
CREATE TABLE prova (id NUMBER);
ALTER TABLE prova ADD (descrizione VARCHAR2(100));
TRUNCATE TABLE prova;
DROP TABLE prova;

-- il commit implicito conferma anche le DML rimaste in sospeso
UPDATE emp SET sal = sal + 100;
CREATE TABLE prova2 (id NUMBER);    -- da qui l'UPDATE è confermato
ROLLBACK;                           -- non annulla più nulla
```
