## Che cos'è?

Un Pluggable Database: uno dei "mini-database" dentro un CDB.

## A cosa serve?

Ospita dati, utenti e oggetti applicativi. Come una chiavetta USB, si può staccare da un CDB e riattaccare a un altro.

## Codice

```sql
SHOW PDBS
ALTER SESSION SET CONTAINER = pdb1;       -- lavorare dentro il PDB
ALTER SESSION SET CONTAINER = CDB$ROOT;   -- tornare alla root

-- staccarlo dal CDB...
ALTER PLUGGABLE DATABASE pdb1 CLOSE IMMEDIATE;
ALTER PLUGGABLE DATABASE pdb1 UNPLUG INTO '/u01/app/oracle/pdb1.xml';
DROP PLUGGABLE DATABASE pdb1 KEEP DATAFILES;

-- ...e riattaccarlo a un CDB che vede gli stessi data file
CREATE PLUGGABLE DATABASE pdb1 USING '/u01/app/oracle/pdb1.xml' NOCOPY TEMPFILE REUSE;
ALTER PLUGGABLE DATABASE pdb1 OPEN;
```
