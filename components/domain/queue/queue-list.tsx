/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { enterBilik } from "@/action/bilik/enter";
import { removeQueue } from "@/action/dpt/remove-queue";
import { Bilik, Dpt, Kelas } from "@/app/generated/prisma";
import { ActionButton } from "@/components/ui/action-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemSeparator,
    ItemTitle,
} from "@/components/ui/item";
import { useClientAction } from "@/hooks/use-client-action";
import { IconUsersGroup } from "@tabler/icons-react";
import { ChevronDownIcon, UserPlus, UserX } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function QueueList({
    dptList,
    bilikList,
}: {
    dptList: (Dpt & { kelas: Kelas })[];
    bilikList: (Bilik & { currentDpt: (Dpt & { kelas: Kelas }) | null })[];
}) {
    const filteredDptList = dptList.filter(
        (dpt) => !bilikList.some((bilik) => bilik.currentDptId === dpt.id)
    );

    return (
        <Card className="col-span-3 h-fit">
            <CardHeader>
                <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
                    Queue List
                </CardTitle>
                <CardDescription>Bilik Management</CardDescription>

                <CardAction>
                    <Badge variant={"outline"}>
                        <IconUsersGroup />
                        {filteredDptList.length || 0} DPT
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div>
                    {filteredDptList.length > 0 ? (
                        <DptItemList
                            bilikList={bilikList}
                            dptList={filteredDptList}
                        />
                    ) : (
                        <DptItemEmpty />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

function DptItemEmpty() {
    return (
        <Empty className="border border-dashed">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconUsersGroup />
                </EmptyMedia>
                <EmptyTitle>Queue Empty</EmptyTitle>
                <EmptyDescription>
                    Start adding DPT into queue in DPT page
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button variant="outline" size="sm" asChild>
                    <Link href="/dpt">Add Queue</Link>
                </Button>
            </EmptyContent>
        </Empty>
    );
}

function DptItemList({
    dptList,
    bilikList,
}: {
    dptList: (Dpt & { kelas: Kelas })[];
    bilikList: (Bilik & { currentDpt: (Dpt & { kelas: Kelas }) | null })[];
}) {
    return (
        <AnimatePresence initial={true}>
            {dptList.map((d, index) => (
                <motion.div
                    key={d.id}
                    layout
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 12 }} 
                    transition={{ duration: 0.18, ease: "easeOut" }}
                >
                    <DptItem
                        dptId={d.id}
                        name={d.name}
                        kelas={d.kelas.name}
                        number={index + 1}
                        bilikList={bilikList}
                    />

                    {index !== dptList.length - 1 && <ItemSeparator />}
                </motion.div>
            ))}
        </AnimatePresence>
    );
}

function DptItem({
    dptId,
    number,
    name,
    kelas,
    bilikList,
}: {
    dptId: bigint;
    number: number;
    name: string;
    kelas: string;
    bilikList: (Bilik & { currentDpt: (Dpt & { kelas: Kelas }) | null })[];
}) {
    const { run: runRemoveQueue, loading } = useClientAction(removeQueue, {
        successMessage: "DPT removed from Queue Successfully!",
        errorMessage: "Failed to remove Dpt from Queue",
    });

    return (
        <Item className="muted">
            <ItemMedia variant="icon">{number}</ItemMedia>
            <ItemContent>
                <ItemTitle>{name}</ItemTitle>
                <ItemDescription>{kelas}</ItemDescription>
            </ItemContent>
            <ItemActions>
                <ButtonGroup>
                    {bilikList.map((bilik) => {
                        const isInUse = bilik.currentDptId != null;
                        const { run: runEnterBilik, loading } = useClientAction(
                            enterBilik,
                            {
                                successMessage:
                                    "DPT entered Bilik Successfully!",
                                errorMessage: "Failed to enter Bilik",
                            }
                        );

                        return (
                            <ActionButton
                                key={bilik.id}
                                variant={"outline"}
                                size="sm"
                                disabled={isInUse || loading}
                                isLoading={loading}
                                loadingText={`${bilik.id}`}
                                onClick={() => {
                                    runEnterBilik({
                                        currentDptId: dptId,
                                        bilikId: bilik.id,
                                    });
                                }}
                            >
                                <UserPlus className="mr-1 h-4 w-4" />
                                {bilik.id}
                            </ActionButton>
                        );
                    })}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="pl-2"
                            >
                                <ChevronDownIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="[--radius:1rem]"
                        >
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild variant="destructive">
                                    <ActionButton
                                        className="bg-none"
                                        variant={"ghost"}
                                        loadingText="Removing..."
                                        disabled={loading}
                                        isLoading={loading}
                                        onClick={() =>
                                            runRemoveQueue({
                                                id: dptId,
                                            })
                                        }
                                    >
                                        <UserX className="mr-2 h-4 w-4" />
                                        Remove from Queue
                                    </ActionButton>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ButtonGroup>
            </ItemActions>
        </Item>
    );
}

