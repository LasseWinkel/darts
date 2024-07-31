from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///darts.db"
db = SQLAlchemy(app)


class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    number = db.Column(db.Integer, nullable=False)
    points = db.Column(db.Integer, nullable=False)


@app.route("/api/players", methods=["POST"])
def add_player():
    data = request.get_json()
    new_player = Player(
        id=data["id"], name=data["name"], number=data["number"], points=data["points"]
    )
    db.session.add(new_player)
    db.session.commit()
    players = Player.query.all()
    return (
        jsonify(
            [
                {
                    "id": player.id,
                    "name": player.name,
                    "number": player.number,
                    "points": player.points,
                }
                for player in players
            ]
        ),
        201,
    )


@app.route("/api/players", methods=["GET"])
def get_players():
    players = Player.query.all()
    return jsonify(
        [
            {
                "id": player.id,
                "name": player.name,
                "number": player.number,
                "points": player.points,
            }
            for player in players
        ]
    )


@app.route("/api/players/<int:player_id>", methods=["PUT"])
def update_player(player_id):
    data = request.get_json()
    player = Player.query.get(player_id)
    player.id = data["id"]
    player.name = data["name"]
    player.number = data["number"]
    player.points = data["points"]
    db.session.commit()
    players = Player.query.all()
    return jsonify(
        [
            {
                "id": player.id,
                "name": player.name,
                "number": player.number,
                "points": player.points,
            }
            for player in players
        ]
    )


@app.route("/api/players/<int:player_id>", methods=["DELETE"])
def delete_player(player_id):
    player = Player.query.get(player_id)
    db.session.delete(player)
    db.session.commit()
    players = Player.query.all()
    return (
        jsonify(
            [
                {
                    "id": player.id,
                    "name": player.name,
                    "number": player.number,
                    "points": player.points,
                }
                for player in players
            ]
        ),
        200,
    )


class NumberOfLives(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Integer, nullable=False)


@app.route("/api/blindkiller/numberoflives", methods=["GET"])
def get_number_of_lives():
    number_of_lives = NumberOfLives.query.get(0)
    return jsonify(number_of_lives.value)


@app.route("/api/blindkiller/numberoflives", methods=["PUT"])
def set_number_of_lives():
    data = request.get_json()
    number_of_lives = NumberOfLives.query.get(0)
    number_of_lives.value = data
    db.session.commit()
    return (
        jsonify(
            {
                "message": "Number updated successfully",
                "newValue": number_of_lives.value,
            }
        ),
        201,
    )


class Lives(db.Model):
    field = db.Column(db.Integer, primary_key=True)
    lives = db.Column(db.Integer, nullable=False)


@app.route("/api/blindkiller/lives", methods=["GET"])
def get_lives():
    lives = Lives.query.all()
    return jsonify(
        [
            {
                "field": life.field,
                "lives": life.lives,
            }
            for life in lives
        ]
    )


@app.route("/api/blindkiller/lives/<int:field>", methods=["PUT"])
def update_lives(field):
    data = request.get_json()
    lives = Lives.query.get(field)
    lives.field = data["field"]
    lives.lives = data["lives"]
    db.session.commit()
    allLives = Lives.query.all()
    return jsonify(
        [
            {
                "field": life.field,
                "lives": life.lives,
            }
            for life in allLives
        ]
    )


# Change value to boolean
class GameStarted(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Integer, nullable=False)


@app.route("/api/blindkiller/gamestarted", methods=["GET"])
def get_game_started():
    game_started = GameStarted.query.get(0)
    return jsonify(game_started.value)


@app.route("/api/blindkiller/gamestarted", methods=["PUT"])
def set_game_started():
    data = request.get_json()
    game_started = GameStarted.query.get(0)
    game_started.value = data
    db.session.commit()
    return (
        jsonify(
            game_started.value,
        ),
        201,
    )


# Ensure database tables are created within the application context
with app.app_context():
    db.create_all()

    if NumberOfLives.query.get(0) is None:
        initial_num_of_lives_entry = NumberOfLives(id=0, value=0)
        db.session.add(initial_num_of_lives_entry)
        db.session.commit()

    for index in range(0, 22):
        if Lives.query.get(index) is None:
            initial_lives = Lives(field=index, lives=0)
            db.session.add(initial_lives)
            db.session.commit()

    if GameStarted.query.get(0) is None:
        initial_game_started = GameStarted(id=0, value=0)
        db.session.add(initial_game_started)
        db.session.commit()

if __name__ == "__main__":
    app.run(debug=True)
