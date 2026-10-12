## Che cos'è?

Il processo in background Listener Registration: parte con l'istanza, già in NOMOUNT. Fino a 11g questo compito lo svolgeva PMON.

## A cosa serve?

Fa la registrazione dinamica: legge `local_listener` (e `remote_listener`), si collega al listener come un client e gli annuncia istanza, servizi, stato e carico, aggiornandolo a ogni cambiamento.
