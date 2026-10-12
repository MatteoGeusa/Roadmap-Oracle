## Che cos'è?

Un backup fatto con il database in funzione, con RMAN.

## A cosa serve?

Salvare il database senza fermarlo. È possibile solo in modalità ARCHIVELOG.

## Codice

```sql
-- prerequisito: "Database log mode: Archive Mode"
ARCHIVE LOG LIST
```

```bash
rman target /
```

```text
BACKUP DATABASE PLUS ARCHIVELOG;
LIST BACKUP SUMMARY;
```
