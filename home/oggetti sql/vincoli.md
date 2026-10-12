## Che cos'è?

Una regola (constraint) che i dati devono verificare per poter stare in tabella. Sono vincoli anche il tipo di dato di una colonna e la sua obbligatorietà.

## A cosa serve?

Garantire l'integrità dei dati. Tutti i vincoli possono essere disabilitati: alla riabilitazione Oracle ricontrolla i dati.

## Codice

```sql
CREATE TABLE reparti (
  id_reparto  NUMBER       CONSTRAINT reparti_pk PRIMARY KEY,               -- inline
  nome        VARCHAR2(50) CONSTRAINT reparti_nome_nn NOT NULL
);

CREATE TABLE dipendenti (
  id_dip       NUMBER,
  cod_fiscale  VARCHAR2(16),
  stipendio    NUMBER,
  id_reparto   NUMBER,
  CONSTRAINT dipendenti_pk     PRIMARY KEY (id_dip),                        -- out-of-line
  CONSTRAINT dipendenti_cf_uk  UNIQUE (cod_fiscale),
  CONSTRAINT dipendenti_sal_ck CHECK (stipendio > 0),
  CONSTRAINT dipendenti_rep_fk FOREIGN KEY (id_reparto)
             REFERENCES reparti (id_reparto) ON DELETE SET NULL
);

ALTER TABLE dipendenti ADD CONSTRAINT dipendenti_sal_max_ck CHECK (stipendio < 100000);
ALTER TABLE dipendenti DROP CONSTRAINT dipendenti_sal_max_ck;
ALTER TABLE dipendenti DISABLE CONSTRAINT dipendenti_rep_fk;
ALTER TABLE dipendenti ENABLE CONSTRAINT dipendenti_rep_fk;
```
