## Che cos'è?

Il ripristino dell'intero database esattamente com'era in un momento preciso del passato (PITR).

## A cosa serve?

Tornare a un istante qualsiasi, non solo all'ultimo backup completo, riapplicando in sequenza gli archived redo log conservati da ARCn.

## Codice

```text
# da rman target /: il database com'era alle 9:30 del 12 ottobre 2026
SHUTDOWN IMMEDIATE;
STARTUP MOUNT;
RUN {
  SET UNTIL TIME "TO_DATE('2026-10-12 09:30:00', 'YYYY-MM-DD HH24:MI:SS')";
  RESTORE DATABASE;
  RECOVER DATABASE;
}
ALTER DATABASE OPEN RESETLOGS;
```
