## Che cos'è?

La registrazione scritta nel `listener.ora`, nella sezione `SID_LIST_<listener>`.

## A cosa serve?

Il servizio resta noto anche a database spento (stato `UNKNOWN`): una connessione dà ORA-01034, ma un `SYSDBA` remoto può fare `STARTUP`. Usi tipici: avvio remoto, RMAN duplicate, Enterprise Manager, Data Guard.
