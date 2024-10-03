import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const AnswerField = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  resize: none;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const CopyButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

type FormProps = {
  fileId?: string;
};

const Form: React.FC<FormProps> = ({ fileId }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnswer = async ({ question, fileId }: { question: string; fileId: string }) => {
    try {
      setAnswer('');
      setLoading(true);
      const response = await fetch(`/api/retrieve-answer`, {
        method: 'POST',
        body: JSON.stringify({ question, fileId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();

      if (res.data?.answer) {
        setAnswer(res.data.answer);
      }
      if (res.error) {
        setError(res.error);
      }
      if (res.status === 'error' && res.message) {
        setError(res.message);
      }
    } catch (err) {
      console.error('Error fetching answer:', err);
      setError('Failed to fetch answer. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!answer) return;

    navigator.clipboard.writeText(answer).then(
      () => {
        alert('Answer copied to clipboard!');
      },
      (err) => {
        console.error('Failed to copy: ', err);
      }
    );
  };

  if (!fileId) {
    return null;
  }

  return (
    <FormContainer>
      <h2>Ask a Question</h2>
      <Input
        type="text"
        placeholder="Enter your question..."
        value={question}
        onChange={(e) => {
          setError(null);
          setQuestion(e.target.value);
        }}
      />
      <Button onClick={() => fetchAnswer({ question, fileId })} disabled={loading}>
        {loading ? 'Loading...' : 'Get Answer'}
      </Button>
      <text> Profile: {fileId}</text>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {answer && (
        <>
          <AnswerField readOnly value={answer} />
          <CopyButton onClick={copyToClipboard}>Copy Answer to Clipboard</CopyButton>
        </>
      )}
    </FormContainer>
  );
};

export default Form;
