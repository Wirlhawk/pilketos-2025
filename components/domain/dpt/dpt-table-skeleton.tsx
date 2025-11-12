import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function DptTableSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-10 w-[180px]" />
            <DataTableSkeleton
                columnCount={5}
                shrinkZero
            />
        </div>
    );
}