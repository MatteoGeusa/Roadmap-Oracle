## Che cos'è?

Il nome con cui i client si collegano a un database (`SERVICE_NAME`) e che viene annunciato al listener. Il nome dell'istanza (SID) non diventa un servizio.

## A cosa serve?

Indirizzare le connessioni: si usa sempre `SERVICE_NAME`, mai il SID, ed è obbligatorio per le PDB, che hanno un servizio ciascuna.
