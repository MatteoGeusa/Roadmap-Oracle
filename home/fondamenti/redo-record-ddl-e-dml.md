## Che cos'è?

La voce che descrive una singola modifica: viene inserita nel redo log buffer in RAM e poi scritta negli online redo log su disco.

## A cosa serve?

Permette di riapplicare le modifiche non ancora scritte sui data file. Scrivere sui redo log è velocissimo perché si scrive solo la singola modifica da applicare.
