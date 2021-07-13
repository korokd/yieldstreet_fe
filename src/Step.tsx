import React, { useRef } from "react";
import styled from "styled-components";
import Input, { InputConfig } from "./Input";

interface Field {
  name: string;
  config: InputConfig;
  required: boolean;
}

interface StepProps {
  name: string;
  fields: Field[];
  isFirstStep: boolean;
  onChange(name: string, value: string): void;
  onNext(): void;
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
  margin-top: 10px;
`;

function Step({
  name,
  fields,
  isFirstStep,
  onChange,
  onNext,
  onPrevious,
}: StepProps) {
  const formId = `form-${name}`;
  const formRef = useRef<HTMLFormElement>(
    null
  ) as React.MutableRefObject<HTMLFormElement>;

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext();
  };

  const onChangeInput =
    (name: string) =>
    ({
      target: { value },
    }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange(name, value);
    };

  return (
    <>
      <Header>
        <h3>{name}</h3>
      </Header>
      <Form id={formId} ref={formRef} onSubmit={onSubmitForm}>
        {fields.map(({ name, config, required }) => (
          <Input
            key={name}
            name={name}
            config={config}
            required={required}
            onChange={onChangeInput}
          />
        ))}
      </Form>
      <Footer>
        {isFirstStep ? (
          <div></div>
        ) : (
          <button onClick={onPrevious}>Previous</button>
        )}
        <button type="submit" form={formId}>
          Next
        </button>
      </Footer>
    </>
  );
}

export default Step;
