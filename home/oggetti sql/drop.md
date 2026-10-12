## Che cos'è?

Un comando DDL, con COMMIT implicito, che elimina la tabella intera: dati e struttura, con indici, vincoli, trigger e grant.

## A cosa serve?

Eliminare l'oggetto. La tabella finisce nel cestino e si recupera con `FLASHBACK TABLE … TO BEFORE DROP`; viste e procedure che la usavano diventano INVALID.
