#!/bin/sh

# Start Java Calculator in background
cd /app/java
java -jar app.jar &
JAVA_PID=$!
echo "Started Java Calculator with PID $JAVA_PID"

# Start Python Calculator in background
cd /app/python
python3 app.py &
PYTHON_PID=$!
echo "Started Python Calculator with PID $PYTHON_PID"

# Start Nginx in foreground
echo "Starting Nginx..."
nginx -g 'daemon off;'

# This will never be reached under normal circumstances
# because nginx is running in foreground,
# but it's good practice to include cleanup
trap "kill $JAVA_PID $PYTHON_PID" SIGTERM SIGINT