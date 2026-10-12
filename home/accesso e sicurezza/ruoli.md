## Che cos'è?

Un "pacchetto" di privilegi da assegnare agli utenti.

## A cosa serve?

Dare gli stessi permessi a tanti utenti senza ripetere i GRANT: se serve un permesso in più, lo si aggiunge al ruolo e tutti gli utenti che lo hanno lo ricevono automaticamente.

## Codice

```sql
-- un permesso in più al ruolo: lo ricevono tutti gli utenti che lo hanno
GRANT INSERT ON emp TO nome_ruolo;

-- ruoli del database
SELECT role FROM dba_roles;

-- cosa contiene un ruolo
SELECT owner, table_name, privilege FROM dba_tab_privs WHERE grantee = 'NOME_RUOLO';
SELECT privilege FROM dba_sys_privs WHERE grantee = 'NOME_RUOLO';
```
