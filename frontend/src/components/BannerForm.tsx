import React, { useState, useEffect } from 'react';
import CloudSyncIcon from '@mui/icons-material/CloudSync';

import { createBannerHTML } from '../utils/bannerUtils';
import { extractBannerData } from '../utils/dataUtils';
import { DEFAULT_PROMPS } from '../ML/prompts';
import {ModelSelector} from "./Autocomplete"
import { TextField, Button, Box, Typography, CircularProgress, Container, FormGroup, FormControlLabel, Switch } from '@mui/material';

const BannerForm = () => {
    const [bannerHTML, setBannerHTML] = useState<string>('');
    const [userPrompt, setUserPrompt] = useState<string>('');
    const [fullPrompt, setFullPrompt] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [bannerData, setBannerData] = useState<any>(null); // Store extracted banner data
    const [generatedImage, setGeneratedImage] = useState<string>('');
    const [showFilteredHTML, setShowFilteredHTML] = useState<boolean>(false);
    const [generateImage, setGenerateImage] = useState<boolean>(true); // State for Switch (OFF by default)

    //

    const [selectedModel, setSelectedModel] = useState<string>('');
    const [modelList, setModelList] = useState<string[]>([]);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/models');
                const data = await response.json();
                setModelList(data.models);
                setSelectedModel(data.selectedModel);
            } catch (error) {
                console.error('Error fetching model list:', error);
            }
        };
        fetchModels();
    }, []);

    const handleModelChange = async (newModel: string) => {
        setSelectedModel(newModel);
    
        try {
            await fetch('http://localhost:5000/api/set-model', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: newModel }),
            });
        } catch (error) {
            console.error('Error updating model:', error);
        }
    };
    



    useEffect(() => {
        const setDefaultPrompt = () => {
            if (DEFAULT_PROMPS && DEFAULT_PROMPS.length > 0) {
                const randomPrompt = DEFAULT_PROMPS[Math.floor(Math.random() * DEFAULT_PROMPS.length)].prompt;
                setFullPrompt(randomPrompt);
            } else {
                setFullPrompt("❌ No prompts found.");
            }
        };
        setDefaultPrompt();
    }, []);

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserPrompt(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Fetch banner HTML
            const response = await fetch('http://localhost:5000/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userPrompt }),
            });
            const data = await response.json();

            const extractedBannerData = extractBannerData(data);
            if (extractedBannerData) {
                setBannerData(extractedBannerData);
                setBannerHTML(createBannerHTML(extractedBannerData));
            } else {
                console.error('Invalid or missing banner data.');
                setBannerHTML('❌ Invalid or missing banner data.');
            }

            // Fetch image only if the switch is turned ON
            if (generateImage) {
                const imageResponse = await fetch('http://localhost:5000/api/generate-image', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: userPrompt }),
                });
                const imageData = await imageResponse.json();

                if (imageData && imageData.image) {
                    setGeneratedImage(imageData.image);
                } else {
                    console.error('No image data received.');
                }
            } else {
                setGeneratedImage(''); // Clear the image if switch is OFF
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setBannerHTML('❌ Failed to generate banner.');
        } finally {
            setLoading(false);
        }
    };

    // Update bannerData.imageUrl when generatedImage is available
    useEffect(() => {
        if (generateImage && generatedImage && bannerData) {
            const updatedBannerData = { ...bannerData, imageUrl: generatedImage };
            setBannerHTML(createBannerHTML(updatedBannerData));
        }
    }, [generatedImage]);


    useEffect(() => {
        if (!fullPrompt) return;
    
        let index = 0;
        setUserPrompt(""); // Clear before typing starts
    
        const interval = setInterval(() => {
            setUserPrompt((prev) => fullPrompt.slice(0, index + 1)); // Update directly with slice
            index++;
    
            if (index >= fullPrompt.length) {
                clearInterval(interval);
            }
        }, 10); // Adjust speed
    
        return () => clearInterval(interval);
    }, [fullPrompt]);
    
 

    return (
        <Container>
            {/* Switch to enable/disable AI Image Generation */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2, marginBottom: 10 }}>
                {/* Left - Model Selector */}
                
                 
                <ModelSelector sx={{ marginRight: 3 }} onModelChange={handleModelChange} />

                {/* Right - Switch Toggle */}
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Switch
                        checked={generateImage}
                        onChange={(e) => setGenerateImage(e.target.checked)}
                        />
                    }
                    label="✨ AI Generated Image"
                    />
                </FormGroup>
                </Box>


            {/* Prompt Input Field */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <Box sx={{ marginBottom: 2, width: '800px' }}>
                <TextField
                    label="Enter prompt here"
                    value={userPrompt}
                    onChange={handlePromptChange}
                    disabled={loading}
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ marginBottom: 2, width: '100%' }}
                /> 
                <Typography
                    sx={{ textAlign: 'right', marginTop: '-10px', fontSize: '1rem', cursor: 'pointer' }}
                   
                >
                  <CloudSyncIcon fontSize="small" color="primary"
                    onClick={() => {
                        if (DEFAULT_PROMPS && DEFAULT_PROMPS.length > 0) {
                            const randomPrompt = DEFAULT_PROMPS[Math.floor(Math.random() * DEFAULT_PROMPS.length)].prompt;
                            setFullPrompt(randomPrompt);
                        }
                    }}
                  />;
                </Typography>



                


                 </Box>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{ padding: '10px 20px', backgroundColor: '#4CAF50' }}
                >
                    {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Generate Banner'}
                </Button>
            </Box>

            {/* Render Banner */}
            {bannerHTML && (
                <Box sx={{ marginTop: 4 }}>
                    {showFilteredHTML && (
                        <TextField
                            value={bannerHTML}
                            multiline
                            rows={6}
                            fullWidth
                            variant="outlined"
                            InputProps={{ readOnly: true }}
                            sx={{ marginBottom: 4, maxWidth: '600px', backgroundColor: '#f5f5f5' }}
                        />
                    )}
                </Box>
            )}

            <Box sx={{ display: 'flex', 
                justifyContent: 'center', 
                marginBottom: 4 ,
                 opacity: generateImage ? (generatedImage ? 1 : 0) : 1, // Control opacity based on conditions
                 transition: 'opacity 0.5s ease-in-out', // Smooth transition effect
                
                }}>
                <Box sx={{ border: '0px solid #ccc', padding: 2 }}>
                    <div dangerouslySetInnerHTML={{ __html: bannerHTML }} />
                </Box>
            </Box>

            {/* Display Generated Image Only if Switch is ON */}
            {generateImage && generatedImage && (
                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Generated Image:
                    </Typography>
                    <Box sx={{ border: '1px solid #ccc', padding: 2, textAlign: 'center' }}>
                        <img src={generatedImage} alt="Generated Banner" style={{ maxWidth: '100%' }} />
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default BannerForm;