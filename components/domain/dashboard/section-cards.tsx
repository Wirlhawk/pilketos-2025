import StatisticCard from "@/components/domain/dashboard/statistic-card";

export function SectionCards() {
    return (
        <div className="@container/main *:data-[slot=card]:from-primary/10 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-4 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 ">
            {[
                {
                    id: "total-dpt",
                    title: "Total DPT",
                    description: "Total jumlah DPT terdaftar",
                    value: "500",
                    badgeContent: "50%",
                },
                {
                    id: "dpt-not-voted",
                    title: "DPT Belum Memilih",
                    description: "Jumlah DPT yang belum memilih",
                    value: "250",
                    badgeContent: "50%",
                },
                {
                    id: "dpt-voted",
                    title: "DPT Memilih",
                    description: "Total jumlah DPT terdaftar",
                    value: "250",
                    badgeContent: "30%",
                },
                {
                    id: "total-percent",
                    title: "Total Persentase",
                    description: "Total Persentase",
                    value: "87%",
                    badgeContent: "50%",
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
