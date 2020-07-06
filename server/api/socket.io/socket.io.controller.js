//Internal Imports
const path = require('path');

//Custom Imports
const constants = require('../../utils/constant');
const config = require('../../configuration');

let errorFilePath = `../../views/not_found.html`

exports.startIoChat = async (req, res) => {
    try {

        let filePath = `../../views/index.html`
        res.sendFile(path.join(__dirname, filePath));

    } catch (error) {
        console.log('Error occure when start io chat Error %0 startIoChat ', error);
        res.sendFile(path.join(__dirname, errorFilePath));
    }
}

//upload image view
exports.uploadImageView = async (req, res) => {
    try {

        let filePath = `../../views/upload.html`
        let finalPath = path.join(__dirname, filePath);

        res.sendFile(finalPath, null, function (err) {
            if (err) {
                console.log('Error occure when start io chat Error %0 startIoChat ', err);
                res.sendFile(path.join(__dirname, errorFilePath));
            }
        });

    } catch (error) {
        console.log('Error occure when start io chat Error %0 startIoChat ', error);
        res.sendFile(path.join(__dirname, errorFilePath));
    }
}

//upload image
exports.uploadImage = async (req, res) => {
    try {

        if (!req.file) {
            return res.send(`<html>
                <head>
                    <link rel="icon" href="/images.png">
                </head>
                <body>
                    <a href="${config.get('baseUrl')}socket/upload_image_view">Please Choose Any File</a>
                </body>
            </html>`);
        }

        let fileName = `${config.get('baseUrl')}${req.file.filename}`;
        res.send(`<html>
                <head>
                    <link rel="icon" href="/images.png">
                </head>
                <body>
                    <input type="text" value="${fileName}" id="imageUrl">
                    <button onclick="copyUrl()">Copy Url</button>
                    <a href="${fileName}" target="_blank">
                        <button>View Image</button>
                    </a>
                    <script>
                        function copyUrl() {
                        var copyText = document.getElementById("imageUrl");
                        copyText.select();
                        copyText.setSelectionRange(0, 99999)
                        document.execCommand("copy");
                        alert("Copied the text: " + copyText.value);
                        }
                    </script>
                </body>
            </html>`);

    } catch (error) {
        console.log('Error occure when start io chat Error %0 startIoChat ', error);
        res.sendFile(path.join(__dirname, errorFilePath));
    }
}