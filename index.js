require('dotenv').config()
const http = require("http");
const PORT = process.env.PORT;
const EMAIL = require('./email');

const server = http.createServer(async (req, res) => {
    //set the request route
    if (req.url === "/api" && req.method === "POST") {
        const response = await new EMAIL().sendEmail(req);
        console.log("Email response", response)
        /**Setting up response */
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end('Email sent successfully');
    }
    /*If no route present**/
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});