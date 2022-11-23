"""
Player Object =
{
    username: user1,
    score: number,
    room: ??? (do we need?),
    correct_guesses: Set(of correct guesses)

    methods:
    - is_word_not_a_dup
    - addScore
}
"""


"""Code for a player model"""


class Player():
    """A class for holding data about a current player"""

    def __init__(self,username, room):
        self.played_words = set()
        self.username = username    
        self.score = 0
        self.room = room

    # def __repr__():

    def is_word_not_a_dup(self, word):
        """Return True/False if a word has not already been played."""

        return word not in self.played_words

    def add_score(points):
        self.score += score