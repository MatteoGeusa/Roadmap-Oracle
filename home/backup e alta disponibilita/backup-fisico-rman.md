## Che cos'è?

RMAN (Recovery Manager), il tool nativo di Oracle per backup e restore a livello di blocco: fare il restore significa tirare su un database.

## A cosa serve?

Fare backup e restore, anche a caldo (solo con ARCHIVELOG), e verificare la presenza di corruzioni nel database o nei singoli blocchi.

## Codice

```bash
rman target /
```

```text
# backup completo (in NOARCHIVELOG il database deve essere in MOUNT)
BACKUP DATABASE;
LIST BACKUP SUMMARY;

# restore e recovery (database in ARCHIVELOG)
SHUTDOWN IMMEDIATE;
STARTUP MOUNT;
RESTORE DATABASE;
RECOVER DATABASE;
ALTER DATABASE OPEN;
```
