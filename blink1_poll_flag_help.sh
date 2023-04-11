#!/bin/bash

# This looks for the flag_help flag in the current state of the backend
# and should be run on a separate machine.
#
# Using thingm's blink(1) mk3 USB RGB LED.
# see https://github.com/todbot/blink1/blob/main/docs/blink1-tool-tips.md

if [[ $# != 1 ]]; then
  echo "need one argument"
  echo "example: ./blink1_poll_flag_help.sh 1234567890"
  exit 1
fi

KEY=$1

while [ true ]; do
  ./blink1-tool --off
  sleep 1
  RESULT=$(curl "http://192.168.1.123:8888/current?key=$KEY" | jq '.FLAG_HELP')
  echo $RESULT
  if [[ $RESULT -eq 1 ]]; then
    ./blink1-tool --magenta
  fi

  sleep 5
done
