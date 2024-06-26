const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();


const directoryPath = "/home/pluz"; // Change this to your desired directory
const publicDir = path.join(__dirname, 'public');

app.use(express.static(publicDir));  //********VERIFY******* */

app.get('/', (req, res) => {  //*******************VERIFY***************** */
    res.sendFile(path.join(publicDir, 'index.html'));
});

//TODO: Going to model it after the file manager "nemo"
//TODO: Display file contents within a table  make css for table
    // Display meta data within table
//TODO: Add search bar that allows users to search for files
//TODO: Color code files directories, executables, pictures, text, etc...
//TODO: Allow user to traverse through directories
//TODO: Allow
//TODO: Add: top panel
//TODO: Add side panel
//TODO: Keyboard shortcuts (super users)


//TODO: Password protected????
//TODO: add buttons that reveals hidden files
//TODO: CSS
//TODO: favicon


/*
// Helper function to generate the HTML list
// Should actually generate a table
function generateFileListHTML(files) {
    let fileListHTML = '<ul>';
    files.forEach(file => {
        fileListHTML += `<li>${file}</li>`;  //use of back ticks
    });
    fileListHTML += '</ul>';
    return fileListHTML;
}
*/

// Helper function to generate the HTML table
function generateFileTableHTML(files) {
    let fileTableHTML = '<table border="1" cellspacing="0" cellpadding="5">';
        files.forEach(file => {
            fileTableHTML += `<tr><td>${file}</td></tr>`; //use of backticks
        });
    
    fileTableHTML += '</table>';
    return fileTableHTML;
}

// Create a server
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Read the directory contents
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server error: Unable to read directory');
                console.error('Error reading directory:', err);
                return;
            }

            // Generate the HTML for the file table
            const fileTableHTML = generateFileTableHTML(files);

            // Read index.html file
            const filePath = path.join(publicDir, 'index.html');
            fs.readFile(filePath, 'utf8', (err, content) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Server error: Unable to read index.html');
                    console.error('Error reading file:', err);
                    return;
                }

                // Replace placeholder with the file list HTML
                const modifiedContent = content.replace('{{FILE_LIST}}', fileTableHTML);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(modifiedContent, 'utf8');
            });
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
