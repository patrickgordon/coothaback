// server.js
const path = require("path");

var jsonServer = require("json-server");
var server = jsonServer.create();
var router = jsonServer.router(path.join(__dirname, "db.json"));
var db = router.db;
var middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);


server.use(jsonServer.rewriter({
	"/oauth/token": "/token",
	"/segments/2660310/all_efforts\\?athlete_id=:id": "/efforts",
	"/segments/2660310/leaderboard\\?club_id=:id": "/club_efforts",
	"/athlete/clubs": "/clubs"
}));

// This will make a POST behave like a GET for the token route.
server.post("/token", function (req, res, next) {
	req.method = "GET";
	req.query = req.body;
	next();
});

server.get("/club_efforts", function (req, res, next) {
	var id = req.query.club_id;
	var x = db.getState()["club_efforts"][id];
	res.json(x);
});


server.use(router);
server.listen(3001, function () {
	console.log("JSON Server is running");
});