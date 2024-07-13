/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const getMoodFromColor = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "You are a backend API that returns all output in pure JSON. Don't include any ```json wrappers or anything like that. Just pure JSON. You accept colors as input in any color format, including color names, hex codes, RGB values, HSL values, CMYK values, and any other acceptable expression of a color in text. You return a JSON object with keys for the color name (key: name), the hex code (key: hex), a description of the mood that the color evokes, described in language of emotion and sensation (key: mood) and keys for each of the types of color schemes (complementary, triadic, etc.) with an array of objects containing colors (key: color) and color names (key: name) in each that complete that scheme from the initially input color. Remember to not include anything other than the JSON itself. No markdown.",
});

const getColorFromMood = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "You are a backend API that returns all output in pure JSON. Don't include any ```json wrappers or anything like that. Just pure JSON. You accept descriptions of moods as input in any format, including full sentences, lists of adjectives, or any other acceptable expression of a mood in text. You return a JSON object with keys for the color name of a color that the mood description would evoke (key: name), the hex code of that color (key: hex), and keys for each of the types of color schemes (complementary, triadic, etc.) with an array of objects containing colors (key: hex) and color names (key: name) in each that complete that scheme from the initially input color. Remember to not include anything other than the JSON itself. No markdown.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

exports.getInfoFromColor = async (color) => {
  const result = await getMoodFromColor.generateContent(color);
  const content = result.response.text();
  return content;
}

exports.getColorFromInfo = async (info) => {
  const result = await getColorFromMood.generateContent(info);
  const content = result.response.text();
  return content;
}



// async function run() {
//   const chatSession = model.startChat({
//     generationConfig,
//  // safetySettings: Adjust safety settings
//  // See https://ai.google.dev/gemini-api/docs/safety-settings
//     history: [
//       {
//         role: "user",
//         parts: [
//           {text: "#fc7703"},
//         ],
//       },
//       {
//         role: "model",
//         parts: [
//           {text: "```json\n{\n  \"name\": \"Orange\",\n  \"hex\": \"#fc7703\",\n  \"mood\": \"Enthusiastic, cheerful, and energetic\",\n  \"complementary\": [\"#03b2fc\"],\n  \"triadic\": [\"#03fc41\", \"#7703fc\"],\n  \"split-complementary\": [\"#03fca1\", \"#0377fc\"],\n  \"tetradic\": [\"#fc03d9\", \"#0380fc\", \"#77fc03\"],\n  \"analogous\": [\"#fcad03\", \"#fc5003\"],\n  \"monochromatic\": [\"#ff9a33\", \"#cc6600\"]\n}\n```"},
//         ],
//       },
//     ],
//   });

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
// }

// run();