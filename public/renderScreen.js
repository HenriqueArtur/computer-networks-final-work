export default function renderScreen(game, requestAnimationFrame, currentPlayerId) {
    const currentPlayer = game.state.players[currentPlayerId]

    if(currentPlayer) {
        const playerHandDiv = document.getElementById('my-hand')
        let playerCards = ''
        
        currentPlayer.hand.forEach( card => {
            console.log(card)
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

    requestAnimationFrame(() => {
        renderScreen(game, requestAnimationFrame, currentPlayerId)
    })
}