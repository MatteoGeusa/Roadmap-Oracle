## Che cos'è?

Due o più tabelle salvate negli stessi blocchi (o gruppo di blocchi) in base alla chiave di join: l'unica eccezione alla regola "un blocco, una tabella".

## A cosa serve?

Velocizzare la stessa join ripetuta sulla stessa chiave (es. REPARTI e DIPENDENTI): Oracle trova le righe correlate già vicine, senza leggere blocchi sparsi.
