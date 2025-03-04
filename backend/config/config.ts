import dotenv from 'dotenv';

dotenv.config();

export const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
export const FIREBASE_API_KEY = process.env.FIREBAS_EKEY;

 export const TEXT_MODEL = "mistralai/Mistral-7B-Instruct-v0.3"; // Text model

export const IMAGE_MODELS = [
  "stabilityai/stable-diffusion-3.5-large-turbo",
  "stabilityai/stable-diffusion-2-1-unclip",
  "stabilityai/stable-diffusion-3.5-medium",
  "stabilityai/stable-diffusion-2-1-base",
  "stabilityai/stable-diffusion-xl-base-0.9",
  "stabilityai/stable-diffusion-2",
  "stabilityai/stable-diffusion-3-medium",
  "stabilityai/stable-diffusion-3.5-large",
  "stabilityai/stable-diffusion-xl-base-1.0",
  "stabilityai/stable-diffusion-2-1",
  "nDimensional/NatVis-Natural-Vision-SDXL",
  "martintomov/naturalkata-flux",
  "CompVis/stable-diffusion-v1-4"
];

 