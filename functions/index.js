const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
const admin = require('firebase-admin');
const bodyParser = require('body-parser')

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testebid.firebaseio.com"
});
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

app.post('/hello', function (req, res) {
    console.log(req.headers)
})


// Create user
app.get('/Createuser', function (req, res) {
    var data = req.headers;
    admin.auth().createUser({
        email: data.email,
        emailVerified: false,
        password: data.password,
        displayName: data.name,
        disabled: false
    }).then(userrecord => {
        console.log(userrecord)
        admin.database().ref("/User/" + userrecord.uid).update({
            username: userrecord.displayName,
            balance : 0
        }).then(() => {
            console.log('Success')
            res.send(userrecord)
        }).catch(err => {
            console.log(err)
            res.status(400).send(err)
        })
        // admin.firestore().collection('User').add({
        //     username : userrecord.displayName
        // }).then(()=>{
        //     console.log('Success')
        //     res.send(userrecord)
        // }).catch(err =>{
        //     console.log(err)
        //     res.status(400).send(err)
        // })
    })
});

// Customer user
app.post('/Customeruser', function (req, res) {
    var data = req.body;
    admin.database().ref("/User/" + data.uid).update(
        data.payload
    ).then(() => {
        console.log('Success')
        res.send(userrecord)
    }).catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
});

// Create Product
app.post('/CreateProduct', function (req, res) {
    var data = req.body;
    admin.database().ref("/Product/" + data.uid).update(
        data.payload
    ).then(() => {
        console.log('Success')
        res.send(userrecord)
    }).catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
});
// create delete
app.delete('/deleteProduct', function (req, res) {
    var data = req.body;
    try {
        admin.firestore().collection('Product').doc(data.id).delete();
        res.status(200);
        res.send('Success');
    } catch (e) {
        res.status(400);
        res.send("error: " + e);
    }
});

//import to database
app.put('/savePicture', function (req, res) {
    var data = req.body;
    try {
        admin.firestore().collection('Product').doc(data.id).set(data.url);
        res.status(200);
        res.send('Success');
    } catch (e) {
        res.status(400);
        res.send("error: " + e);
    }

})

// delete picture on database'Product'
app.delete('/deletePictureProduct', function (req, res) {
    var data = req.body;
    try {
        admin.firestore().collection('Product').doc(data.id).delete();
        res.status(200);
        res.send('Success');
    } catch (e) {
        res.status(400);
        res.send("error: " + e);
    }
});


//get AllProduct
app.get('/getAllProduct', function (req, res) {
    try {
        const results = admin.firestore().collection("Product").get();
        let payload = {};
        results.forEach((doc) => {
            let temp = { ...payload }
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
app.get('/getProduct/placeBid', function (req, res) {
    try {
        const results = admin.firestore().collection("Product").doc(req.query.productId).get();
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