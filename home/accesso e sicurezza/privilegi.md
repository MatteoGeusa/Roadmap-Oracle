## Che cos'è?

Le autorizzazioni concesse con `GRANT` e tolte con `REVOKE`. Sono di due tipi: di sistema e di oggetto.

## A cosa serve?

Ogni utente vede e tocca solo le cose del proprio schema: per fargli usare oggetti di altri, o compiere azioni generali, bisogna dargli il permesso.

## Codice

```sql
-- di sistema: senza ON
GRANT CREATE TABLE TO nome_utente;

-- di oggetto: con ON
GRANT SELECT ON scott.emp TO nome_utente;

-- privilegi attivi nella sessione corrente
SELECT * FROM session_privs;
```
