## Che cos'è?

Un oggetto `DIRECTORY`: un alias logico, salvato nel database, che punta a una cartella del sistema operativo **del server**. Appartiene sempre a `SYS`.

## A cosa serve?

Leggere e scrivere file partendo dal database senza scrivere percorsi nel codice: Data Pump, external table, `UTL_FILE`, `BFILE`. Alla creazione Oracle non controlla che la cartella esista.
