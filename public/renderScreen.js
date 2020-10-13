export default function renderScreen(game, currentPlayerId) {
    const table = document.getElementById('sum')
    const lastCardDiv = document.getElementById('last-card')
    const deckDiv = document.getElementById('deck')
    const oponentHandDiv = document.getElementById('oponent-hand')
    
    const players = Object.entries(game.state.players)
    const lastCard = game.state.lastCard
    const deck = game.state.gameDeck

    players.forEach((player) => {
        if(currentPlayerId == player[0]) {
            const playerHandDiv = document.getElementById('my-hand')
            let playerCards = ''
            const currentPlayer = game.state.players[player[0]]
            
            currentPlayer.hand.forEach( card => {
                playerCards += `
                <div class="my-card front">
                    <div class="symbol">
                        <i class="material-icons small">${card['symbol']}</i>
                    </div>
                    <p class="number">${card['value']}</p>
                </div>
                `
            })
    
            playerHandDiv.innerHTML = playerCards
        } else {
            let oponentCards = ''
            const oponent = Object.entries(player[1])
            for(let i = oponent[0][1].length; i >= 1; i--) {
                oponentCards += `
                    <div class="my-card verse">
                        <div class="back"><i class="material-icons large">dashboard</i></div>
                    </div>
                `
            }
            oponentHandDiv.innerHTML = oponentCards
        }
    })

    table.innerHTML = game.state.table
    if(Object.keys(lastCard).length !== 0) {
        lastCardDiv.innerHTML = `
            <div class="my-card front">
                <div class="symbol">
                    <i class="material-icons small">${lastCard['symbol']}</i>
                </div>
                <p class="number">${lastCard['value']}</p>
            </div>
            `
    }

    if(deck.length > 0) {
        deckDiv.innerHTML = `
                <div class="my-card verse">
                    <div class="back"><i class="material-icons large">dashboard</i></div>
                </div>
            `
    }
}