#!/bin/bash
echo "executing entrypoint.sh"
bash scripts/healthcheck.sh &
npm start
# tail -f  /dev/null