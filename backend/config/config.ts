import dotenv from 'dotenv';

dotenv.config();

export const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
export const TEXT_MODEL = "mistralai/Mistral-7B-Instruct-v0.3"; // Text model
export const IMAGE_MODELS = [
  "nDimensional/NatVis-Natural-Vision-SDXL",
  "martintomov/naturalkata-flux",
  "CompVis/stable-diffusion-v1-4"
];
export const IMAGE_MODEL = IMAGE_MODELS[1]; // Default to second model
