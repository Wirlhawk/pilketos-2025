/* eslint-disable react/no-children-prop */
"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Bilik } from "@/app/generated/prisma";

import { bilikLogin } from "@/action/bilik/login";

const formSchema = z.object({
    id: z.number().min(1, "Silahkan pilih bilik"),
});

export function BilikLoginForm({ bilikList }: { bilikList: Bilik[] }) {

    const form = useForm({
        defaultValues: {
            id: 0,
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const result = await bilikLogin({ id: value.id });

            if (!result.success) {
                toast.error(result.error?.message ?? "Error login bilik");
                return;
            }

            toast.success("Login bilik berhasil!");
        },
    });

    return (
        <Card className="w-full sm:max-w-md z-10 neo">
            <CardHeader>
                <CardTitle>Login Bilik</CardTitle>
                <CardDescription>
                    Silahkan pilih nomor bilik sesuai dengan tempat nya.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id="bilik-login-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field
                            name="id"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field
                                        orientation="responsive"
                                        data-invalid={isInvalid}
                                    >
                                        <FieldContent>
                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </FieldContent>

                                        <Select
                                            name={field.name}
                                            value={String(field.state.value)}
                                            onValueChange={(value) =>
                                                field.handleChange(
                                                    Number(value)
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                id="bilik-login-select"
                                                aria-invalid={isInvalid}
                                                className="min-w-[120px]"
                                            >
                                                <SelectValue placeholder="Pilih bilik" />
                                            </SelectTrigger>

                                            <SelectContent position="item-aligned">
                                                {bilikList.map((bilik) => (
                                                    <SelectItem
                                                        key={bilik.id}
                                                        value={String(bilik.id)}
                                                    >
                                                        {bilik.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                );
                            }}
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter>
                <Field orientation="horizontal">
                    <Button type="submit" form="bilik-login-form">
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}
