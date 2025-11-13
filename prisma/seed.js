// import XLSX from "xlsx";
// import { PrismaClient } from "../app/generated/prisma/index.js";
// const prisma = new PrismaClient();

// async function main() {
//     const workbook = XLSX.readFile("./seeds.xlsx");

//     // Seed Kelas
//     const kelasSheet = workbook.Sheets["kelas"];
//     const kelasData = XLSX.utils.sheet_to_json(kelasSheet);
//     await prisma.kelas.createMany({ data: kelasData });
//     console.log("Kelas seeded successfully!");

//     // Seed Dpt
//     const dptSheet = workbook.Sheets["dpt"];
//     const dptData = XLSX.utils.sheet_to_json(dptSheet);
//     await prisma.dpt.createMany({
//         data: dptData.map((dpt) => ({
//             name: dpt.name,
//             id: parseInt(dpt.id),
//             kelasId: parseInt(dpt.kelasId),
//         })),
//     });
//     console.log("Dpt seeded successfully!");

//     // Seed Paslon
//     const paslonSheet = workbook.Sheets["paslon"];
//     const paslonData = XLSX.utils.sheet_to_json(paslonSheet);
//     await prisma.paslon.createMany({ data: paslonData });
//     console.log("Paslon seeded successfully!");

//     // Seed Bilik
//     const bilikSheet = workbook.Sheets["bilik"];
//     const bilikData = XLSX.utils.sheet_to_json(bilikSheet);
//     await prisma.bilik.createMany({ data: bilikData });
//     console.log("Bilik seeded successfully!");

//     const key = "teamleaderbeban";
//     await prisma.status_Pemilihan.create({
//         data: {
//             authorization_key: key,
//         },
//     });
// }

// main()
//     .catch((e) => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });


import XLSX from "xlsx";
import { PrismaClient } from "../app/generated/prisma/index.js";

const prisma = new PrismaClient();

// Helper → convert all numeric strings to real numbers (or BigInt)
function normalize(obj) {
    const result = {};
    for (const key in obj) {
        const val = obj[key];

        // BigInt field → detect with suffix "Id" referencing BigInt or "id" on BigInt models
        if (key === "id" && typeof val === "string" && /^\d+$/.test(val)) {
            result[key] = BigInt(val); // for Dpt BigInt id
        } else if (key.toLowerCase().includes("dpt") && /^\d+$/.test(val)) {
            result[key] = BigInt(val); // DPT relations
        } else if (typeof val === "string" && /^\d+$/.test(val)) {
            result[key] = Number(val); // normal int
        } else {
            result[key] = val;
        }
    }
    return result;
}

async function main() {
    const workbook = XLSX.readFile("./seeds.xlsx");

    // ===========================
    //  ✔ SEED KELAS
    // ===========================
    const kelasSheet = workbook.Sheets["kelas"];
    const kelasData = XLSX.utils.sheet_to_json(kelasSheet);

    await prisma.kelas.createMany({
        data: kelasData.map((k) => ({
            id: Number(k.id),
            name: k.name,
        })),
    });

    console.log("Kelas seeded successfully!");

    // ===========================
    //  ✔ SEED DPT (BigInt ID)
    // ===========================
    const dptSheet = workbook.Sheets["dpt"];
    const dptData = XLSX.utils.sheet_to_json(dptSheet);

    await prisma.dpt.createMany({
        data: dptData.map((d) => ({
            id: BigInt(d.id),
            name: d.name,
            status: d.status || "BELUM_MEMILIH",
            kelasId: Number(d.kelasId),
        })),
    });

    console.log("Dpt seeded successfully!");

    // ===========================
    //  ✔ SEED PASLON
    // ===========================
    const paslonSheet = workbook.Sheets["paslon"];
    const paslonData = XLSX.utils.sheet_to_json(paslonSheet);

    await prisma.paslon.createMany({
        data: paslonData.map((p) => ({
            id: Number(p.id),
            image: p.image,
            ketos: p.ketos,
            waketos: p.waketos,
        })),
    });

    console.log("Paslon seeded successfully!");

    // ===========================
    //  ✔ SEED BILIK
    // ===========================
    const bilikSheet = workbook.Sheets["bilik"];
    const bilikData = XLSX.utils.sheet_to_json(bilikSheet);

    await prisma.bilik.createMany({
        data: bilikData.map((b) => ({
            id: Number(b.id),
            name: b.name,
            currentDptId: b.currentDptId ? BigInt(b.currentDptId) : null,
        })),
    });

    console.log("Bilik seeded successfully!");

    // ===========================
    //  ✔ CREATE STATUS_PEMILIHAN (singleton row)
    // ===========================
    const key = "teamleaderbeban";

    await prisma.status_Pemilihan.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            authorization_key: key,
        },
    });

    console.log("Status_Pemilihan seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
