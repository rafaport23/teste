import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const questions = [
  {
    question: 'Qual drama coreano se passa em um reino assolado por zumbis?',
    options: ['Kingdom', 'Crash Landing on You', 'Itaewon Class'],
    answer: 'Kingdom'
  },
  {
    question: 'Em "Crash Landing on You", Yoon Se-ri faz fortuna no ramo de...',
    options: ['Moda', 'Beleza', 'Alimentação'],
    answer: 'Moda'
  },
  {
    question: 'Qual destas s\u00e9ries tem como cen\u00e1rio principal uma escola?',
    options: ['Goblin', 'Love Alarm', 'Descendants of the Sun'],
    answer: 'Love Alarm'
  }
];

let acertos = 0;

console.log('Bem-vinda ao quiz de s\u00e9ries coreanas, M\u00e1rcia Vichi!');

for (const [index, q] of questions.entries()) {
  console.log(`\nPergunta ${index + 1}: ${q.question}`);
  q.options.forEach((opt, i) => console.log(`  ${i + 1}) ${opt}`));
  const resposta = await rl.question('Sua resposta (1-3): ');
  const escolha = q.options[Number(resposta.trim()) - 1];
  if (escolha && escolha.toLowerCase() === q.answer.toLowerCase()) {
    console.log('Acertou!');
    acertos++;
  } else {
    console.log('Errou!');
  }
}

await rl.close();

if (acertos === questions.length) {
  console.log('\nParab\u00e9ns, M\u00e1rcia Vichi! Voc\u00ea provou que entende de s\u00e9ries coreanas.');
} else {
  console.log('\nM\u00e1rcia Vichi, voc\u00ea ter\u00e1 que aguentar o churrasco do genro casado com sua filha Tet\u00ea!');
}
console.log('Com carinho da Lilia e da Mab\u00ea.');
