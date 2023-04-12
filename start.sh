#!/bin/bash

LOG_FILE="/tmp/magic-time-tracker-$(date +"%FT%H%M%S").log"
FLASK_DEBUG=1
# optional
nohup python $PWD/backend/flask_app.py \
  >>$LOG_FILE 2>&1 &

ps aux | grep magic-time-tracker

VAR=$(ls -tpr /tmp/magic-time-tracker* | tail -n 1) && echo $VAR
