## Che cos'è?

Il comportamento di Oracle quando un'operazione di ordinamento supera lo spazio disponibile in PGA: la fa "sfociare" su file fisici temporanei nel tablespace TEMP.

## A cosa serve?

Permette di completare l'operazione anche se la PGA, che è privata e facilmente satura, non basta. Il prezzo è la lentezza: il disco è molto più lento della RAM.
