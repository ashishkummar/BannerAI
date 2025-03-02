import dotenv from 'dotenv';

dotenv.config();

export const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
export const TEXT_MODEL = "mistralai/Mistral-7B-Instruct-v0.3"; // Text model

export const IMAGE_MODELS = [
  "stabilityai/stable-diffusion-xl-base-1.0",
  "stabilityai/stable-diffusion-2-1",
  "nDimensional/NatVis-Natural-Vision-SDXL",
  "martintomov/naturalkata-flux",
  "CompVis/stable-diffusion-v1-4"
];

 