const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// TODO: I believe that when we are starting the server it automatically takes index.html in its default state
    // The server is then unable to update it because of 'express.static'

// I could look to using sockets?

// Define the directory for static files
const publicDir = path.join(__dirname, 'public');

// Serve static files from the public directory
app.use(express.static(publicDir));

// Define the directory path to list files from
const directoryPath = '/home/pluz';  // Replace with your actual directory path

// Function to generate the HTML table for files
function generateFileTableHTML(files) {
    let fileTableHTML = '<table border="1" cellspacing="0" cellpadding="5">';
    files.forEach(file => {
        fileTableHTML += `<tr><td>${file}</td></tr>`;
    });
    fileTableHTML += '</table>';
    console.log('Generated file table HTML:', fileTableHTML);
    return fileTableHTML;
}

// Serve the main HTML file
app.get('/', (req, res) => {
    console.log('Received request for /');

    // Read the directory contents
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Server error: Unable to read directory');
            return;
        }

        console.log('Files found:', files);

        // Generate the HTML for the file table
        const fileTableHTML = generateFileTableHTML(files);

        // Read and modify index.html
        const filePath = path.join(publicDir, 'index.html');
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                console.error('Error reading index.html:', err);
                res.status(500).send('Server error: Unable to read index.html');
                return;
            }

            console.log('Original content:', content);

            // Replace placeholder with the file list HTML
            const modifiedContent = content.replace('{{FILE_LIST}}', fileTableHTML);

            // Check if replacement was successful
            if (modifiedContent.includes('{{FILE_LIST}}')) {
                console.error('Placeholder {{FILE_LIST}} was not replaced.');
            } else {
                console.log('Placeholder {{FILE_LIST}} replaced successfully.');
            }

            console.log('Modified content:', modifiedContent);
            res.send(modifiedContent);
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
