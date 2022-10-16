document.setup;

let tiles;
let startplayer = "X"
let gameOver = false;

// let ex = "X";
// let oh = "O";

const index = (i , j) => 3 * i + j

function setup() {
    tiles = $('.cell');
}

$(".cell").addEventListener("click", function() {
    if (!gameOver) {
        if ($(this).html() == "") {
            $(this).html(player == "O" ? "X" : "O");
            $(this).val(player);
            player = player == "O" ? "X" : "O";
            $(".turn").html(player + "'s Turn")
        }
        if (winner()) {
            $(".winner").html("Winner: " + winner());
            gameOver = true;
        }
    }
});

function reset() {
    gameOver = false;
    player = "X";
    for (let t of tiles) {
        t = $(t);
        t.val("");
        t.html("");
    }
    $(".winner").html("");
    $(".turn").html("X's Turn");
}

function getvals() {
    let r = [];
    for (let t of tiles) {
        r.push($(t).val());
    }
    return r;
}

function winner() {
    //1st diagonal
    const board = getvals();
    let first = board[0];
    let forDiagonal = first != "";
    for (let i = 0; i < 3; i++) {
        if (board[index(i , i)] != first) {
            forDiagonal = false
            break
        }
    }
    if (diagonal) return first;

    //2nd diagonal
    first = board[index(0 , 2)]
    let backDiagonal = first != ""
    for (let i = 1; i < 4; i++) {
        if (board[index(i - 1, 3 - i)] != first) {
            backDiagonal = false;
            break
        }
    }
    if (backDiagonal) return first;

    //horizontal and vertical
    for (let i = 0; i < 3; i++) {
        first = board[index(i , 0)]
        let straightLine = first != ""
        for (let j = 0; j < 3; j++) {
            if (board[index(i, j)] != first) {
                straightLine = false
                break
            }
        }
        if (straightLine) return first;
    }

    for (let i = 0; i < 3; i++) {
        first = board[index(0 , i)]
        let straightLine = first != ""
        for (let j = 0; j < 3; j++) {
            if (board[index(j , i)] != first) {
                straightLine = false
                break
            }
        }
        if (straightLine) return first;
    }

    //tie
    return board.filter(v => v == "").length == 0 ? "tie" : undefined
}