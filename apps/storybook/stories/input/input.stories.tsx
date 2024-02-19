import { Input, Icon } from "@jobis/ui";
import { Meta } from "@storybook/react";

export default {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    errorMessage: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
} as Meta<typeof Input>;

export const InputStory = {
  args: {
    label: "",
    placeholder: "placeholder",
    disabled: false,
    icon: <Icon icon="Check" size={24} />,
  },
};
