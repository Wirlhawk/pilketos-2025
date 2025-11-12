import { getRecentActivity } from "@/action/activity/get-recent";
import { getDptStats } from "@/action/dpt/get-stats";
import ActivtyList from "@/components/domain/activity/activity-list";
import { SectionCards } from "@/components/domain/dashboard/section-cards";

const page = async () => {
    const [dptStats,activityList] = await Promise.all([getDptStats(),getRecentActivity()]);
    console.log(dptStats)
    return (
        <div className="space-y-12">
            <SectionCards dptStats={dptStats.success ? dptStats.data : []}/>

            <div className="grid grid-cols-5 gap-6">
                <ActivtyList
                    className="col-span-2 col-start-4"
                    activityList={activityList.success ? activityList.data : []}
                />
            </div>
        </div>
    );
};

export default page;
