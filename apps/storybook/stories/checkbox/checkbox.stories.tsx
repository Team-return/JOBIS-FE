import { Checkbox as _Checkbox } from "@jobis/ui";
import { Meta } from "@storybook/react";

export default {
  title: "Components/Checkbox",
  component: _Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} as Meta<typeof _Checkbox>;

export const CheckboxStory = {
  args: { children: "hello", checked: false },
};
