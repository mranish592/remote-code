#!/bin/bash
HTTPS_URL=${HEALTH_CHECK_HTTPS_URL:-"https://remote-code-http-server.onrender.com"}
WSS_URL=${HEALTH_CHECK_WSS_URL:-"https://remote-code-wss-server.onrender.com/socket.io/?EIO=4&transport=polling"}
INTERVAL=${HEALTH_CHECK_INTERVAL:-60}  # Default interval is 10 seconds

while true; do
  TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
  HTTPS_STATUS=$(curl -o /dev/null -s -w "%{http_code}" "$HTTPS_URL")
  echo "[$TIMESTAMP] HTTPS Status Code: $HTTPS_STATUS for $HTTPS_URL"
  WSS_STATUS=$(curl -o /dev/null -s -w "%{http_code}" "$WSS_URL")
  echo "[$TIMESTAMP] WSS Status Code: $WSS_STATUS for $WSS_URL"
  sleep $INTERVAL
done
