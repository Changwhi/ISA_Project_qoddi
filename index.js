import express from 'express';
import { pipeline } from '@xenova/transformers';

// const { pipeline } = require("@xenova/transformers")
// const express = require("express")



// const express = require('express');
// const router = include('routes/router')
const port = process.env.PORT || 3000;

const app = express();


app.use(express.urlencoded({ extended: false }));



app.get('/', async (req, res) => {
  try {
    // let text = 'The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, ' +
    //   'and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. ' +
    //   'During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest ' +
    //   'man-made structure in the world, a title it held for 41 years until the Chrysler Building in New ' +
    //   'York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to ' +
    //   'the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the ' +
    //   'Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second ' +
    //   'tallest free-standing structure in France after the Millau Viaduct.';
    //
    // let generator = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6');
    // let output = await generator(text, {
    //   max_new_tokens: 100,
    // });
    // let text = 'I enjoy walking with my cute dog,';
    // let generator = await pipeline('text-generation', 'Xenova/distilgpt2');
    // let output = await generator(text);
    // console.log(output)
    // const responseData = await pipe(ARTICLE, max_length = 230, min_length = 30, do_sample = false)
    res.send("dd");
    return;
  } catch (error) {
    console.error('Error importing @xenova/transformers:', error);
    return 'An error occurred.';
  }
});


app.listen(port, () => {
  console.log("node app listening on port: " + port);
});






