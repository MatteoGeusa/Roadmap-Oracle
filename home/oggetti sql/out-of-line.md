## Che cos'è?

Un vincolo scritto in fondo alla definizione della tabella.

## A cosa serve?

È obbligatorio per i vincoli su più colonne.

## Codice

```sql
CREATE TABLE dipendenti (
  id_dip      NUMBER,
  cod_fiscale VARCHAR2(16),
  stipendio   NUMBER,
  id_reparto  NUMBER,
  CONSTRAINT dipendenti_pk     PRIMARY KEY (id_dip),
  CONSTRAINT dipendenti_cf_uk  UNIQUE (cod_fiscale),
  CONSTRAINT dipendenti_sal_ck CHECK (stipendio > 0),
  CONSTRAINT dipendenti_rep_fk FOREIGN KEY (id_reparto) REFERENCES reparti (id_reparto)
);

-- un vincolo su più colonne si scrive solo così
ALTER TABLE presenze ADD CONSTRAINT presenze_pk PRIMARY KEY (id_dip, giorno);
```
