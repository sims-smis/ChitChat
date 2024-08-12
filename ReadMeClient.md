## socket with client side
run inside client folder: npm i socket.io-client

## two time console
"A user is connected" was coming two time on console after running the server for only one time because react uses strictmode so I went to index.js of client side and removed that React.strictmode tag replaced it with empty tags

## Note
usually hum listener lagaate hai aur emit frontend se karte hai aur fir jo listener hota hai unke andar emit karte hai
