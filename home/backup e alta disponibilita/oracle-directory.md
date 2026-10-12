## Che cos'è?

Un oggetto `DIRECTORY`: un alias logico, salvato nel database, che punta a una cartella del sistema operativo **del server**. Appartiene sempre a `SYS`.

## A cosa serve?

Leggere e scrivere file partendo dal database senza scrivere percorsi nel codice: Data Pump, external table, `UTL_FILE`, `BFILE`. Alla creazione Oracle non controlla che la cartella esista.

## Codice

```bash
# sul server, come utente oracle: Oracle non controlla che la cartella esista
mkdir -p /u01/app/oracle/export
```

```sql
-- creazione (serve CREATE ANY DIRECTORY)
CREATE OR REPLACE DIRECTORY dp_dir AS '/u01/app/oracle/export';

-- privilegi di oggetto sulla directory
GRANT READ, WRITE ON DIRECTORY dp_dir TO nome_utente;
REVOKE WRITE ON DIRECTORY dp_dir FROM nome_utente;

-- dove puntano e chi le può usare
SELECT directory_name, directory_path FROM dba_directories;
SELECT grantee, privilege FROM dba_tab_privs WHERE table_name = 'DP_DIR';

-- eliminazione (la cartella sul disco resta)
DROP DIRECTORY dp_dir;
```
