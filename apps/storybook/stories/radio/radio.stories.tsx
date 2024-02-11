import { Radio } from "@jobis/ui";
import { Meta } from "@storybook/react";

export default {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
    },
  }
} as Meta<typeof Radio>;

export const RadioStory = {
  args: { checked: false, children: "홍길동" }
}