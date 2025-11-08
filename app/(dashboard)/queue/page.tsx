import { getAllBilik } from "@/action/bilik/get-all-bilik";
import { getAllDpt } from "@/action/dpt/get-all-dpt";
import { DptStatus } from "@/app/generated/prisma";
import ActivtyList from "@/components/domain/queue/activty-list";
import BilikList from "@/components/domain/queue/bilik-list";
import QueueList from "@/components/domain/queue/queue-list";

export default async function Page() {
    const [dptList, bilikList] = await Promise.all([
        getAllDpt({ status: DptStatus.DALAM_ANTRIAN }),
        getAllBilik(),
    ]);

    return (
        <div className="space-y-12">
            <BilikList bilikList={bilikList.success ? bilikList.data : []} />

            <div className="grid grid-cols-5 gap-6">
                <QueueList
                    dptList={dptList.success ? dptList.data : []}
                    bilikList={bilikList.success ? bilikList.data : []}
                />
                <ActivtyList />
            </div>
        </div>
    );
}
