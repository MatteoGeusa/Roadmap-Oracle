## Che cos'è?

Un PDB "template" vuoto.

## A cosa serve?

Creare rapidamente nuovi PDB clonandolo.

## Codice

```sql
-- dal CDB$ROOT: un nuovo PDB clonato da PDB$SEED
CREATE PLUGGABLE DATABASE pdb_nuovo
  ADMIN USER pdb_admin IDENTIFIED BY password
  FILE_NAME_CONVERT = ('/u01/app/oracle/oradata/ORACDB/pdbseed/',
                       '/u01/app/oracle/oradata/ORACDB/pdb_nuovo/');
-- con db_create_file_dest impostato (file gestiti da Oracle) FILE_NAME_CONVERT non serve

ALTER PLUGGABLE DATABASE pdb_nuovo OPEN;
ALTER PLUGGABLE DATABASE pdb_nuovo SAVE STATE;   -- si riapre da solo al riavvio del CDB
```
