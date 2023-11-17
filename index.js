import express from 'express';
import SummaryPipeline from './models/SummaryPipeline.js';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization,Content-Length, X-Requested-With');
  next();
});

app.get("/", (req, res) => {
  res.end({"Lending page": "Hellow world"})
})

app.post('/summary', async (req, res) => {
  try {
    const text = req.body.text;
    const classifier = await SummaryPipeline.getInstance();
    const response = await classifier(text);
    const responseData = JSON.stringify(response);
    console.log(responseData);
    res.end(responseData);
    return;
  } catch (error) {
    console.error('Error in summary route', error);
    res.end({ 'error': error });
  }
});

app.listen(port, () => {
  console.log("node app listening on port: " + port);
});






