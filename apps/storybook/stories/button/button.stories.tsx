import { Button as _Button } from "@jobis/ui";
import { Meta } from "@storybook/react";

export default {
  title: "Components/Button",
  component: _Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    variant: {
      options: ["solid", "outline"],
      control: "radio",
    },
    isLoading: {
      control: "boolean",
    },
  },
} as Meta<typeof _Button>;

export const ButtonStory = {
  args: { children: "hello", disabled: false, isLoading: false },
};

export const LeftIconButtonStory = {
  args: {
    children: "hello",
    disabled: false,
    isLoading: false,
    leftIcon: "✅",
  },
};

export const ReftIconButtonStory = {
  args: {
    children: "hello",
    disabled: false,
    isLoading: false,
    rightIcon: "✅",
  },
};
