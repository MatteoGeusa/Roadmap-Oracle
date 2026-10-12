## Che cos'è?

L'informazione che il control file custodisce: i riferimenti (path) a tutti gli altri file del database, cioè data file e redo log file.

## A cosa serve?

È la catena di avvio: il parameter file indica la strada al control file (parametro `CONTROL_FILES`), e il control file indica la strada a tutto il resto.
