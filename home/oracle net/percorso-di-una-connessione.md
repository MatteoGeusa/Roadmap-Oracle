## Che cos'è?

La sequenza di passi con cui un client arriva al database.

## A cosa serve?

Il client risolve l'alias (o usa Easy Connect); si collega via TCP al listener (di solito porta 1521); il listener cerca il servizio tra quelli registrati; crea un processo server dedicato o passa la connessione a un dispatcher; da lì client e processo server parlano direttamente.
