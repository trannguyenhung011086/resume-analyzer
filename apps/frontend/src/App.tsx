import React, { useState } from 'react';
import ProfileList, { ProfileListItem } from './components/ProfileList';
import PDFViewer from './components/PDFViewer';
import Form from './components/Form';
import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const LeftSide = styled.div`
  flex: 3 1 70%; /* Takes up 60% of the available space */
  min-width: 700px;
`;

const RightSide = styled.div`
  flex: 1 1 30%; /* Takes up 40% of the available space */
  min-width: 500px;
`;

const PDFViewerContainer = styled.div`
  margin-top: 20px;
`;

const App: React.FC = () => {
  const [selectedPdf, setSelectedPdf] = useState<ProfileListItem | null>(null);

  const handleSelectPdf = (pdf: ProfileListItem) => {
    setSelectedPdf(pdf);
  };

  return (
    <AppContainer>
      <Header>Profile List and PDF Viewer</Header>
      <MainContent>
        <LeftSide>
          <ProfileList onSelect={handleSelectPdf} />
          <PDFViewerContainer>
            <PDFViewer pdfUrl={selectedPdf?.url} />
          </PDFViewerContainer>
        </LeftSide>
        <RightSide>
          <Form fileId={selectedPdf?.id} />
        </RightSide>
      </MainContent>
    </AppContainer>
  );
};

export default App;
