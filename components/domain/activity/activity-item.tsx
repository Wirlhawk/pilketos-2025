"use client";

import { ActivityLog } from "@/app/generated/prisma";
import { Badge } from "@/components/ui/badge";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";
import { activityColorMap, activityIconMap, activityTitleMap } from "@/lib/activity-style";
import { IconClock } from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function ActivityItem({ activityLog }: { activityLog: ActivityLog }) {
    const Icon = activityIconMap[activityLog.type];
    const bg = activityColorMap[activityLog.type];
    const title = activityTitleMap[activityLog.type];

    return (
        <Item variant="outline">
            <ItemMedia variant="icon" className={`${bg} text-white`} >
                <Icon size={18} />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>{title}</ItemTitle>
                <ItemDescription>{activityLog.message}</ItemDescription>
            </ItemContent>
            <ItemActions>
                <Badge variant="outline" className="flex items-center gap-1">
                    <IconClock size={14} />
                    {dayjs(activityLog.createdAt).fromNow()}
                </Badge>
            </ItemActions>
        </Item>
    );
}
