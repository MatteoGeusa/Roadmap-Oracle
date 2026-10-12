## Che cos'è?

Il modo di far partire il listener all'accensione della macchina, perché da solo non parte.

## A cosa serve?

Si usa `dbstart $ORACLE_HOME`, richiamato da un servizio systemd. Con Oracle Restart o Grid Infrastructure il listener è invece una risorsa del clusterware (`srvctl start listener`).
