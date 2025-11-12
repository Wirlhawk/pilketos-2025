import { Suspense } from "react";
import { getAllDpt } from "@/action/dpt/get-all";
import { getDptStats } from "@/action/dpt/get-stats";
import { getAllKelas } from "@/action/kelas/get-all";
import DptStats from "@/components/domain/dpt/dpt-stats";
import DptTable from "@/components/domain/dpt/dpt-table";
import DptTableSkeleton from "@/components/domain/dpt/dpt-table-skeleton";

export default async function DptPage() {
    const [dptList, kelasList, dptStats] = await Promise.all([
        getAllDpt({}),
        getAllKelas(),
        getDptStats(),
    ]);

    return (
        <div className="space-y-8">
            <DptStats dptStats={dptStats.success ? dptStats.data : []} />
            <Suspense fallback={<DptTableSkeleton />}>
                <DptTable
                    dptList={dptList.success ? dptList.data : []}
                    kelasList={kelasList.success ? kelasList.data : []}
                />
            </Suspense>
        </div>
    );
}
