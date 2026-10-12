## Che cos'è?

Un tipo di colonna che punta a file esterni.

## A cosa serve?

Riferire file del server, attraverso una Oracle Directory, dall'interno di una tabella.

## Codice

```sql
-- come DBA: la directory e il permesso di leggerla
CREATE OR REPLACE DIRECTORY doc_dir AS '/u01/app/oracle/documenti';
GRANT READ ON DIRECTORY doc_dir TO nome_utente;

CREATE TABLE documenti (
  id_documento NUMBER PRIMARY KEY,
  documento    BFILE
);

-- il nome della directory va scritto in maiuscolo
INSERT INTO documenti VALUES (1, BFILENAME('DOC_DIR', 'contratto.pdf'));

-- 1 se il file puntato esiste sul server
SELECT id_documento, DBMS_LOB.FILEEXISTS(documento) AS esiste FROM documenti;
```
