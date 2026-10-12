## Che cos'è?

Il vincolo che fissa una regola che i dati di una riga devono verificare in inserimento e aggiornamento.

## A cosa serve?

Validare i valori di una riga. Vale solo sulla riga corrente: niente subquery, niente `SYSDATE` o `USER`, niente confronti con altre righe.

## Codice

```sql
ALTER TABLE dipendenti ADD CONSTRAINT dipendenti_sal_ck CHECK (stipendio > 0);
ALTER TABLE persone ADD CONSTRAINT persone_sesso_ck CHECK (sesso IN ('M', 'F'));

INSERT INTO dipendenti (id_dip, stipendio) VALUES (1, -100);   -- ORA-02290
```
