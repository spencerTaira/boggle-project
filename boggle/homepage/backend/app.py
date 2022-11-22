from flask import Flask

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret"

# Members API Route 
@app.route("/members")
def members():
    return {"members": ["happy", "sed", "med"]}

if __name__ == "__main__":
    app.run()