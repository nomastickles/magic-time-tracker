from datetime import datetime
from flask import Request
from marshmallow import Schema, fields
from marshmallow.validate import Range, Equal
from pathlib import Path
from typing import Union
import glob
import os

DATE_FORMAT = "%m-%d-%Y_%H:%M:%S"
PATH_NAME = str(Path.cwd()) + "/data/"
TIME_TRACKERS = ["SLEEP", "WAKE", "MAGIC"]
FLAGS = ["HELP"]
FILENAME_SEPARATOR = "@"


def get_latest_filename_by_pattern(pattern: str = "*") -> Union[str, None]:
    files = sorted(Path(PATH_NAME).glob(pattern), key=os.path.getmtime, reverse=True)
    if len(files):
        return files[0].stem
    return None


def write_file(filename: str, content: str = "") -> None:
    with open(PATH_NAME + filename, "w") as file:
        file.write(content)


def remove_file(filename: str) -> None:
    if os.path.exists(PATH_NAME + filename):
        os.remove(PATH_NAME + filename)


def get_validation_schema(incomingKey: str):
    class update_input_schema(Schema):
        key = fields.Str(required=True, validate=Equal(incomingKey))
        TIMESTAMP_SLEEP = fields.Int(
            required=False, validate=Range(min=1680931733093, max=4680931733093)
        )
        TIMESTAMP_WAKE = fields.Int(
            required=False, validate=Range(min=1680931733093, max=4680931733093)
        )
        TIMESTAMP_MAGIC = fields.Int(
            required=False, validate=Range(min=1680931733093, max=4680931733093)
        )
        FLAG_HELP = fields.Int(required=False, validate=Range(min=0, max=1))

    return update_input_schema()


def get_datetime_string_from_js_timestamp(timestamp: int) -> str:
    date = datetime.fromtimestamp(timestamp / 1000)
    return date.strftime(DATE_FORMAT)


def get_js_timestamp_from_datetime_string(incoming_datetime: str) -> int:
    date = datetime.strptime(incoming_datetime, DATE_FORMAT)
    return int(datetime.timestamp(date) * 1000)


# foot-gun
def get_current_data(key: str) -> dict[str, Union[str, None]]:
    app_data = {
        "KEY": key,
    }
    for flag in FLAGS:
        filename = get_latest_filename_by_pattern(flag)
        if filename == None:
            continue
        new_key = f"FLAG_{flag}"
        app_data[new_key] = 1

    for arg in TIME_TRACKERS:
        filename = get_latest_filename_by_pattern(arg + "*")
        if filename == None:
            continue
        date_string = filename.split(FILENAME_SEPARATOR)[1]
        new_key = f"TIMESTAMP_{arg}"
        app_data[new_key] = get_js_timestamp_from_datetime_string(date_string) or ""
    return app_data


def update_data(request: Request):
    for flag in FLAGS:
        value = request.args.get(f"FLAG_{flag}")
        if value == None:
            continue

        if int(value) == 0:
            remove_file(flag)
        else:
            write_file(flag)

    # foot-gun / TODO: write cron to clean up /data/ after n weeks?
    for arg in TIME_TRACKERS:
        value = request.args.get(f"TIMESTAMP_{arg}")

        if value == None:
            continue

        date_string = get_datetime_string_from_js_timestamp(int(value))

        write_file(f"{arg}{FILENAME_SEPARATOR}{date_string}")
