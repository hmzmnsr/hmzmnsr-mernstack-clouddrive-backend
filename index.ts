import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';

const myServer = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log("hello");
    res.end("hello from");
});

myServer.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
