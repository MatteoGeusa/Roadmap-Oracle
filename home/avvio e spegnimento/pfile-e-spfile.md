## Che cos'è?

I due formati del parameter file: il **PFILE** è un semplice file di testo che Oracle non sa scrivere da solo, lo **SPFILE** è il file su cui scrive `ALTER SYSTEM`.

## A cosa serve?

Con lo SPFILE le modifiche si rendono persistenti con `ALTER SYSTEM SET … SCOPE=…`. Con un PFILE l'unico modo è editarlo a mano.

## Codice

```sql
-- da SPFILE a PFILE (per leggerlo o modificarlo a mano) e ritorno
CREATE PFILE FROM SPFILE;
CREATE SPFILE FROM PFILE;

-- con un percorso esplicito
CREATE PFILE = '/tmp/initORATEST.ora' FROM SPFILE;
```
