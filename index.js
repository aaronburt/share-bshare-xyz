/* Condtional statement to check env is in dev mode */ 
if(!process.env.NODE_PRODUCTION){ require('dotenv').config(); }
const { S3_BUCKET, SIMPLE_STORAGE_TOKEN, PORT, FIREBASE_COLLECTION } = process.env;
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const config = require("./config/config");
const axios = require('axios').default;
const express = require("express");
const app = express();

initializeApp({ credential: cert(config.firebase_authentication.serviceAccount) });

/* This function could be async but that would block the render of the page */ 
function incrementViewCount(collection, docid, fieldName, views){
    const db = getFirestore();
    const document = db.collection(collection).doc(docid);
    document.update({ [fieldName]: FieldValue.increment(views) });
}

app.set('view engine', 'ejs');
app.use('/public/', express.static(`${__dirname}/public`));
app.get('/preview/:objectId', async(req, res) => {
    try {
        const { objectId } = req.params;
        const db = getFirestore();
        const document = db.collection(FIREBASE_COLLECTION).doc(objectId);
        const snapshot = await document.get(); 
        if(!snapshot.exists) return res.status(404).json({ "status": 404 }); 

        incrementViewCount(FIREBASE_COLLECTION, objectId, 'views', 1);

        const S3_RESPONSE = await axios.get(`https://simple-storage-auth.bsharex.xyz/${S3_BUCKET}/${objectId}/json`, {
            "headers": {
                "token": SIMPLE_STORAGE_TOKEN
            }
        });

        return res.render('index', { S3_RESPONSE: S3_RESPONSE.data, DB_RESPONSE: snapshot.data(), MEDIATYPE: snapshot.data().mimetype.split('/')[0] });
    } catch(err){
        console.log(err)
        return res.status(400).json({ "status": 400 }); 
    }
});

const listener = app.listen(8080, () => { console.log(`Instance started on port ${listener.address().port}`) });
