## Che cos'è?

La sequenza di comandi: `CREATE ROLE`, poi `GRANT` dei privilegi al ruolo, poi `GRANT` del ruolo all'utente.

## A cosa serve?

Creare il pacchetto, riempirlo e consegnarlo.

## Codice

```sql
CREATE ROLE nome_ruolo;                       -- creo il pacchetto
GRANT SELECT, UPDATE ON emp TO nome_ruolo;    -- lo riempio
GRANT nome_ruolo TO nome_utente;              -- lo consegno all'utente

-- verifica
SELECT granted_role, default_role
FROM dba_role_privs
WHERE grantee = 'NOME_UTENTE';
```
