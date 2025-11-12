import { DptStatus } from "@/app/generated/prisma";
import StatisticCard from "@/components/domain/dashboard/statistic-card";

export function SectionCards({
    dptStats,
}: {
    dptStats: {
        status: DptStatus;
        count: number;
    }[];
}) {
    // Hitung total
    const totalDpt = dptStats.reduce((sum, item) => sum + item.count, 0);

    // Sudah memilih
    const dptSudahMemilih =
        dptStats.find((item) => item.status === DptStatus.SUDAH_MEMILIH)?.count ?? 0;

    // Belum memilih
    const dptBelumMemilih = totalDpt - dptSudahMemilih;

    // Persentase
    const percentage =
        totalDpt > 0 ? Math.round((dptSudahMemilih / totalDpt) * 100) : 0;

    // Optional: Persentase belum memilih juga kalau mau badge
    const percentageBelum =
        totalDpt > 0 ? Math.round((dptBelumMemilih / totalDpt) * 100) : 0;

    return (
        <div className="@container/main *:data-[slot=card]:from-primary/10 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-4 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 ">
            {[
                {
                    id: "total-dpt",
                    title: "Total DPT",
                    description: "Total jumlah DPT terdaftar",
                    value: totalDpt.toString(),
                    badgeContent: `All`,
                },
                {
                    id: "dpt-not-voted",
                    title: "DPT Belum Memilih",
                    description: "Jumlah DPT yang belum memilih",
                    value: dptBelumMemilih.toString(),
                    badgeContent: `${percentageBelum}%`,
                },
                {
                    id: "dpt-voted",
                    title: "Total Suara",
                    description: "Total Suara dari DPT",
                    value: dptSudahMemilih.toString(),
                    badgeContent: `${percentage}%`,
                },
                {
                    id: "total-percent",
                    title: "Total Persentase",
                    description: "Total Persentase",
                    value: `${percentage}%`,
                    badgeContent: `${percentage}%`,
                },
            ].map((item) => (
                <StatisticCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    value={item.value}
                    badgeContent={item.badgeContent}
                />
            ))}
        </div>
    );
}
