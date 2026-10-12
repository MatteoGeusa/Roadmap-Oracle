## Che cos'è?

Il processo in background Database Writer.

## A cosa serve?

Svuota e scrive i dirty buffer dalla SGA ai data file. È asincrono: raggruppa i blocchi e scrive in batch, senza essere legato al momento del COMMIT.
