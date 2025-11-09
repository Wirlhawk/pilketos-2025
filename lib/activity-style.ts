/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivityType } from "@/app/generated/prisma";
import {
    IconArrowLeft,
    IconArrowRight,
    IconCheck,
    IconClock,
    IconInfoCircle,
    IconUserMinus
} from "@tabler/icons-react";


export const activityIconMap: Record<ActivityType, any> = {
    ADD_QUEUE: IconClock,
    REMOVE_QUEUE: IconUserMinus,
    ENTER_BILIK: IconArrowRight,
    REMOVE_BILIK: IconArrowLeft,
    COMPLETE_VOTE: IconCheck,
    SYSTEM: IconInfoCircle,
};

export const activityColorMap: Record<ActivityType, string> = {
    ADD_QUEUE: "dark:bg-purple-700/90 bg-red-500",
    REMOVE_QUEUE: "dark:bg-red-700/90 bg-red-500",
    ENTER_BILIK: "dark:bg-blue-700/90 bg-blue-500",
    REMOVE_BILIK: "dark:bg-red-700/90 bg-red-500",
    COMPLETE_VOTE: "dark:bg-green-700/90 bg-green-500",
    SYSTEM: "dark:bg-yellow-700/90 bg-yellow-500",
};

export const activityTitleMap: Record<ActivityType, string> = {
    ADD_QUEUE: "Added into Queue",
    REMOVE_QUEUE: "Removed from Queue",
    ENTER_BILIK: "Entered Bilik",
    REMOVE_BILIK: "Removed from Bilik",
    COMPLETE_VOTE: "Completed Vote",
    SYSTEM: "System Activity",
};

