## Che cos'è?

La proprietà ACID per cui, finché una transazione non termina, le altre sessioni non vedono le sue modifiche intermedie.

## A cosa serve?

Se aggiorno lo stipendio di un dipendente, chi fa una SELECT nel frattempo vede ancora il valore vecchio. Il meccanismo concreto che la realizza è la read consistency.
