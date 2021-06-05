//Require Fastify framework and insantiate it
const fastify = require("fastify")();
//Require FS and insantiate it
const fs = require("fs");
//import coinCount
const { coinCount} = require("./p3-module");

fastify.get("/", (request, reply) => {
  const fileLoc = __dirname + "/index.html";
  fs.readFile(fileLoc, (err, data) => {
    if (err) {
      console.log("error :/");
      reply
        .code(500)
        .header("Content-Type", "text/html; charset=utf-8")
        .send("Error");
    } else {
      reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send(data);
    }
  });
});

fastify.get("/coin", (request, reply) => {
  const { denom = 0, count = 0 } = request.query;
  let coins = {
    denom: denom,
    count: count
  };
  const coinValue = coinCount(coins);
  //console.log(denom, count, coinValue);

  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(
      `<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`
    );
});

fastify.get("/coins", (request, reply) => {
  const { option } = request.query;

  if (option == 1) {
    coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
  } else if (option == 2) {
    const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
    coinValue = coinCount(...coins);
  } else if (option == 3){
    const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
    coinValue = coinCount(coins)
  } else {
    return 0;
  }

  //console.log(option);

  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(
      `<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`
    );
});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
