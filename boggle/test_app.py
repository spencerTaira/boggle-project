from unittest import TestCase

from flask import session

from app import app, games

# Make Flask errors be real errors, not HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']


class BoggleAppTestCase(TestCase):
    """Test flask app of Boggle."""

    def setUp(self):
        """Stuff to do before every test."""

        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):
        """Make sure information is in the session and HTML is displayed"""

        with self.client as client:
            response = client.get('/')
            html = response.get_data(as_text=True)
            self.assertIn("<table", html)
            self.assertIn('high score:', html)
            self.assertIn('Score:', html)
            self.assertIn('Seconds Left:', html)

    def test_api_new_game(self):
        """Test starting a new game."""

        with self.client as client:
            response = client.post('/api/new-game')
            data = response.get_json()
            game_id = data['gameId']
            board = data['board']

            # Check that these are the right types of things
            self.assertTrue(isinstance(game_id, str))
            self.assertTrue(isinstance(board, list))
            self.assertTrue(isinstance(board, list))

            self.assertIn(game_id, games)

    def test_score_word(self):
        """Test if word is valid by modifying the board in the session"""

        with self.client as client:
            game_id = client.post("/api/new-game").get_json()['gameId']
            game = games[game_id]

            # change the board's rows so this can check a word there
            game.board[0] = ["C", "A", "X", "X", "X"]
            game.board[1] = ["X", "T", "X", "X", "X"]
            game.board[2] = ["D", "O", "G", "X", "X"]
            game.board[3] = ["X", "X", "X", "X", "X"]
            game.board[4] = ["X", "X", "X", "X", "X"]

            response = self.client.post(
                "/api/score-word",
                json={"word": "CAT", "gameId": game_id})
            self.assertEqual(
                response.get_json(),
                {'result': 'ok', 'score': 1, 'gameScore': 1})

            response = self.client.post(
                "/api/score-word",
                json={"word": "DOG", "gameId": game_id})
            self.assertEqual(
                response.get_json(),
                {'result': 'ok', 'score': 1, 'gameScore': 2})

            response = self.client.post(
                "/api/score-word",
                json={"word": "CAT", "gameId": game_id})
            self.assertEqual(
                response.get_json(),
                {'result': 'already-played', 'score': 0, 'gameScore': 2})

            response = self.client.post(
                "/api/score-word",
                json={"word": "XXX", "gameId": game_id})
            self.assertEqual(
                response.get_json(),
                {'result': 'not-word', 'score': 0, 'gameScore': 2})

            response = self.client.post(
                "/api/score-word",
                json={"word": "NOPE", "gameId": game_id})
            self.assertEqual(
                response.get_json(),
                {'result': 'not-on-board', 'score': 0, 'gameScore': 2})

    def test_game_end(self):
        """Test game end."""

        with self.client as client:
            game_id = client.post("/api/new-game").get_json()['gameId']
            game = games[game_id]

            game.play_and_score_word("CAT")
            game.play_and_score_word("DOG")

            response = self.client.post(
                "/api/end-game", json={"gameId": game_id})
            self.assertEqual(
                response.get_json(),
                {"gameScore": 2, "numPlays": 1, "highScore": 2})

            # Play second game
            game_id = client.post("/api/new-game").get_json()['gameId']
            game = games[game_id]

            game.play_and_score_word("YES")

            response = self.client.post(
                "/api/end-game", json={"gameId": game_id})
            self.assertEqual(
                response.get_json(),
                {"gameScore": 1, "numPlays": 2, "highScore": 2})
