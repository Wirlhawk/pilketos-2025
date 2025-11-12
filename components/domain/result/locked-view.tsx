import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { IconLock } from "@tabler/icons-react";

export default function LockedView() {
    return (
        <Empty className="my-auto border bg-muted/30">
            <EmptyHeader>
                <EmptyMedia variant="icon"  >
                    <IconLock  />
                </EmptyMedia>
                <EmptyTitle>Access Restricted</EmptyTitle>
                <EmptyDescription>
                    Pemilihan sedang berlangsung. Halaman ini tidak dapat
                    diakses saat ini.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
}
