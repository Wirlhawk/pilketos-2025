import { getAllDpt } from "@/action/dpt/get-all-dpt";
import { getAllKelas } from "@/action/kelas/get-all-kelas";
import DptTable from "@/components/domain/dpt/dpt-table";
export default async function DptPage() {
    const [dptList, kelasList] = await Promise.all([
        getAllDpt(),
        getAllKelas(),
    ]);

    return (
        <DptTable
            dptList={dptList.success ? dptList.data : []}
            kelasList={kelasList.success ? kelasList.data : []}
        />
    );
}
