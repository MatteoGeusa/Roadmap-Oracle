## Che cos'è?

Un'opzione del tablespace di undo: `ALTER TABLESPACE … RETENTION GUARANTEE`.

## A cosa serve?

Rende la retention "dura": l'undo non viene sovrascritto entro la finestra, a costo di far fallire nuove scritture se lo spazio manca.
