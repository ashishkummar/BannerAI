import axios from "axios";
import { HF_API_KEY, IMAGE_MODEL } from "../config/config";
// @ts-ignore
import { SYSTEM_Pimage } from "../ML/spImage";

export const generateImage = async (prompt: string) => {
  const SYSTEM_IMG = SYSTEM_Pimage;
  const finalPrompt = `${SYSTEM_IMG} ${prompt}`;
  
  // Log the final prompt before making the request
 
  try {
 

    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${IMAGE_MODEL}`,
      { inputs: finalPrompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );
 
    
    // Check if the response contains data
    if (response.data) {
      console.log("Data received. Converting to Base64...");
      const imageBase64 = Buffer.from(response.data, "binary").toString("base64");
      console.log("Base64 image generated.");
      return imageBase64;
    } else {
      console.log("No data received from API.");
      throw new Error("No data received from the API.");
    }

  } catch (error: unknown) {
    // Type the error as an instance of Error
    if (error instanceof Error) {
      console.error("Error while generating image:", error.message);
      throw new Error("Failed to generate image: " + error.message);
    } else {
      console.error("Unknown error occurred while generating image.");
      throw new Error("Unknown error occurred while generating image.");
    }
  }
};
