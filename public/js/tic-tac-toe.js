const tic_tac_toe = {
    board: ['','','','','','','','',''],
    symbols: {
        options: ['O','X'],
        turn_index: 0,
        change: function(){
            this.turn_index = ( this.turn_index === 0 ? 1 : 0 );
        }
    },
    container_element: null,
    gameover: false,
    winning_sequences: [
                        [0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]
                    ],

    init: function(container) {
        this.container_element = container;
    },

    make_play: function(position) {
        if (this.gameover) return false;
        
        if (this.board[position] === ''){
            this.board[position] = this.symbols.options[this.symbols.turn_index];
            this.draw();
            
            var winning_sequences_index = this.check_winning_sequences( this.symbols.options[this.symbols.turn_index] );
            
            console.log(winning_sequences_index)

            if (winning_sequences_index >= 0 || !this.is_winner()) { 
                this.game_is_over();
                this.playerWinning();
            } else{
                this.symbols.change();
            }

            return true;
        }
        else {
            return false;
        }
    },

    

    check_winning_sequences: function(simbol) {
        for ( i in this.winning_sequences ) {
            if (this.board[ this.winning_sequences[i][0] ] == simbol  &&
                this.board[ this.winning_sequences[i][1] ] == simbol &&
                this.board[ this.winning_sequences[i][2] ] == simbol) {
                return i;
            }
        };
        return -1;
    },

    game_is_over: function() {
        this.gameover = true;

        for (i in this.board){
            // console.log(i)
            if (this.board[i] != '') {
                console.log('vazio')
                console.log(this.winning_sequences_index)
            } 
        }

        document.querySelector('.game').style.opacity = 0.2;
        document.querySelector('.game').style.cursor = "default";
        document.querySelector('.playAgain').style.display = "block";
    },

    start: function() {
        this.board.fill('');
        this.draw();
        this.gameover = false;       
    },

    draw: function() {
        let content = '';
        for ( i in this.board ) {
            content += '<div onclick="tic_tac_toe.make_play(' + i + ')">' + this.board[i] + '</div>';
        };

        this.container_element.innerHTML = content;
    },

    is_winner() {
        return this.board.includes('')
    },

    playerWinning: function() {
        var playerOneElement = document.querySelector('.playerOne');
        var playerTwoElement = document.querySelector('.playerTwo');

        playerOneElement.style.color = "red";
        playerTwoElement.style.color = "red";

        if(!this.is_winner()) {
            playerOneElement.innerHTML = "DRAW!!";
            playerTwoElement.innerHTML = "DRAW!!";

        } else if (this.symbols.turn_index == 0) {
            playerOneElement.innerHTML = "WIN!"
            playerOneElement.style.display = "block";
            
        } else {
            playerTwoElement.innerHTML = "WIN!";
            playerTwoElement.style.display = "block";
        }
    },

    refreshWindow: function() {
        Location.reload();
    }
};