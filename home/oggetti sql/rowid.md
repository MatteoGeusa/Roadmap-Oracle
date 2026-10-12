## Che cos'è?

Il codice che indica la collocazione fisica di un record: file, blocco, riga.

## A cosa serve?

Dalla foglia dell'indice si raggiunge direttamente il record.

## Codice

```sql
-- file, blocco e riga di ogni record
SELECT ROWID,
       DBMS_ROWID.ROWID_RELATIVE_FNO(ROWID) AS file#,
       DBMS_ROWID.ROWID_BLOCK_NUMBER(ROWID) AS blocco,
       DBMS_ROWID.ROWID_ROW_NUMBER(ROWID)   AS riga
FROM emp
WHERE ROWNUM <= 5;
```
