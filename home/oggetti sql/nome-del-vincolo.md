## Che cos'è?

Il nome dato con `CONSTRAINT nome`.

## A cosa serve?

Rendere leggibili gli errori: senza nome Oracle ne genera uno tipo `SYS_C0012345`.

## Codice

```sql
-- con il nome, l'errore dice quale regola è stata violata
ALTER TABLE dipendenti ADD CONSTRAINT dipendenti_sal_ck CHECK (stipendio > 0);

-- dare un nome a un vincolo creato senza
ALTER TABLE dipendenti RENAME CONSTRAINT SYS_C0012345 TO dipendenti_cf_uk;
```
