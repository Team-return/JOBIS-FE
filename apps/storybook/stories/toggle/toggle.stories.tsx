import { Meta } from "@storybook/react";
import { Toggle as _Toggle } from "@jobis/ui";

export default {
  title: "Components/Toggle",
  component: _Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
    },
  },
} as Meta<typeof _Toggle>;

export const ToggleStory = {
  args: {
    checked: false,
  },
};
