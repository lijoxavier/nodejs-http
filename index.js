const http = require("http")
const fs = require("fs")
const userList = require("./userList")
const server = http.createServer((req, res) => {


    switch (req.url) {
        case '/':
            res.writeHead(200, { "Content-Type": "text/html" })
            fs.readFile('index.html', "utf8", (err, data) => {
                if (err) throw err
                res.end(data)
            })
            break;

        case '/userjson':
            res.writeHead(200, { "Content-Type": "application/json" })
            fs.readFile("user.json", "utf8", (err, data) => {
                if (err) throw err
                res.end(data)
            })
            break;

        case '/user':
            req.setEncoding('utf8')
            req.on('data', (chunk) => {
                userList.push(JSON.parse(chunk))
                console.log(userList);

            })
            
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            res.writeHead(200,{"Content-Type":"application/json"})
            res.end(JSON.stringify(userList))
            break;
            
        default:
            res.writeHead(404)
            res.end("page not found")
            break;
    }

})
const PORT = 3305
server.listen(PORT, () => {
    console.log(`server listening in ${PORT}`);
})
