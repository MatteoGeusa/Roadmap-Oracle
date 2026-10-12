## Che cos'è?

Il recovery che SMON esegue all'OPEN dopo un crash o uno `SHUTDOWN ABORT`. Nell'alert log compare come `Beginning crash recovery …`.

## A cosa serve?

Riporta il database in uno stato stabile e consistente: prima il roll forward con il redo, poi il roll backward con l'undo.
