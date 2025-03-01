import React, { useState, useEffect } from 'react';
import { createBannerHTML } from '../utils/bannerUtils'; // Import the createBannerHTML function
import { extractBannerData } from '../utils/dataUtils'; // Import the extractBannerData function
import { DEFAULT_PROMPS } from '../ML/prompts'; // Adjust the path based on the actual location
import { TextField, Button, Box, Typography, CircularProgress, Container } from '@mui/material';

const BannerForm = () => {
    const [bannerHTML, setBannerHTML] = useState<string>(''); // State for storing the banner HTML
    const [userPrompt, setUserPrompt] = useState<string>(''); // State to hold user input
    const [loading, setLoading] = useState<boolean>(false); // State for loading indicator
    const [filteredHTML, setFilteredHTML] = useState<string>(''); // State to hold filtered HTML to show in textarea
    const [showFilteredHTML, setShowFilteredHTML] = useState<boolean>(false); // State to control visibility of filtered HTML response

    // Fetch and set a random prompt on component mount
    useEffect(() => {
        const setDefaultPrompt = () => {
            if (DEFAULT_PROMPS && DEFAULT_PROMPS.length > 0) {
                const randomPrompt = DEFAULT_PROMPS[Math.floor(Math.random() * DEFAULT_PROMPS.length)].prompt;
                setUserPrompt(randomPrompt);
            } else {
                setUserPrompt('❌ No prompts found.');
            }
        };
        setDefaultPrompt();
    }, []);

    // Function to handle input change
    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserPrompt(e.target.value);
    };

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Start loading when the user submits the prompt

        try {
            const response = await fetch('http://localhost:5000/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userPrompt }), // Send user input as part of the request body
            });
            const data = await response.json();

            // Extract and filter the banner data using extractBannerData
            const bannerData = extractBannerData(data);

            if (bannerData) {
                const banner = createBannerHTML(bannerData);
                setBannerHTML(banner); // Set the banner HTML to state
                setFilteredHTML(banner); // Update the filtered HTML state
            } else {
                console.error('Invalid or missing banner data.');
                setFilteredHTML('❌ Invalid or missing banner data.');
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setFilteredHTML('❌ Failed to generate banner.');
        } finally {
            setLoading(false); // Stop loading when the request is done
        }
    };

    // Function to toggle visibility of the filtered HTML response
    const toggleFilteredHTML = () => {
        setShowFilteredHTML(prevState => !prevState);
    };

    return (
        <Container>
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                 
            </Box>

            {/* Form layout with TextField and Button */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                    label="Enter prompt here"
                    value={userPrompt}
                    onChange={handlePromptChange}
                    disabled={loading}
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ marginBottom: 2, maxWidth: '600px' }}
                />

              <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                  sx={{ padding: '10px 20px', backgroundColor: '#4CAF50' }}
              >
                  {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Generate Banner'}
              </Button>

            </Box>

            {/* Filtered HTML Section - Conditionally rendered */}
            {bannerHTML && ( // Only show the "Show Filtered HTML" button after the banner is generated
                <Box sx={{ marginTop: 4 }}>
                  {/*
                    <Button
                        variant="outlined"
                        onClick={toggleFilteredHTML}
                        sx={{ marginBottom: 2 }}
                    >
                        {showFilteredHTML ? 'Hide  HTML' : 'Show HTML'}
                    </Button>*/}
                    

                    {showFilteredHTML && (
                        <>
                         
                            <TextField
                                value={filteredHTML}
                                multiline
                                rows={6}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{
                                    marginBottom: 4,
                                    maxWidth: '600px',
                                    backgroundColor: '#f5f5f5',
                                }}
                            />
                        </>
                    )}
                </Box>
            )}

            {/* Displaying the generated banner */}
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Generated Banner:
                </Typography>
                <Box sx={{ border: '1px solid #ccc', padding: 2 }}>
                    <div dangerouslySetInnerHTML={{ __html: bannerHTML }} />
                </Box>
            </Box>
        </Container>
    );
};

export default BannerForm;
