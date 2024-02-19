import { Icon as _Icon } from "@jobis/ui";
import { Meta } from "@storybook/react";
import { Icons } from "@jobis/icons";

export default {
  title: "Icon/Icon",
  component: _Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "color",
    },
    icon: {
      options: Object.keys(Icons),
      control: "select",
    },
    size: {
      control: "number",
    },
    direction: {
      options: ["top", "left", "bottom", "right"],
      control: "radio",
    },
  },
} as Meta<typeof _Icon>;

export const IconStory = {
  args: {},
};
