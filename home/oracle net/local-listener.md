## Che cos'è?

Un parametro dell'istanza.

## A cosa serve?

Dice a LREG dove si trova il listener; il database non legge il `listener.ora`. Se è vuoto, LREG usa `(HOST=<hostname>)(PORT=1521)`, che deve essere un indirizzo su cui il listener ascolta davvero.
