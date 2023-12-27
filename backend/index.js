const express = require('express');// import express
const app = express(); // instantiate express module
const bodyParser = require('body-parser');
const pool = require('./db/db');
const cors = require('cors'); // this is req.body
const db = require('./queries');
const fileUpload = require('express-fileupload');
const convertToWebP = require('./utils/convertToWebP');
const saveToFile = require('./utils/saveToFile');
const path = require('path');
const fs = require('fs');
const {resolve} = require('path');



const port = 3000;


app.use(cors()); // connecting to client-side
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : path.join(__dirname, '/temp/')
}));


app.listen(port, () => { // specify localhost port to listen to
    console.log(`server started on port ${port}`)
});

app.get('/', (request, response) => {
    response.json({ info: 'Clients library API' })
});

app.get('/clients', db.getAllClients);
app.get('/clients/:id', db.getClientById);
app.post('/clients', db.createClient);
app.put('/clients/:id', db.updateClient);
app.delete('/clients/:id', db.deleteClient);
app.get('/visits/:id', db.getAllVisits);
app.get('/visit/:id', db.getVisitById);
app.put('/visits/:id', db.updateVisit);
app.delete('/visits/:id', db.deleteVisit);
app.post('/visits', db.addVisit);
app.post('/images/convert/webp', async (req, res) => {
    let uploadPath = '';
    let convertedFile = '';
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'Файл не загружен'
            });
        } else {

            const  file = req.files["agreement"] || req.files["photo"];
            uploadPath = path.join(__dirname, '/temp/', file.name);
            file.mv(uploadPath);
            convertedFile = await convertToWebP(uploadPath);
            const fileName = saveToFile(convertedFile);

            //send response
            res.send({
                'status': true,
                'fileName': fileName,
            });

            if (fs.existsSync(uploadPath)) {
                fs.unlink(uploadPath, (error) => {
                    if(error) {
                        console.log(error)
                    }

                })
            }
            if (fs.existsSync(convertedFile)) {
                fs.unlink(convertedFile,  (error) => {
                    if(error) {
                        console.log(error)
                    }
                })
            }
        }
    } catch (err) {
        res.status(500).send(err);
    }
} );
app.post('images/download/jpeg', (request, response) => {
    const {nameFile} = request.body;
    const jpegFile = convertToJpeg(nameFile);
    if(jpegFile) {
        res.sendFile(jpegFile);
    } else res.send({
        'status': 'Ошибка конвертации'
    })
});
app.post('/images', async(req, res) => {
    const {nameFile} = req.body;
    try {
        res.send({
            'url': `http:\\\\${req.hostname}:${port}/images/${nameFile}`
        })
    } catch (error) {
        console.log('error')
    }
});
app.get('/images/:name', async(req, res) => {
    const name = req.params.name;
    try {
        res.sendFile( resolve(`./public/images/${name}`))
    } catch (error) {
        console.log(error)
    }
});

app.post('/birthday', db.getInfoAboutBirth)


