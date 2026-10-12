## Che cos'è?

Il vincolo per cui una colonna della tabella **figlia** fa riferimento alla PRIMARY KEY (o UNIQUE) della tabella **madre**.

## A cosa serve?

Garantire l'integrità referenziale: la figlia può contenere solo valori presenti nella madre (altrimenti ORA-02291), e non si cancella una madre con figli (ORA-02292). Sulla colonna conviene creare un indice.
