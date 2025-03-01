interface BannerData {
    size: string;
    backgroundColor: string;
    text: {
        color: string;
        fontWeight: string;
        text: string;
    };
    cta: {
        color: string;
        text: string;
    };
    imageUrl: string;
}

export function createBannerHTML(bannerData: BannerData): string {
    return `
        <div style="
            width: ${bannerData.size.split('x')[0]}px; 
            height: ${bannerData.size.split('x')[1]}px; 
            background-color: ${bannerData.backgroundColor}; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            justify-content: space-around; 
            padding: 10px;
            border-radius: 8px;
            text-align: center;
            font-family: Arial, sans-serif;
            overflow: hidden;
            border: 1px solid gray;
        ">
            <img src="${bannerData.imageUrl}" alt="Banner Image" 
                style="
                    width: 100%; 
                    max-height: 50%; 
                    object-fit: cover; 
                    border-radius: 6px;
                ">
            <span style="
                color: ${bannerData.text.color}; 
                font-weight: ${bannerData.text.fontWeight}; 
                font-size: 22px;
                margin: 10px 0;
            ">
                ${bannerData.text.text}
            </span>
            <button style="
                background-color: ${bannerData.cta.color}; 
                color: #000000; 
                padding: 12px 18px; 
                border: 1px solid gray; 
                border-radius: 6px; 
                cursor: pointer; 
                font-size: 16px;
            ">
                ${bannerData.cta.text}
            </button>
        </div>
    `;
}

 