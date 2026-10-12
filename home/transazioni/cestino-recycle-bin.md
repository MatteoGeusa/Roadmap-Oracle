## Che cos'è?

Il cestino (recycle bin), in cui finisce una tabella eliminata con `DROP`. Si consulta con `user_recyclebin`.

## A cosa serve?

Permette di recuperare la tabella con `FLASHBACK TABLE … TO BEFORE DROP`. `DROP TABLE … PURGE` elimina senza passare dal cestino.
