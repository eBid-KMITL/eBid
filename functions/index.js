const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
const admin = require('firebase-admin');
const bodyParser = require('body-parser')
admin.initializeApp();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
// build multiple CRUD interfaces:

// Customer user
app.post('/Customeruser', async function (req, res) {
    var data = req.body;
    try {
        await admin.firestore().collection('User').doc().set(data);
        res.status(200);
        res.send('Success');
    } catch (e) {
        res.status(400);
        res.send("error: " + e);
    }
});

// Delete Customer user
app.delete('/Deleteuser', async function (req, res) {
    var data = req.body;
    try {
        await admin.firestore().collection('User').doc(data.id).delete();
        res.status(200);
        res.send('Success');
    } catch (e) {
        res.status(400);
        res.send("error: " + e);
    }
});


// Create Product
app.post('/createProduct', async function (req, res) {
    var data = req.body;
    try {
        await admin.firestore().collection('Product').doc().set();
        res.status(200);
        res.send('Success');
    } catch (e) {
        res.status(400);
        res.send("error: " + e);
    }
});
// create delete
app.delete('/deleteProduct', async function (req, res) {
    var data = req.body;
    try {
        await admin.firestore().collection('Product').doc(data.id).delete();
        res.status(200);
        res.send('Success');
    } catch (e) {
        res.status(400);
        res.send("error: " + e);
    }
});

//import to database
app.put('/savePicture', async function (req, res) {
    var data = req.body;
    try {
        await admin.firestore().collection('Product').doc(data.id).set(data.url);
        res.status(200);
        res.send('Success');
    } catch (e) {
        res.status(400);
        res.send("error: " + e);
    }

})

// delete picture on database'Product'
app.delete('/deletePictureProduct', async function (req, res) {
    var data = req.body;
    try {
        await admin.firestore().collection('Product').doc(data.id).delete();
        res.status(200);
        res.send('Success');
    } catch (e) {
        res.status(400);
        res.send("error: " + e);
    }
});


//get AllProduct
app.get('/getAllProduct', async function (req, res) {
    try {
        const results = await admin.firestore().collection("Product").get();
        let payload = {};
        results.forEach((doc)=> {
            let temp = {...payload}
            payload = {
                ...temp,
                [doc.id]: doc.data()
            }
        });
        res.status(200);
        res.json(payload);
    } catch (e) {
        res.status(400);
        res.send("error: " + e);
    }
});


//get placeBid with productid
app.get('/getProduct/placeBid', async function (req, res) {
    try {
        const results = await admin.firestore().collection("Product").doc(req.query.productId).get();
        console.log(results.data());
        let payload = {
            placeBid: results.data().placeBid
        };

        res.status(200);
        res.json(payload);
    } catch (e) {
        res.status(400);
        res.send("error: " + e);
    }
});


// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);