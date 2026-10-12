## Che cos'è?

Il file su disco in cui Oracle archivia i dati: per il sistema operativo è un normale file, scritto sul file system che corrisponde al path indicato. È il punto di contatto tra piano logico e piano fisico.

## A cosa serve?

Contiene i dati del database. Oracle lo suddivide in blocchi di dimensione fissa (una matrice di blocchi), e ogni tablespace è composto da uno o più datafile. Appena creato occupa già tutta la sua dimensione sul file system, anche se per Oracle è ancora vuoto.
