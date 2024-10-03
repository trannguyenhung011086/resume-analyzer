import path from 'path';

type DocumentRecord = {
  id: string;
  url: string;
};

// For demo purpose, use an in-memory object to store documents instead of querying a database
const documentFixtures: DocumentRecord[] = [
  {
    id: 'Hung - resume.pdf',
    url: path.join(__dirname, '../assets/Hung - resume.pdf'),
  },
];

export const documentRepo = () => {
  return {
    getAll: async () => {
      return documentFixtures;
    },

    getById: async (documentId: string): Promise<DocumentRecord | undefined> => {
      return documentFixtures.find((doc) => doc.id === documentId);
    },
  };
};
