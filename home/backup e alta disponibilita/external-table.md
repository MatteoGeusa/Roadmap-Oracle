## Che cos'è?

Una tabella i cui dati stanno in un file di testo.

## A cosa serve?

Leggere dati da file attraverso una Oracle Directory.

## Codice

```sql
-- come DBA: la cartella che contiene clienti.csv (prima riga di intestazione, campi separati da ;)
CREATE OR REPLACE DIRECTORY dati_dir AS '/u01/app/oracle/dati';
GRANT READ, WRITE ON DIRECTORY dati_dir TO nome_utente;   -- WRITE per i file di log e degli scarti

-- come nome_utente
CREATE TABLE clienti_ext (
  id_cliente NUMBER,
  cognome    VARCHAR2(50),
  citta      VARCHAR2(50)
)
ORGANIZATION EXTERNAL (
  TYPE ORACLE_LOADER
  DEFAULT DIRECTORY dati_dir
  ACCESS PARAMETERS (
    RECORDS DELIMITED BY NEWLINE
    SKIP 1
    FIELDS TERMINATED BY ';'
    MISSING FIELD VALUES ARE NULL
  )
  LOCATION ('clienti.csv')
)
REJECT LIMIT UNLIMITED;

SELECT * FROM clienti_ext;
```
