import { Router } from "express";
import { generateText } from "../controllers/textGenerationController";
import { generateImage } from "../controllers/imageGenerationController";

const router = Router();

// Text Generation Route
router.post("/generate", async (req, res) => {
  const { prompt } = req.body;
 

  try {
 

    const generatedText = await generateText(prompt);
 

    res.json({ html_code: generatedText });
  } catch (error: unknown) {
    // Check if error is an instance of Error
    if (error instanceof Error) {
      console.error("Error during text generation:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error("Unknown error occurred during text generation.");
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

// Image Generation Route
router.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;
 

  try {
  
    const generatedImage = await generateImage(prompt);
 

    res.json({ image: `data:image/png;base64,${generatedImage}` });
  } catch (error: unknown) {
    // Check if error is an instance of Error
    if (error instanceof Error) {
      console.error("Error during image generation:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error("Unknown error occurred during image generation.");
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

export default router;
