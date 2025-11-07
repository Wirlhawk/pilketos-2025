import { SectionCards } from "@/components/domain/dashboard/section-cards";
import prisma from "@/lib/db/prisma";

const page = async () => {
    const dpt = await prisma.dpt.findMany();

    return (
        <SectionCards/>
    );
};

export default page;