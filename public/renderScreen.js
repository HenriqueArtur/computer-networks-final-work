export default function renderScreen(game, requestAnimationFrame, currentPlayerId, enemyHand) {
    const currentPlayer = game.state.players[currentPlayerId]
    if(currentPlayer) {
        const playerHandDiv = document.getElementById('my-hand')
        let playerCards = ''
        
        currentPlayer.hand.forEach( card => {
            playerCards += `
            <div class="my-card front">
                <div class="symbol">
                    <i class="material-icons small">${card.symbol}</i>
                </div>
                <p class="number">
                    ${card.value}
                </p>
            </div>
            `
        })

        playerHandDiv.innerHTML = playerCards
    }

    const oponentHandDiv = document.getElementById('oponent-hand')
    let oponentCards = ''
    for(let i = enemyHand; i >= 1; i--) {
        oponentCards += `
            <div class="my-card verse">
                <div class="back">
                    <i class="material-icons large">dashboard</i>
                </div>
            </div>
        `
    }
    oponentHandDiv.innerHTML = oponentCards
}