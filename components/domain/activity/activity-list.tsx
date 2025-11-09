"use client";
import { ActivityLog } from "@/app/generated/prisma";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { IconActivity } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { ActivityItem } from "./activity-item";

export default function ActivtyList({
    activityList,
    className,
}: {
    activityList: ActivityLog[];
    className?: string;
}) {
    return (
        <Card className={`h-fit ${className}`}>
            <CardHeader>
                <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
                    Recent Activty
                </CardTitle>
                <CardDescription>Activity Logs</CardDescription>

                <CardAction></CardAction>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activityList.length > 0 ? (
                        <ActivityItemList activityList={activityList} />
                    ) : (
                        <ActivityEmpty />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

function ActivityItemList({ activityList }: { activityList: ActivityLog[] }) {
    return (
        <AnimatePresence initial={true}>
            {activityList.map((activity) => (
                <motion.div
                    key={activity.id}
                    layout
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                >
                    <ActivityItem activityLog={activity} key={activity.id} />
                </motion.div>
            ))}
        </AnimatePresence>
    );
}

function ActivityEmpty() {
    return (
        <Empty className="border border-dashed h-full">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconActivity />
                </EmptyMedia>
                <EmptyTitle>Activity Log Empty</EmptyTitle>
                <EmptyDescription>
                    There is no activity log yet.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
}
