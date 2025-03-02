import { Router, Request, Response } from "express";
import { generateText } from "../controllers/textGenerationController";
import { generateImage } from "../controllers/imageGenerationController";
import {IMAGE_MODELS} from "../config/config"
const router = Router();
 
export let selectedModel = IMAGE_MODELS[0];

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

// get model from user

router.get("/models", (req, res) => {
   const models =  IMAGE_MODELS
   res.json({ models, selectedModel: IMAGE_MODELS[0] }); // Send current model
});


// Set selected model
// Route to set the model
//@ts-ignore
router.post("/set-model", (req: Request, res: Response) => {
  const { model } = req.body as { model?: string }; // Ensure correct body type

  if (!model) {
    return res.status(400).json({ error: "Model name is required" });
  }

  if (!IMAGE_MODELS.includes(model)) {
    return res.status(400).json({ error: "Invalid model name." });
  }
  
  selectedModel = model; // Update the global model


   console.log(`Model changed to: ${model}`);

  return res.json({ message: `Model set to ${model}` });
});

export default router;
