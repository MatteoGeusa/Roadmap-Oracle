## Che cos'è?

Uno dei tre tipi di file fisici del database (`.ctl`): contiene metadati di versionamento e i path di tutti gli altri file.

## A cosa serve?

Nella fase MOUNT l'istanza lo legge per sapere dove si trovano data file e redo log file. All'OPEN, Oracle confronta gli SCN registrati nel control file con quelli dei data file per capire se serve un recovery.
