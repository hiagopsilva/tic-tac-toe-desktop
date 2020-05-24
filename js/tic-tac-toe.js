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
            let winning_sequences_index = this.check_winning_sequences( this.symbols.options[this.symbols.turn_index] );
            if (winning_sequences_index >= 0){
                this.game_is_over();
                this.PlayerWinning();
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

    PlayerWinning: function() {
        if(this.symbols.turn_index == 0) {
            document.querySelector('.playerOneWin').style.display = "block";
            
        } else {
            document.querySelector('.playerTwoWin').style.display = "block";
        }
    },

    refreshWindow: function() {
        Location.reload();
    }
};