import axios from "axios";
import { HF_API_KEY, TEXT_MODEL } from "../config/config";
import { SYSTEM_Ptext } from '../ML/spText';

export const generateText = async (prompt: string) => {
  const SYSTEM_PROMPT = SYSTEM_Ptext;

  // Log the final prompt that is going to be sent
 // console.log("Generated Prompt:", `${SYSTEM_PROMPT} User: ${prompt}`);

  try {
    console.log("Making request to Hugging Face API...");

    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${TEXT_MODEL}`,
      { inputs: `${SYSTEM_PROMPT} User: ${prompt}` },
      { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );

  

    if (response.data) {
      console.log("Data received. Extracting generated text...");
      const generatedText = response.data?.[0]?.generated_text || response.data?.generated_text || "";
       
      return generatedText;
    } else {
      console.log("No data received from API.");
      throw new Error("No data received from the API.");
    }

  } catch (error: unknown) {
    // Check if error is an instance of Error
    if (error instanceof Error) {
      console.error("Error while generating text:", error.message);
      throw new Error("Failed to generate text: " + error.message);
    } else {
      console.error("Unknown error occurred during text generation.");
      throw new Error("An unknown error occurred during text generation.");
    }
  }
};
