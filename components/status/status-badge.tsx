import { DptStatus } from "@/app/generated/prisma";
import { Badge } from "@/components/ui/badge";
import {
    IconCircleCheckFilled,
    IconRefresh,
    IconXboxXFilled,
} from "@tabler/icons-react";

export default function StatusBadge({ status }: { status: DptStatus }) {
    const mapping: Record<
        DptStatus,
        {
            icon: React.ReactNode;
            bg: string;
            text: string;
            darkBg: string;
            label: string;
        }
    > = {
        BELUM_MEMILIH: {
            icon: <IconXboxXFilled className="w-4 h-4 fill-red-500" />,
            bg: "bg-red-900",
            text: "text-white",
            darkBg: "dark:bg-yellow-600",
            label: "Belum Memilih",
        },
        DALAM_ANTRIAN: {
            icon: (
                <IconCircleCheckFilled className="w-4 h-4 text-yellow-500 " />
            ),
            bg: "bg-orange-500",
            text: "text-white",
            darkBg: "dark:bg-orange-600",
            label: "Dalam Antrian",
        },
        DALAM_BILIK: {
            icon: <IconRefresh className="w-4 h-4 fill text-blue-500" />,
            bg: "bg-blue-500",
            text: "text-white",
            darkBg: "dark:bg-blue-600",
            label: "Dalam Bilik",
        },
        SUDAH_MEMILIH: {
            icon: <IconCircleCheckFilled className="w-4 h-4 fill-green-500 " />,
            bg: "bg-green-500",
            text: "text-white",
            darkBg: "dark:bg-green-600",
            label: "Sudah Memilih",
        },
    };

    const { icon, label } = mapping[status];

    return (
        <Badge variant="outline" className={`text-muted-foreground px-1.5 `}>
            {icon}
            {label}
        </Badge>
    );
}
