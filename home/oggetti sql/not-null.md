## Che cos'è?

Il vincolo di obbligatorietà di una colonna. Internamente è un vincolo CHECK e si definisce solo inline.

## A cosa serve?

Impedire valori mancanti in una colonna.

## Codice

```sql
-- in creazione si scrive solo inline
CREATE TABLE clienti (
  id_cliente NUMBER       CONSTRAINT clienti_pk PRIMARY KEY,
  cognome    VARCHAR2(50) CONSTRAINT clienti_cognome_nn NOT NULL
);

-- toglierlo e rimetterlo su una tabella esistente
ALTER TABLE clienti MODIFY (cognome NULL);
ALTER TABLE clienti MODIFY (cognome CONSTRAINT clienti_cognome_nn NOT NULL);
```
