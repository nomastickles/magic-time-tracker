#!/bin/bash

# This looks for the FLAG_HELP file in the current state of the backend
# and should be run on a separate machine.
#
# Using thingm's blink(1) mk3 USB RGB LED.
# see https://github.com/todbot/blink1/blob/main/docs/blink1-tool-tips.md

if [[ $# != 1 ]]; then
  echo "need one argument"
  echo "example: ./blink1_poll_flag_help.sh http://192.168.1.123:8888/current?key=1234567890"
  exit 1
fi

HOST=$1

while [ true ]; do
  RESULT=$(curl "$HOST" | jq '.FLAG_HELP')
  if [[ $RESULT -eq 1 ]]; then
    echo "FLAG_HELP 🛟"
    ./blink1-tool --magenta
    sleep 10
  else
    ./blink1-tool --off
    sleep 5
  fi

done
