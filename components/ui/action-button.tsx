"use client";

import { Loader2 } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "./button";
import { Spinner } from "./spinner";
import { VariantProps } from "class-variance-authority";

interface ActionButtonProps
    extends React.ComponentProps<"button">,
        React.PropsWithChildren,
        VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
    loadingText?: string;
}

export const ActionButton = React.forwardRef<
    HTMLButtonElement,
    ActionButtonProps
>(
    (
        { isLoading = false, loadingText = "Loading", children, ...props },
        ref
    ) => {
        return (
            <Button
                ref={ref}
                disabled={isLoading}
                {...props}
            >
                {isLoading && <Spinner />}
                {isLoading ? loadingText : children}
            </Button>
        );
    }
);

ActionButton.displayName = "ActionButton";
