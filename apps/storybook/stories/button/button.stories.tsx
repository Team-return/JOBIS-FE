import { Button } from "@jobis/ui";
import { Meta } from "@storybook/react";

export default {
  title: "Components/Button",
  component: Button,
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
} as Meta<typeof Button>;

export const ButtonStory = {
  args: {
    children: "hello",
    disabled: false,
    isLoading: false,
    variant: "solid",
  },
};

export const LeftIconButtonStory = {
  args: {
    children: "hello",
    disabled: false,
    isLoading: false,
    leftIcon: "✅",
    variant: "solid",
  },
};

export const ReftIconButtonStory = {
  args: {
    children: "hello",
    disabled: false,
    isLoading: false,
    rightIcon: "✅",
    variant: "solid",
  },
};
