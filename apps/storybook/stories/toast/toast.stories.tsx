import * as React from "react";
import { ToastProvider, useToast, Button } from "@jobis/ui";

export default {
  title: "Components/Toast",
  parameters: {
    layout: "centered",
  },
};

export const Example = () => {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          payload: {
            type: "message",
            message: "Hello, World!",
          },
        })
      }
    >
      Toast Button
    </Button>
  );
};

export const ToastStory = {
  render: () => (
    <ToastProvider>
      <Example />
    </ToastProvider>
  ),
};
