import {deck} from './deck.js'

export default function createGame() {
    const state = {
        players: {},
        table: 0,
        lastCard: [],
        gameDeck: [],
    }

    const observers = []

    function start() {
        state.gameDeck = shuffle(deck)
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

        notifyAll({
            type: 'add-player',
            playerId: playerId,
        })

        for(let i = 1; i <= 5; i++) {
            drawCard(playerId)
        }
    }

    function removePlayer(commnad) {
        const playerId = commnad.playerId

        delete state.players[playerId]

        notifyAll({
            type: 'remove-player',
            playerId: playerId
        })
    }
    
    function playCard(playerId) {}

    function drawCard(playerId) {
        let playerHand = state.players[playerId].hand
        let card = state.gameDeck.shift()

        playerHand.push(card)

        state.players[playerId] = {
            hand: playerHand
        }

        notifyAll({
            type: 'draw-card',
            playerId: playerId,
            hand: playerHand,
            handSize: playerHand.length,
        })
    }
    
    function tableSum(command) {}

    function resetGame(command) {}

    function finishGame(command) {}

    return {
        subscribe,
        setState,
        state,
        addPlayer,
        removePlayer,
        start,
        drawCard,
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