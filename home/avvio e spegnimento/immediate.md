## Che cos'è?

Una modalità di shutdown.

## A cosa serve?

Esegue un checkpoint e butta fuori tutti gli utenti collegati, facendo rollback delle transazioni attive senza aspettarle: le modifiche non salvate vanno perse. Il database passa da OPEN a MOUNT a NOMOUNT, poi l'istanza termina.
