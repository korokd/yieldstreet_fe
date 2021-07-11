import React, { useState, useRef } from "react";
import styled from "styled-components";

interface InputConfig {
  type: string;
  options?: string[];
  default?: string;
}

interface Field {
  name: string;
  config: InputConfig;
  required: boolean;
}

interface FieldResult {
  [name: string]: string;
}

interface StepProps {
  name: string;
  fields: Field[];
  isFirstStep: boolean;
  onNext(result: FieldResult[]): void;
  onPrevious(): void;
}

const Header = styled.header`
  height: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  height: 30px;
`;

function Step({ name, fields, isFirstStep, onNext }: StepProps) {
  const formId = `form-${name}`;
  const formRef = useRef<HTMLFormElement>(
    null
  ) as React.MutableRefObject<HTMLFormElement>;

  const [results, setResults] = useState<FieldResult[]>(
    fields.map(({ name }) => ({ [name]: "" }))
  );

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    onNext(results);
  };

  const onChange =
    (name: string) =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setResults({ ...results, [name]: value });
    };

  return (
    <>
      <Header>
        <h3>{name}</h3>
      </Header>
      <Form id={formId} ref={formRef} onSubmit={onSubmitForm}>
        {fields.map(({ name, config, required }) => (
          <label key={name}>
            <span>{name}</span>
            <input
              type={config.type}
              required={required}
              onChange={onChange(name)}
            />
          </label>
        ))}
      </Form>
      <Footer>
        {isFirstStep ? <div></div> : <button>Previous</button>}
        <button type="submit" form={formId}>
          Next
        </button>
      </Footer>
    </>
  );
}

export default Step;
