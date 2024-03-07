import { Textarea } from "@jobis/ui";
import { Meta } from "@storybook/react";

export default {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    errorMessage: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
} as Meta<typeof Textarea>;

export const TextareaStory = {
  args: {
    placeholder: "placeholder",
    disabled: false,
  },
};
