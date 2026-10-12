## Che cos'è?

Un buffer separato: la copia del blocco corrente (anche dirty) a cui Oracle applica i record di undo necessari, riportandola indietro fino all'SCN richiesto.

## A cosa serve?

Restituisce alla sessione il blocco come appariva a un certo istante, lasciando intatto il buffer corrente per chi vuole l'ultima versione. È temporaneo: dopo l'uso torna candidato all'eviction.
