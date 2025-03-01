import axios from 'axios';

export const huggingFaceRequest = async (model: string, prompt: string, isImage: boolean) => {
  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": isImage ? "application/json" : undefined,
        },
        responseType: isImage ? "arraybuffer" : undefined,
      }
    );

    if (isImage) {
      return Buffer.from(response.data, "binary").toString("base64");
    }
    return response.data?.[0]?.generated_text || response.data?.generated_text || "";
  } catch (error: unknown) {
    // Check if error is an instance of Error
    if (error instanceof Error) {
      throw new Error("HuggingFace Request Failed: " + error.message);
    } else {
      throw new Error("HuggingFace Request Failed: Unknown error");
    }
  }
};
