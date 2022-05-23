import './guide.css'

const GuideComponent = () => {
    return (  
        <section className="guide-component">
            <div className="container">
                <h1 className="guide-title">Tic Tac Toe Instructions And Basics</h1>
                <div className="row">
                    <div className="col-xl-6">
                        <div className="guide">
                            <p>Tic Tac Toe requires two players and starts with a 3x3 square grid.</p>
                            <p>
                                 The player who goes first places an X on any of the 9 squares they choose.
                                 After that, the second player places an O on any of the remaining squares,
                                 and the two players go back and forth until one player has 3 in a row of their letter
                                 (either as a vertical line, horizontal line, or diagonal line).
                                 The player who gets those three letters in a row wins the game. 
                                 If all 9 squares fill up and no one has 3 in a row, the game is a tie.
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="">

                        </div>
                    </div>
                </div>
                <h2 className="guide-title">Types Of Play To Avoid</h2>
                <div className="row">
                    <div className="col-xl-6">
                        <div className="">
                            
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="guide">
                            <p>
                                 One of the main types of play you want to avoid in Tic Tac Toe is placing letters at random. 
                                 This strategy is very easy to counter, as more experienced players will simply counter each
                                 of your plays to ensure a tie or set up a win condition while you aren't looking. </p>
                            <p>
                                 Another type of play you'll want to avoid is playing only to block your opponent from making moves. 
                                 Against an average player, the best result of this strategy tends to be a tie, 
                                 and certain high-level strategies benefit from the opponent blocking them on a turn-by-turn basis (as opposed to the grand picture).
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-6">
                        <div className="guide">
                            <p>
                                 In terms of the first square you pick in a game, 
                                 try to avoid the square dead in the center. 
                                 This should only occur if you go second and your opponent takes a corner space 
                                 (as this will let you force out a draw).
                            </p>
                            <p>
                                 You should never pick the middle square of every column or row 
                                 (besides the center square) under any circumstance as your first move. 
                                 This is because this move deprives you of taking a critical piece of the 
                                 board your opponent needs to win and gives them a free turn to set up on you.
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="">

                        </div>
                    </div>
                </div>
                <h2 className="guide-title">Tic Tac Toe Strategy</h2>
                <div className="row">
                    <div className="col-xl-7">
                        <div className="guide">
                            <h3 className="guide-title">Strategy #1: Go First If Possible</h3>
                            <p>
                                For starters, going first gives you the most board access. 
                                After all, if every square gets filled, you've got a claim to 5 of them 
                                (while the person who goes second only gets 4). 
                            </p>
                            <p>
                                Another perk of going first is that an expert tic tac toe strategy for the game 
                                revolves around going first and putting your first X in one of the far corners. 
                                From there, try to capture the adjacent corners on your next turn so you can get 
                                your opponent in a situation where they can't stop you from achieving three in a row.
                                At the very least, capturing all the corners helps secure a tie if your opponent plays
                                to counter your move.
                            </p>
                            <p>
                                For example, let's say you place an X in the top left corner. 
                                Your opponent takes the bottom left corner to block your row.
                            </p>
                            <p>
                                You then place an X in the top right corner.
                                Your opponent has to place their O in the middle of your two X's or they lose the next turn. 
                                When they do, place an X on the bottom right corner.
                            </p>
                            <p>
                                Your opponent is now caught in a Catch-22. 
                                They either block your right column of X's and you win on your next turn with a diagonal row, 
                                or they block the diagonal and you win with the column. 
                                While there is a great variety of moves your opponent could make on their first turn, 
                                as long as they try to block you with a non-center space on their first turn, 
                                sticking to corners will ensure you lock them out of forming any win conditions.
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-5">
                        <div className="guide">
                            <h3 className="guide-title">Strategy #2: For When You Get Stuck Going Second</h3>
                            <br />
                            <p>
                                But you won't always go first in every game you play. 
                                Should that happen, you have to make sure you make the precise counter-play 
                                to ensure a tie should your opponent be playing at the top skill level. 
                                If they take a corner square, take the center to counter. 
                            </p>
                            <p>
                                If they swap it up and grab the center to disorient you, grab a corner. 
                                As long as you block every move your opponent makes from there on, you're guaranteed a tie. 
                                If you want to win, you'll have to hope they slip up and take the wrong square on your turn
                                so you can exploit that to take back the offensive momentum.
                            </p>
                            <p>
                                If your opponent whiffs their first turn and grabs the middle square of any row or column,
                                it's easy to punish them and turn it back around to a win. 
                                Taking advantage of these small mistakes is a crucial part of any Tic Tac Toe strategy. 
                                If they do this, grab a corner and proceed gameplay as if you were doing the first-turn corner strategy with X. 
                                Worst-case scenario, you should be able to force out a tie if they recover down the road.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default GuideComponent;