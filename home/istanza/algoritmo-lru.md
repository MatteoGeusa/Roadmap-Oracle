## Che cos'è?

L'algoritmo LRU (Least/Last Recently Used) con cui viene gestita la buffer cache.

## A cosa serve?

Tiene "in cima" i blocchi usati di recente e manda "in fondo" quelli non richiesti da tempo, che sono i primi a essere liberati quando serve spazio. I dirty buffer vengono saltati finché DBWn non li ha scritti.
