import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Step from "./Step";
import Summary from "./Summary";

interface OverlayProps {
  visible: boolean;
}

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  display: ${({ visible }: OverlayProps) => (visible ? "initial" : "none")};
  height: 100vh;
  position: absolute;
  width: 100vw;
`;

const Container = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  left: 50%;
  max-width: 500px;
  padding: 0 20px 20px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
`;

const steps = [
  {
    name: "Identity",
    fields: [
      {
        name: "Name",
        config: { type: "text" },
        required: false,
      },
      {
        name: "Email",
        config: { type: "email" },
        required: false,
      },
    ],
  },
  {
    name: "Details",
    fields: [
      {
        name: "Age",
        config: {
          type: "select",
          options: ["13-18", "19-24", "24-35", "35-59", "60+"],
          get default() {
            return this.options[0];
          },
        },
        required: true,
      },
      {
        name: "Gender",
        config: {
          type: "radio",
          options: ["Male", "Female", "Non-binary"],
        },
        required: true,
      },
    ],
  },
  {
    name: "Favorites",
    fields: [
      {
        name: "Favorite Book",
        config: { type: "text" },
        required: true,
      },
      {
        name: "Favorite Colors",
        config: {
          type: "checkbox",
          options: [
            "Red",
            "Blue",
            "Green",
            "Magenta",
            "Cyan",
            "Yellow",
            "White",
            "Black",
          ],
        },
        required: true,
      },
    ],
  },
];

function getDefault(config: any) {
  const fallback = ["checkbox", "select"].includes(config.type.toLowerCase())
    ? []
    : "";

  return config.default || fallback;
}

function makeSummary(steps: any[]) {
  return steps.reduce(
    (acc, { name, fields }) => ({
      ...acc,
      [name]: fields.reduce(
        (acc: any, { name, config }: any) => ({
          ...acc,
          [name]: getDefault(config),
        }),
        {}
      ),
    }),
    {}
  );
}

function App() {
  const delay = 2000;
  const [isVisible, setVisible] = useState(false);

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = steps[activeStepIndex];

  const [summary, setSummary] = useState(makeSummary(steps));
  const onChange = (stepName: string) => (name: string, value: string) =>
    setSummary({
      ...summary,
      [stepName]: { ...(summary as any)[stepName], [name]: value },
    });
  const onNext = () => setActiveStepIndex(activeStepIndex + 1);
  const onPrevious = () => setActiveStepIndex(activeStepIndex - 1);
  const onSubmit = () => {
    setActiveStepIndex(0);
    setVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, delay);
  }, []);

  return (
    <Overlay visible={isVisible}>
      <Container>
        {activeStepIndex < steps.length ? (
          <Step
            name={activeStep.name}
            fields={activeStep.fields}
            isFirstStep={activeStepIndex === 0}
            onChange={onChange(activeStep.name)}
            onNext={onNext}
            onPrevious={onPrevious}
          />
        ) : (
          <Summary
            summary={summary}
            onSubmit={onSubmit}
            onPrevious={onPrevious}
          />
        )}
      </Container>
    </Overlay>
  );
}

export default App;
