## Che cos'è?

Un parametro, in secondi (default 900).

## A cosa serve?

Indica per quanto tempo Oracle *cerca* di trattenere l'undo già committato prima di riciclarlo, così una query già aperta può ancora leggere i dati "vecchi". Non è una garanzia se il tablespace è sotto pressione e configurato senza `GUARANTEE`.
