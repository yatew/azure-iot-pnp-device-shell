export default function handler(req, res) {
    // res is https://nodejs.org/api/http.html#http_class_http_serverresponse
    console.log("connect called")
    // res.status(200).json({ text: 'Call Azure DPS' });

    // todo: connect to dps

    // res.writeHead(301, { Location: "http://" + req.headers["host"] + "/page-b.html" });
    // res.writeHead(301, { Location: "https://www.google.com" });
    res.writeHead(301, { Location: "/device" });
    // res.writeHead(301, { Location: "https://www.yahoo.com" });
    return res.end();
}
