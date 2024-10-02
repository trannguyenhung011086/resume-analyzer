export type AnswerRecord = {
  input: string;
  chat_history: unknown[];
  context: {
    pageContent: string;
    metadata: unknown;
  }[];
  answer: string;
};

const mockedAnswerRecord: AnswerRecord = {
  input: 'What is a notable skill for this resume?',
  chat_history: [],
  context: [
    {
      pageContent:
        '•\nCoordinated  between  clients  and  developers,  ensuring  project  requirements  were  clearly \nunderstood and communicated.\n\n•\nExecuted  manual  testing  for  browser-based  games,  ensuring  smooth  gameplay  and \nresolving user-reported issues.\n\nEDUCATION \nUniversity of Pedagogy, Ho Chi Minh City, Vietnam, 2005 – 2009\n\n•\nMajor: English Translation & Interpretation\n\n•\nAverage Score: 7.45/10\n\nCERTIFICATES \nTOEIC Certificate, February 2011\n\n•\nScore: 975/990 (Listening: 495, Reading: 480)',
      metadata: {
        source: '/Users/hungtran/Documents/Learning/resume-analyzer/apps/backend/dist/assets/Hung - resume.pdf',
        pdf: {
          version: '1.10.100',
          info: {
            PDFFormatVersion: '1.3',
            IsAcroFormPresent: false,
            IsXFAPresent: false,
            Title: 'Hung - resume',
            Creator: 'Pages',
            Producer: 'macOS Version 15.0 (Build 24A335) Quartz PDFContext',
            CreationDate: "D:20240927024918Z00'00'",
            ModDate: "D:20240927024918Z00'00'",
          },
          metadata: null,
          totalPages: 3,
        },
        loc: {
          pageNumber: 3,
          lines: {
            from: 23,
            to: 44,
          },
        },
      },
    },
  ],
  answer:
    'A notable skill for this resume would be the ability to coordinate between clients and developers, ensuring project requirements are clearly understood and communicated. This highlights strong communication and project management skills.',
};

export const getMockedAnswerRecord = (record?: Partial<AnswerRecord>) => {
  return { ...mockedAnswerRecord, ...(record || {}) };
};
