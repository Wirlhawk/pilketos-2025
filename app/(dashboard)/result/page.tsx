import { getPerolehanResults } from "@/action/perolehan/get-results";
import { getSystemStatus } from "@/action/system/get-status";
import LockedView from "@/components/domain/result/locked-view";
import { PaslonResultChart } from "@/components/domain/result/paslon-result-chart";
import PaslonResultList from "@/components/domain/result/paslon-result-list";

export default async function ResultPage() {
    const [results, systemStatus] = await Promise.all([
        getPerolehanResults(),
        getSystemStatus(),
    ]);

    if (!systemStatus.success) {
        return;
    }

    return (
        <div className="space-y-8 flex flex-col flex-1">
            {systemStatus.data?.done ? (
                <>
                    <PaslonResultList
                        results={results.success ? results.data : []}
                    />
                    <PaslonResultChart
                        results={results.success ? results.data : []}
                    />
                </>
            ) : (
                <LockedView />
            )}
        </div>
    );
}
