var express = require("express");
var router = express.Router();

const messages = [];
// ----------------------------------------------------------------------

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// ----------------------------------------------------------------------

const subscribers = [];

router.post("/messages/long", (request, response, next) => {
  const { message, username } = request.body;

  messages.push({
    username: username,
    message: message,
  });

  subscribers.forEach((elem) => {
    elem.write("data: " + JSON.stringify(messages) + "\n\n");
  });

  // response.status(204).end();

  response_block = {
    response: "successfully pushed the new message",
  };

  return response.status(200).json(response_block);
});

router.get("/messages/long", function (request, response, next) {
  subscribers.push(response);
  response.writeHead(200, {
    "Content-Type": "text/event-stream",
  });
  // return response.json(messages)
});

module.exports = router;
