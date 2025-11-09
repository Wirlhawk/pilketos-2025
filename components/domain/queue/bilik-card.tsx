"use client";
import { exitBilik } from "@/action/bilik/exit";
import { Bilik, Dpt, Kelas } from "@/app/generated/prisma";
import { useClientAction } from "@/hooks/use-client-action";
import { IconCircleFilled, IconUser, IconXboxX } from "@tabler/icons-react";
import { UserX } from "lucide-react";
import { ActionButton } from "../../ui/action-button";
import { Badge } from "../../ui/badge";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../ui/card";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "../../ui/item";

export default function BilikCard({
    bilik,
}: {
    bilik: Bilik & { currentDpt: (Dpt & { kelas: Kelas }) | null };
}) {
    const isInUse = bilik.currentDptId !== null;
    const { run: runExitBilik, loading } = useClientAction(exitBilik, {
        successMessage: "DPT exit Bilik Successfully!",
        errorMessage: "Failed to exit Bilik",
    });

    return (
        <Card
            className={`@container/car to-card dark:bg-card bg-linear-to-t shadow-xs border-2 ${
                isInUse
                    ? "dark:from-green-500/15 from-green-500/15 "
                    : "dark:from-muted-foreground/15 from-muted-foreground-15 "
            }`}
        >
            <CardHeader>
                <CardDescription>Status</CardDescription>
                <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
                    {bilik.name}
                </CardTitle>
                <CardAction>
                    <BilikBadge isInUse={isInUse} />
                </CardAction>
            </CardHeader>
            <CardContent>
                <BilikItem isInUse={isInUse} bilik={bilik} />
            </CardContent>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <CardAction className="w-full">
                    <ActionButton
                        size="sm"
                        variant="outline"
                        className="w-full"
                        loadingText="Removing..."
                        disabled={!isInUse || loading}
                        isLoading={loading}
                        onClick={() =>
                            runExitBilik({
                                currentDptId: bilik.currentDptId!,
                                bilikId: bilik.id,
                            })
                        }
                    >
                        <UserX size={8} /> Remove
                    </ActionButton>
                </CardAction>
            </CardFooter>
        </Card>
    );
}

function BilikBadge({ isInUse }: { isInUse: boolean }) {
    return isInUse ? (
        <Badge variant={"outline"}>
            <IconCircleFilled className="fill-green-500" />
            In Use
        </Badge>
    ) : (
        <Badge variant={"outline"}>
            <IconCircleFilled className="fill-muted-foreground" />
            Empty
        </Badge>
    );
}

function BilikItem({
    isInUse,
    bilik,
}: {
    isInUse: boolean;
    bilik: Bilik & { currentDpt: (Dpt & { kelas: Kelas }) | null };
}) {
    return isInUse && bilik.currentDpt ? (
        <Item variant="outline" className="dark:bg-white/10 bg-white/90">
            <ItemMedia variant="icon">
                <IconUser />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>{bilik.currentDpt.name} </ItemTitle>
                <ItemDescription>{bilik.currentDpt.kelas.name}</ItemDescription>
            </ItemContent>
        </Item>
    ) : (
        <Item variant="outline" className="dark:bg-white/10 bg-white/90">
            <ItemMedia variant="icon">
                <IconXboxX />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>Empty </ItemTitle>
                <ItemDescription>No DPT</ItemDescription>
            </ItemContent>
        </Item>
    );
}
