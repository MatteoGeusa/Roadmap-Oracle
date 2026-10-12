## Che cos'è?

Un package per la lettura e scrittura di file da PL/SQL.

## A cosa serve?

Leggere e scrivere file dalla cartella di una Oracle Directory.

## Codice

```sql
SET SERVEROUTPUT ON

-- scrivere un file nella directory DP_DIR (serve WRITE)
DECLARE
  f UTL_FILE.FILE_TYPE;
BEGIN
  f := UTL_FILE.FOPEN('DP_DIR', 'prova.txt', 'w');
  UTL_FILE.PUT_LINE(f, 'Scritto dal database');
  UTL_FILE.FCLOSE(f);
END;
/

-- rileggerlo riga per riga (serve READ)
DECLARE
  f    UTL_FILE.FILE_TYPE;
  riga VARCHAR2(32767);
BEGIN
  f := UTL_FILE.FOPEN('DP_DIR', 'prova.txt', 'r');
  LOOP
    UTL_FILE.GET_LINE(f, riga);    -- a fine file solleva NO_DATA_FOUND
    DBMS_OUTPUT.PUT_LINE(riga);
  END LOOP;
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    UTL_FILE.FCLOSE(f);
END;
/
```
