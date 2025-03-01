interface BannerResponse {
    html_code: string;
}

export function extractBannerData(data: BannerResponse): any | null {
    if (data.html_code) {
        // Look for the 'User:' keyword in the HTML code
        const userPromptIndex = data.html_code.indexOf("User:");
        if (userPromptIndex !== -1) {
            const extractedText = data.html_code.slice(userPromptIndex);
            
            // First check if we have <json></json> tags
            let jsonMatch = extractedText.match(/<json>([\s\S]*?)<\/json>/);
            if (!jsonMatch) {
                // If no <json> tags, check for a code block with JSON (```json {...} ```)
                jsonMatch = extractedText.match(/```json([\s\S]*?)```/);
            }

            if (jsonMatch) {
                const jsonString = jsonMatch[1].trim();
                console.log("Extracted JSON:", jsonString);

                try {
                    let bannerData = JSON.parse(jsonString);
                    return bannerData;
                } catch (jsonError) {
                    console.error("JSON Parse Error:", jsonError);
                    return null;
                }
            } else {
                console.error("No JSON found in the extracted text.");
                return null;
            }
        } else {
            console.error("'User:' keyword not found in html_code.");
            return null;
        }
    } else {
        console.error("html_code not found.");
        return null;
    }
}
