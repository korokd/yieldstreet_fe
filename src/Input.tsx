import React, { useState, useEffect } from "react";
import styled from "styled-components";

export interface InputConfig {
  type: string;
  options?: string[];
  default?: string;
}

interface InputProps {
  name: string;
  config: InputConfig;
  required: boolean;
  onChange(
    name: string
  ): (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

const TitleSpan = styled.span`
  margin: 1em 0 0.3em;

  &:first-child {
    margin-top: 0.3em;
  }
`;

function Select({ options }: SelectProps) {
  return (
    <select>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: string[];
  default: string;
  required: boolean;
}

const RowLabel = styled(Label)`
  flex-direction: row;
`;

function Radio({ name, options, required, default: def, onChange }: RadioProps) {
  const [selected, setSelected] = useState(def);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
    onChange && onChange(event);
  };

  return (
    <div>
      {options.map((option) => (
        <RowLabel key={option}>
          <input
            type="radio"
            name={name}
            value={option}
            required={required}
            checked={selected === option}
            onChange={onChangeInput}
          />
          <span>{option}</span>
        </RowLabel>
      ))}
    </div>
  );
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options: string[];
}

function Checkbox({ options, onChange }: CheckboxProps) {
  const [selected, setSelected] = useState(new Set());

  useEffect(() => {
    onChange &&
      onChange({
        target: { value: Array.from(selected) },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
  }, [selected]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const _set = new Set(selected);

    if (_set.has(value)) {
      _set.delete(value);
    } else {
      _set.add(value);
    }

    setSelected(_set);
  };

  return (
    <div>
      {options.map((option) => (
        <RowLabel key={option}>
          <input
            type="checkbox"
            value={option}
            defaultChecked={false}
            onChange={onChangeInput}
          />
          <span>{option}</span>
        </RowLabel>
      ))}
    </div>
  );
}

function Input({ name, config, required, onChange }: InputProps) {
  const type = config.type.toLowerCase();
  const options = config.options || [];

  return (
    <Label>
      <TitleSpan>{name}</TitleSpan>
      {type === "radio" ? (
        <Radio
          name={name}
          options={options}
          required={required}
          default={config.default || ""}
          onChange={onChange(name)}
        />
      ) : type === "select" ? (
        <Select
          options={options}
          onChange={onChange(name)}
          required={required}
        />
      ) : type === "checkbox" ? (
        <Checkbox
          options={options}
          onChange={onChange(name)}
          required={required}
        />
      ) : (
        <input
          type={config.type}
          required={required}
          onChange={onChange(name)}
        />
      )}
    </Label>
  );
}

export default Input;
