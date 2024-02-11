import { RadioGroup, Radio } from "@jobis/ui";
import { Meta } from "@storybook/react";

export default {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      options: ["column", "row"],
      control: { type: 'radio' },
    },
    value: {
      control: "text",
    }
  }
} as Meta<typeof RadioGroup>;

export const RadioGroupStory = {
  args: { 
    value:undefined,
    direction: "column", 
    children: Array(3).fill("_").map((_,idx)=><Radio value={idx.toString()}>홍길동</Radio>)
  }
}