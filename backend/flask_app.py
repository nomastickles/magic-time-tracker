from dotenv import load_dotenv, find_dotenv
from flask import Flask, render_template, request, abort
import os
import utils

load_dotenv(find_dotenv())

APP_SECRET = os.environ.get("APP_SECRET")
validation_schema = utils.get_validation_schema(APP_SECRET)
PORT = 8888
app = Flask(__name__)


@app.route("/update", methods=["GET"])
def update():
    errors = validation_schema.validate(request.args)
    if errors:
        abort(418)

    utils.update_data(request)

    return "ok"


@app.route("/current", methods=["GET"])
def current():
    errors = validation_schema.validate(request.args)
    if errors:
        abort(418)

    app_data = utils.get_current_data(APP_SECRET)

    return app_data


@app.route("/", methods=["GET"])
def index():
    errors = validation_schema.validate(request.args)
    if errors:
        return abort(418)

    app_data = utils.get_current_data(APP_SECRET)

    return render_template("index.html", app_data=app_data)


if __name__ == "__main__":
    if not APP_SECRET:
        raise ValueError("no APP_SECRET")
    app.run(host="0.0.0.0", port=PORT, debug=True)
