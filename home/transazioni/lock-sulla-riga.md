## Che cos'è?

Il blocco che Oracle applica sulla riga selezionata per la modifica. In sola lettura non viene bloccato nulla.

## A cosa serve?

Garantisce che nessun altro possa modificare la stessa riga. I lock vengono rilasciati al COMMIT.

## Codice

```sql
-- blocca le righe lette, come farebbe un UPDATE
SELECT * FROM emp WHERE empno = 7369 FOR UPDATE;
SELECT * FROM emp WHERE empno = 7369 FOR UPDATE NOWAIT;   -- ORA-00054 se è già bloccata

-- chi sta aspettando chi
SELECT sid, username, blocking_session, event
FROM v$session
WHERE blocking_session IS NOT NULL;
```
