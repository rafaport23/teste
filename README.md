# Star Catcher Game

Um pequeno jogo em canvas onde o jogador coleta estrelas.

## Executar

```bash
npm install
npm start
```

O comando acima serve a pasta atual e abre o jogo no navegador padrão.

## Testes

```bash
npm test
```

Os testes usam Jest e garantem que o personagem não ultrapasse as bordas do canvas.

## Gravando GIF

Para gravar uma partida é possível usar `canvas.captureStream()` e a API de MediaRecorder:

```javascript
const stream = canvas.captureStream();
const recorder = new MediaRecorder(stream);
```

Salve o resultado para criar um GIF animado.
