## Che cos'è?

Due o più tabelle salvate negli stessi blocchi (o gruppo di blocchi) in base alla chiave di join: l'unica eccezione alla regola "un blocco, una tabella".

## A cosa serve?

Velocizzare la stessa join ripetuta sulla stessa chiave (es. REPARTI e DIPENDENTI): Oracle trova le righe correlate già vicine, senza leggere blocchi sparsi.

## Codice

```sql
-- il cluster, con la chiave di join, e il suo indice
CREATE CLUSTER reparti_cl (id_reparto NUMBER);
CREATE INDEX reparti_cl_ix ON CLUSTER reparti_cl;

-- le due tabelle salvate negli stessi blocchi
CREATE TABLE reparti (
  id_reparto NUMBER PRIMARY KEY,
  nome       VARCHAR2(50)
) CLUSTER reparti_cl (id_reparto);

CREATE TABLE dipendenti (
  id_dip     NUMBER PRIMARY KEY,
  cognome    VARCHAR2(50),
  id_reparto NUMBER REFERENCES reparti (id_reparto)
) CLUSTER reparti_cl (id_reparto);
```
