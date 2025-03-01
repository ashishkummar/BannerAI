import React, { useEffect } from 'react';

interface BannerCardProps {
  image: string;
  htmlCode: string;
}

const BannerCard: React.FC<BannerCardProps> = ({ image, htmlCode }) => {
  useEffect(() => {
    // Here we inject the HTML into the iframe
    const iframe = document.getElementById("banner-iframe") as HTMLIFrameElement;
    const iframeDoc = iframe.contentWindow?.document;

    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(htmlCode);
      iframeDoc.close();
    }
  }, [htmlCode]);

  return (
    <div>
      <h3>Banner Preview</h3>
      <iframe
        id="banner-iframe"
        width="100%"
        height="700px"
        title="Generated Banner"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default BannerCard;
