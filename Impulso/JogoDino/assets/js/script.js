const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

//define a tecla que será usada para o pulo que é a chave 32 (barra de espaço)
//https://keycode.info/ para saber o código de cada tecla do teclado
function handleKeyUp(event) {
  if (event.keyCode === 32) {
    //se não estiver pulando ele pode pular, serve para evitar bugs
    if (!isJumping) {
      jump();
    }
  }
}

//responsável pelo pulo do dino
function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    //Sobe no máximo até 150px, depois disso ele desce
    if (position >= 150) {
      //limpa o upInterval
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          //limpa o intervalo de descida, ou seja, para de descer
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      //esse 20 define o quão rápido ou devagar ele vai descer
      }, 20);
    } 
    //Subindo
    else {
      position += 20;
      dino.style.bottom = position + 'px';
    }
  //esse 20 define o quão rápido ou devagar ele vai subir
  }, 20);
}

//cria o obstáculo(cacto)
function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  //criando número aleatório para aparecer um cacto
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    //cacto saiu completamente da tela
    if (cactusPosition < -60) {
      clearInterval(leftTimer);
      //remove o cacto que saiu da tela
      background.removeChild(cactus);
    } 
    //dando o contato para o game over
    else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftTimer);
      isGameOver = true;
      //acessando a tag body do HTML para encerrar o jogo e mostrar a tela de fim de jogo
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1> <h3 class="game-over"> Pressione F5 para jogar novamente</h3><p class="game-over"><br><br>Desenvolvido por : FX-Connection </p>';
    } 
    //velocidade com a qual ele vai se mover para a esquerda
    else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);
  //cria um cacto de maneiras aleatórias com o número random
  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);