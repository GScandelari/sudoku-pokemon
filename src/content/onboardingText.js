// Diálogos da introdução guiada, estilo caixa de texto retrô de Pokémon.

export const ONBOARDING_STEPS = [
  {
    pose: 'idle',
    text: 'Olá, Treinador! Seja bem-vindo ao mundo do Pokémon Pixel Sudoku!',
  },
  {
    pose: 'apontando',
    text: 'Cada número de 1 a 9 vira um Pokémon: as evoluções de Bulbasauro, Charmander e Squirtle. Complete o tabuleiro sem repetir nenhum na mesma linha, coluna ou quadrante!',
  },
  {
    pose: 'apontando',
    text: 'Toque numa célula vazia e escolha o Pokémon certo no seletor. Errou? É só apagar e tentar de novo — mas cuidado, células já certas ficam travadas!',
  },
  {
    pose: 'idle',
    text: 'Você tem 3 vidas. A cada erro, perde uma — e no terceiro, é Game Over! Fique de olho nas Poké Bolas no topo da tela.',
  },
  {
    pose: 'idle',
    text: 'Acertos seguidos aumentam seu combo, multiplicando sua pontuação em até 5x! Um errinho, porém, zera tudo de novo.',
  },
  {
    pose: 'apontando',
    text: 'O cronômetro corre o tempo todo — quanto mais rápido você vencer, maior o bônus de pontos no final!',
  },
  {
    pose: 'idle',
    text: 'Precisa de uma pausa? Use o botão "Pausar". Também dá pra ligar/desligar o som e trocar entre os temas claro e escuro quando quiser.',
  },
  {
    pose: 'comemorando',
    text: 'Prontinho! Agora é com você. Boa sorte, Treinador — e que a lógica esteja ao seu lado!',
  },
]
