/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";

/**
 * Server action return type
 */
export type ActionResult<T = undefined> =
    | { success: true; data: T }
    | { success: false; error: { message: string } };

/**
 * useClientAction hook
 */
export function useClientAction<TArgs extends any[], TReturn>(
    action: (...args: TArgs) => Promise<ActionResult<TReturn>>,
    options?: {
        successMessage?: string;
        errorMessage?: string;
        onSuccess?: (data: TReturn) => void;
        onError?: (error: { message: string }) => void;
    }
) {
    const [loading, setLoading] = useState(false);

    const run = async (...args: TArgs): Promise<ActionResult<TReturn>> => {
        setLoading(true);

        try {
            const res = await action(...args);

            if (!res.success) {
                const errorMessage =
                    res.error?.message || options?.errorMessage || "Error";
                toast.error(errorMessage);
                options?.onError?.(res.error!);
                return res;
            }

            if (options?.successMessage) {
                toast.success(options.successMessage);
            }

            options?.onSuccess?.(res.data as TReturn);
            return res;
        } catch (err: any) {
            const message = err?.message ?? "Unexpected error";

            toast.error(message);
            options?.onError?.({ message });

            return { success: false, error: { message } };
        } finally {
            setLoading(false);
        }
    };

    return { run, loading };
}
""
