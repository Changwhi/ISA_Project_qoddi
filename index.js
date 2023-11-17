import "dotenv/config";
import mqtt from "mqtt";
import { GenerateTopic, SummaryTopic } from "./constants.js";
import SummaryPipeline from "./models/SummaryPipeline.js";
import TextGeneratorPipeline from "./models/TextGeneratorPipeline.js";

const generateText = async (text) => {
  try {
    const classifier = await TextGeneratorPipeline.getInstance();
    const response = await classifier(text);
    return response;
  } catch (err) {}
};

const summariseText = async (text) => {
  try {
    const classifier = await SummaryPipeline.getInstance();
    const response = await classifier(text);
    return response;
  } catch (err) {}
};

const mqttClient = mqtt.connect({
  protocol: process.env.MQTT_PROTOCOL,
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASSWORD,
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
});

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker", mqttClient.options.clientId);
});

mqttClient.subscribe(SummaryTopic, (err) => {
  if (!err) {
    console.log("Subscribed to summary topic");
  }
});

mqttClient.subscribe(GenerateTopic, (err) => {
  if (!err) {
    console.log("Subscribed to generate topic");
  }
});

mqttClient.on("message", async (topic, message) => {
  if (topic === GenerateTopic) {
    const text = await generateText(message.toString("utf8"));
    mqttClient.publish("generate/response", JSON.stringify(text));
  } else if (topic === SummaryTopic) {
    const text = await summariseText(message.toString("utf8"));
    mqttClient.publish("summary/response", JSON.stringify(text));
  } else {
    return;
  }
});
