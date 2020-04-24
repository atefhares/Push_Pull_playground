var express = require("express");
var router = express.Router();

const messages = [];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// --------------------------------------------------

router.post("/messages", (request, response, next) => {
  const { message, username } = request.body;

  messages.push({
    username: username,
    message: message,
  });

  response_block = {
    response: "successfully pushed the new message",
  };
  return response.status(200).json(response_block);
});

router.get("/messages", function (request, response, next) {
  return response.json(messages);
});

// --------------------------------------------------
const subscribers = {};

router.post("/messages/long", (request, response, next) => {
  const { message, username } = request.body;

  messages.push({
    username: username,
    message: message,
  });

  response_block = {
    response: "successfully pushed the new message",
  };

  Object.keys(subscribers).forEach((id) => {
    subscribers[id].json(messages);
    delete subscribers[id];
  });

  return response.status(200).json(response_block);
});

router.get("/messages/long", function (request, response, next) {
  const id = Math.ceil(Math.random() * 100000);
  subscribers[id] = response;
  // return response.json(messages)
});

module.exports = router;
