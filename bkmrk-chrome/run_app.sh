set -e

echo "start chrome"
google-chrome --headless --hide-scrollbars --no-sandbox --remote-debugging-address=0.0.0.0 --remote-debugging-port=9222 --disable-gpu &


echo "start express app"
yarn run serve