import express from "express";
import SummaryPipeline from "./models/SummaryPipeline.js";
import TextGeneratorPipeline from "./models/TextGeneratorPipeline.js";

const port = process.env.PORT || 3000;
const app = express();

const validateRequest = (req, res, next) => {
  if (!req.body.text) {
    return res.status(400).send({ error: "No text provided" });
  }
  next();
};

app.use(express.json());

app.post("/summarise", validateRequest, async (req, res) => {
  try {
    const text = req.body.text;
    const pipeline = await SummaryPipeline.getInstance();
    const out = await pipeline(text);
    res.json(out[0]);
    return;
  } catch (error) {
    console.error("Error in summary route", error);
    return res.status(500).send({ error: error });
  }
});

app.post("/generate", validateRequest, async (req, res) => {
  try {
    const text = req.body.text;
    const pipeline = await TextGeneratorPipeline.getInstance();
    const out = await pipeline(text);
    res.json(out);
    return;
  } catch (error) {
    console.error("Error in textGenerator route", error);
    return res.status(500).send({ error: error });
  }
});

app.listen(port, () => {
  console.log("Listening on PORT:", port);
});
