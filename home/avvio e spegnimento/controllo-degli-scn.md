## Che cos'è?

La verifica che Oracle fa durante l'OPEN tra gli SCN registrati nei data file e quelli nel control file.

## A cosa serve?

Se non coincidono, per esempio dopo un crash, scatta automaticamente il recovery gestito da SMON prima che il database possa considerarsi aperto.
