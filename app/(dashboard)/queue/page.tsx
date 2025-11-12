import { getRecentActivity } from "@/action/activity/get-recent";
import { getAllBilik } from "@/action/bilik/get-all";
import { getAllDpt } from "@/action/dpt/get-all";
import { DptStatus } from "@/app/generated/prisma";
import ActivtyList from "@/components/domain/activity/activity-list";
import BilikList from "@/components/domain/queue/bilik-list";
import QueueList from "@/components/domain/queue/queue-list";

export default async function Page() {
    const [dptList, bilikList, activityList] = await Promise.all([
        getAllDpt({ status: DptStatus.DALAM_ANTRIAN }),
        getAllBilik(),
        getRecentActivity(),
    ]);

    return (
        <div className="space-y-12">
            <BilikList bilikList={bilikList.success ? bilikList.data : []} />

            <div className="grid grid-cols-5 gap-6">
                <QueueList
                    dptList={dptList.success ? dptList.data : []}
                    bilikList={bilikList.success ? bilikList.data : []}
                />
                <ActivtyList
                    className="col-span-2"
                    activityList={activityList.success ? activityList.data : []}
                />
            </div>
        </div>
    );
}
