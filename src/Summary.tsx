import React from "react";
import styled from "styled-components";

export interface Summary {
  [name: string]: { [name: string]: string | string[] };
}

interface SummaryProps {
  summary: Summary;
  onSubmit(): void;
  onPrevious(): void;
}

const Header = styled.header`
  height: 30px;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  height: 30px;
  margin-top: 10px;
`;

const Table = styled.table`
  border-collapse: collapse;
`;

const Td = styled.td`
  border: 1px solid darkgrey;
  padding: 3px 5px;

  @media (min-width: 768px) {
    padding: 5px 10px;
  }
`;

function summaryToArray(summary: Summary) {
  return Object.entries(summary).map(([step, fields]) => ({
    step,
    fields: Object.entries(fields).map(([question, answer]) => ({
      question,
      answer,
    })),
  }));
}

function SummaryC({ summary, onSubmit, onPrevious }: SummaryProps) {
  const summaryAsArray = summaryToArray(summary);

  return (
    <>
      <Header>
        <h3>Summary</h3>
      </Header>
      <Table>
        <thead>
          <tr>
            <Td>Step</Td>
            <Td>Question</Td>
            <Td>Answer</Td>
          </tr>
        </thead>
        <tbody>
          {summaryAsArray.map(({ step, fields }) =>
            fields.map(({ question, answer }, index) => (
              <tr key={step + index}>
                {index === 0 ? <Td rowSpan={fields.length}>{step}</Td> : null}
                <Td>{question}</Td>
                <Td>{Array.isArray(answer) ? answer.join(", ") : answer}</Td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Footer>
        <button onClick={onPrevious}>Previous</button>
        <button onClick={onSubmit}>Submit</button>
      </Footer>
    </>
  );
}

export default SummaryC;
