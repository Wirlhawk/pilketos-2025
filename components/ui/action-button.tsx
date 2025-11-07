"use client";

import { Loader2 } from "lucide-react";
import React from "react";
import { Button } from "./button";
import { Spinner } from "./spinner";

interface ActionButtonProps
    extends React.ComponentProps<"button">,
        React.PropsWithChildren {
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
                size="sm"
                variant="secondary"
            >
                {isLoading && <Spinner />}
                <span>{isLoading ? loadingText : children}</span>
            </Button>
        );
    }
);

ActionButton.displayName = "ActionButton";
