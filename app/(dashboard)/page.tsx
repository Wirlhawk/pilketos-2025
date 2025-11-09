import { getRecentActivity } from "@/action/activity/get-recent";
import ActivtyList from "@/components/domain/activity/activity-list";
import { SectionCards } from "@/components/domain/dashboard/section-cards";

const page = async () => {
    const [activityList] = await Promise.all([getRecentActivity()]);

    return (
        <div className="space-y-12">
            <SectionCards />

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
