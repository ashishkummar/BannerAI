# BannerAI

**BannerAI** is an open-source, AI-powered platform for creating beautiful and optimized banner ads. Whether you're a marketer, designer, or business owner, **BannerAI** allows you to easily design, customize, and download banners for your advertising campaigns.

## Features
- AI-powered banner design
- Easy-to-use interface for creating banners
- Pre-designed templates (coming soon)
- Resizing banners to multiple ad sizes (coming soon)
- Track banner performance (coming soon)
- Export banners in multiple formats (PNG, JPG, SVG, etc.)

## Tech Stack
- **Frontend**: React.js, TypeScript, HTML5, CSS3
- **Backend**: Express.js, Node.js
- **Database**: (coming soon for future user authentication features)
- **AI Models**:
  - Image Models:
    - `nDimensional/NatVis-Natural-Vision-SDXL`
    - `martintomov/naturalkata-flux`
    - `CompVis/stable-diffusion-v1-4`
  - Text Model:
    - `mistralai/Mistral-7B-Instruct-v0.3`
- **Deployment**: Docker (optional for development)

## Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm (Node Package Manager)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bannerai.git

2.  Navigate to the backend folder:
    ```bash 
    cd backend

3. Install dependencies:
      ```bash 
    npm install

4. Start the backend server: 
      ```bash
      npm start

### Frontend Setup

1. Navigate to the frontend folder: cd frontend

2. Install dependencies: npm install

3. Start the frontend development server: npm start

Your application should now be live at http://localhost:3000!

## AI Model Integration

The AI functionality for banner creation and optimization is powered by models hosted on Hugging Face:

### Image Models:
- **nDimensional/NatVis-Natural-Vision-SDXL**: A model focused on creating highly detailed natural images.
- **martintomov/naturalkata-flux**: A model designed for generating stylized images with a fluid motion style.
- **CompVis/stable-diffusion-v1-4**: A popular image generation model for producing realistic images from text prompts.

### Text Model:
- **mistralai/Mistral-7B-Instruct-v0.3**: A text model designed to process and generate instructions based on user input, enabling natural language understanding and banner optimization.


## API Keys
To use the AI models, you will need an API key from Hugging Face. If you'd like to generate your own API key, follow the steps below:

### Steps to get your API key:
 - Visit Hugging Face's website.
 - Sign up or log in to your Hugging Face account.
 - Navigate to your Account Settings.
 - Create a new API token by clicking the New token button.
 - Copy your API key and store it securely.

### Using Your API Key:

Once you have your API key, add it to your environment variables:
 
      UGGING_FACE_API_KEY=your-api-key-here 

## Contributing

We welcome contributions from the community! If you'd like to help improve **BannerAI**, feel free to fork the repository and submit a pull request.

### Steps to Contribute:
1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Make the necessary changes and commit your work.
4. Push your changes to your fork.
5. Open a pull request to the **main** branch.

We recommend writing tests for any new features or bug fixes you add.

### License

This project is licensed under the MIT License .





 

 




 
