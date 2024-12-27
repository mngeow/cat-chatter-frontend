"use client";
import type {TextAreaProps} from "@nextui-org/react";

import React from "react";
import {Button, Tooltip} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import {cn} from "@nextui-org/react";

import PromptInput from "../PromptInput/PromptInput";

export default function Component(
  props: TextAreaProps & {classNames?: Record<"button" | "buttonIcon", string>},
) {
  const [prompt, setPrompt] = React.useState<string>("");

  return (
    <form className="flex w-full items-start gap-2">
      <PromptInput
        {...props}
        classNames={{
          innerWrapper: cn("items-center", props.classNames?.innerWrapper),
          input: cn(
            "text-medium data-[has-start-content=true]:ps-0 data-[has-start-content=true]:pe-0 text-slate-500",
            props.classNames?.input,
          ),
        }}
        endContent={
          <div className="flex gap-2">
            {!prompt && (
              <Tooltip showArrow content="Speak">
                <Button isIconOnly radius="full" variant="light">
                  <Icon className="text-default-500" icon="solar:microphone-3-linear" width={20} />
                </Button>
              </Tooltip>
            )}
            <Tooltip showArrow content="Send message">
              <Button
                isIconOnly
                className={cn(props?.classNames?.button || "",prompt ? "bg-slate-500" : "bg-slate-300")}
                isDisabled={!prompt}
                radius="full"
                variant={!prompt ? "flat" : "solid"}
              >
                <Icon
                  className={cn(
                    "[&>path]:stroke-[2px]",
                    !prompt ? "text-default-500" : "text-primary-foreground",
                    props?.classNames?.buttonIcon || "",
                  )}
                  icon="solar:arrow-up-linear"
                  width={20}
                />
              </Button>
            </Tooltip>
          </div>
        }
        startContent={
          <Tooltip showArrow content="Add file">
            <Button isIconOnly className="p-[10px]" radius="full" variant="light">
              <Icon className="text-default-500" icon="solar:paperclip-linear" width={20} />
            </Button>
          </Tooltip>
        }
        value={prompt}
        onValueChange={setPrompt}
      />
    </form>
  );
}