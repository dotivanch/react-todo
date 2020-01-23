#!/bin/sh

echo 'Running at' $PORT
sed -i s/PORT_IN_WHICH_THE_APP_WILL_RUN/$PORT/g /etc/nginx/nginx.conf
cat /etc/nginx/nginx.conf
nginx
yarn production