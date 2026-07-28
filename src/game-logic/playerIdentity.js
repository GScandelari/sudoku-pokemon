// Nome de exibição do jogador no placar público: nome completo da conta
// Google para quem loga, ou "Convidado #NNNN" derivado do uid para anônimos
// (estável entre sessões no mesmo navegador, já que o Firebase Anonymous
// Auth mantém o mesmo uid até o jogador sair ou limpar os dados do site).

function anonymousNumber(uid) {
  let hash = 0
  for (let i = 0; i < uid.length; i++) {
    hash = (hash * 31 + uid.charCodeAt(i)) >>> 0
  }
  return String(hash % 10000).padStart(4, '0')
}

export function getDisplayName(user) {
  if (!user) return ''
  if (user.isAnonymous) return `Convidado #${anonymousNumber(user.uid)}`
  return user.displayName || 'Jogador'
}
