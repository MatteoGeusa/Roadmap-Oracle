## Che cos'è?

Un privilegio di sistema.

## A cosa serve?

Creare (e ridefinire con `CREATE OR REPLACE`) le directory. È potente: permette di puntare a qualsiasi cartella leggibile dall'utente `oracle`, quindi va concesso con cautela.

## Codice

```sql
-- di norma lo ha solo il DBA, che poi concede READ/WRITE sulla singola directory
GRANT CREATE ANY DIRECTORY TO nome_utente;

-- cosa permette
CREATE OR REPLACE DIRECTORY dp_dir AS '/u01/app/oracle/export';

-- chi ce l'ha
SELECT grantee FROM dba_sys_privs WHERE privilege = 'CREATE ANY DIRECTORY';
```
