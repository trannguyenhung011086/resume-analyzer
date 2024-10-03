import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface PDFViewerProps {
  pdfUrl?: string | null;
}

const ViewerContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px; /* Fixed height for the viewer container */
`;

const Embed = styled.embed`
  width: 100%;
  height: 100%; /* Ensures that the embedded PDF takes up the full container */
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Full height to keep the loading message centered */
  font-size: 20px;
  color: #555;
`;

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pdfUrl) {
      setLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [pdfUrl]);

  if (!pdfUrl) {
    return null;
  }

  return (
    <ViewerContainer>
      {loading ? <LoadingMessage>Loading PDF...</LoadingMessage> : <Embed src={pdfUrl} type="application/pdf" />}
    </ViewerContainer>
  );
};

export default PDFViewer;
