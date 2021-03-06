import {deck} from './deck.js'

export default function createGame() {
    const state = {
        players: {},
        currentPlayer: [],
        winnerPlayer: '',
        table: 0,
        lastCard: {},
        gameDeck: [],
    }

    const observers = []

    function start() {
        state.gameDeck = shuffle(deck)
        state.lastCard = state.gameDeck.shift()
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function addPlayer(command) {
        const playerId = command.playerId
        
        state.players[playerId] = {
            hand: []
        }
        const qntPlayers = Object.keys(state.players).length
        if(qntPlayers == 1) {
            state.currentPlayer = playerId
        }

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            currentPlayer: state.currentPlayer
        })

        for(let i = 1; i <= 5; i++) {
            openHand(command)
        }
    }

    function removePlayer(commnad) {
        const playerId = commnad.playerId

        delete state.players[playerId]
        resetGame()

        notifyAll({
            type: 'remove-player',
            playerId: playerId
        })
    }
    
    function playCard(command) {
        const player = state.players[command.playerId]
        const cardSymbol = command.cardSymbol
        const cardNumber = command.cardNumber
        var hand = player.hand

        const lastCard = state.lastCard
        
        hand.forEach((card, index) => {
            if(
                (card.value == cardNumber && card.symbol == cardSymbol)
                && (card.value == lastCard['value'] || card.symbol == lastCard['symbol'])
                ) {
                let card = hand.splice(index, 1)
                const result = state.table + card[0]['value']
                if(result > 10 || result < -5 || hand.length-1 <= 0) {
                    finishGame(command.playerId)
                }
                state.lastCard = card[0]
                state.table = result
                notifyAll(command)
                return
            }
        })
        const players = Object.entries(state.players)
        players.forEach((player) => {
            if(player[0] != command.playerId) {
                state.currentPlayer = player[0]
            }
        })
    }

    function drawCard(command) {
        const playerId = command.playerId
        let playerHand = state.players[playerId].hand
        let card = state.gameDeck.shift()

        playerHand.push(card)
        
        state.players[playerId] = {
            hand: playerHand
        }

        notifyAll({
            type: 'draw-card',
            playerId: playerId,
        })
    }
    
    function resetGame() {
        state.table = 0
        state.lastCard = {}
        state.gameDeck = []

        start()

        const players = Object.keys(state.players)
        state.currentPlayer = players[0]
    }

    function finishGame(playerId) {
        state.winnerPlayer = playerId

        const command = {
            type: 'finish-game',
            winner: playerId
        }

        notifyAll(command)
    }

    function openHand(command) {
        const playerId = command.playerId
        let playerHand = state.players[playerId].hand
        let card = state.gameDeck.shift()
    
        playerHand.push(card)
        
        state.players[playerId] = {
            hand: playerHand
        }
    }

    return {
        subscribe,
        setState,
        state,
        addPlayer,
        removePlayer,
        start,
        drawCard,
        playCard,
    }
}

function shuffle(array) {
    var ctr = array.length, temp, index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
    }
    return array;
}