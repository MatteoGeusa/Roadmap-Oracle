## Che cos'è?

Il modo di far partire il listener all'accensione della macchina, perché da solo non parte.

## A cosa serve?

Si usa `dbstart $ORACLE_HOME`, richiamato da un servizio systemd. Con Oracle Restart o Grid Infrastructure il listener è invece una risorsa del clusterware (`srvctl start listener`).

## Codice

```text
# /etc/oratab: Y = da avviare con dbstart
ORATEST:/u01/app/oracle/product/19.0.0/dbhome1:Y
```

```ini
# /etc/systemd/system/oracle-db.service
[Unit]
Description=Oracle Database e listener
After=network.target

[Service]
Type=oneshot
RemainAfterExit=yes
User=oracle
Group=oinstall
# systemd ignora /etc/security/limits.conf: i limiti vanno ripetuti qui
LimitNOFILE=65536
LimitMEMLOCK=infinity
ExecStart=/u01/app/oracle/product/19.0.0/dbhome1/bin/dbstart /u01/app/oracle/product/19.0.0/dbhome1
ExecStop=/u01/app/oracle/product/19.0.0/dbhome1/bin/dbshut /u01/app/oracle/product/19.0.0/dbhome1
TimeoutStopSec=300

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable oracle-db

# con Oracle Restart o Grid Infrastructure, invece, come utente grid
srvctl start listener
```
