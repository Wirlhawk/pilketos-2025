// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// export function proxy(req: NextRequest) {
//     const session = req.cookies.get("bilik_session");

//     if (!session && req.nextUrl.pathname.startsWith("/bilik") && !req.nextUrl.pathname.includes("/login")) {
//         return NextResponse.redirect(new URL("/bilik/login", req.url));
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ["/bilik/:path*"],
// };
