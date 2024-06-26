const http = require('http');
const fs = require('fs');
const path = require('path');

const directoryPath = "/"; // Change this to your desired directory
const publicDir = path.join(__dirname, 'public');

//TODO: Don't want users to have to go to /files;  Want to have it so that we can access all files from index.html
//TODO: Add search bar that allows users to search for files
//TODO: Color code files directories, executables, pictures, text, etc...
//TODO: CSS
//TODO: favicon


// Create a server
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Serve index.html
        const filePath = path.join(publicDir, 'index.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server error');
                console.error('Error reading file:', err);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content, 'utf8');
            }
        });
    } else if (req.url === '/files') {  
        // Serve file list
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading directory');
                console.error('Error reading directory:', err);
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(files));
            }
        });
    } else {
        // Handle 404
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Listen on port 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
