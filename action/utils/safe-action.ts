/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

export type NormalizedResult<T = undefined> =
    | { success: true; data: T }
    | { success: false; error: { message: string } };

export function safeAction<Args extends any[], Return = undefined>(
    fn: (...args: Args) => Promise<Return>
): (...args: Args) => Promise<NormalizedResult<Return>> {
    return async (...args: Args): Promise<NormalizedResult<Return>> => {
        try {
            const data = await fn(...args);
            return { success: true, data };
        } catch (err: any) {
            return {
                success: false,
                error: { message: err?.message ?? "Unexpected error" }
            };
        }
    };
}


