## Che cos'è?

Un gruppo di blocchi consecutivi del datafile, riservato in un colpo solo a una tabella (o a un altro segment).

## A cosa serve?

Evita di prenotare un blocco alla volta: è il compromesso tra avere i dati contigui su disco (letture più efficienti) e non dover allocare spazio troppo spesso (scritture più veloci). Quando l'ultimo blocco è pieno, Oracle prenota un nuovo extent.
