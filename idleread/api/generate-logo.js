import OpenAI from "openai";

// Get the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    // Expect a POST request with JSON { prompt: "..." }
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const { prompt } = req.body;
    if (!prompt) {
      res.status(400).json({ error: "No prompt provided" });
      return;
    }

    // Call OpenAI API to generate an image
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "256x256"
    });

    // The API returns an array of images, we take the first one
    const imageUrl = response.data[0].url;

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
