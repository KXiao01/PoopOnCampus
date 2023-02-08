import express from "express";
import cors from 'cors'
import db from "./firebase.js";
import { DocumentReference } from "firebase-admin/firestore";
import { stringify } from "querystring";



const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Server has started on port: ${port}`))

app.get('/', (req, res) => {
    res.send('Hello World!');
});


// get toilet locations
app.get('/toilets', async (req, res) => {

  const colRef = await db.collection("toilets").doc("toilets").get();
  res.send(colRef.data().locations);

});

// get toilet reviews
app.get('/reviews', async (req, res) => {
  // get id from req
  const ref = req.query.ref;
  const colRef = await db.collection("toilets").doc("reviews").get();

  res.send(colRef.data()[ref.toString()]);
});

// add toilet review
app.post('/review', async (req, res) => {
  // get id from query
  const ref = req.query.ref;
  const colRef = await db.collection("toilets").doc("reviews").get();
  const data = colRef.data()[ref.toString()];
  data.push(req.body);
  await db.collection("toilets").doc("reviews").update({[ref.toString()]: data});
  res.json({});
});