## Che cos'è?

Il passo del COMMIT in cui LGWR copia i buffer di redo log negli online redo log su disco.

## A cosa serve?

Rende la modifica durevole. È veloce perché scrive solo la singola modifica da applicare; dopo questa scrittura vengono rilasciati i lock.
