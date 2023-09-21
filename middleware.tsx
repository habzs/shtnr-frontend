import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./services/api/shtnr";

async function getFullLink(data = {}) {
  const url = `${process.env.NEXT_PUBLIC_SHTNR_BACKEND}/full`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json(); // parses JSON response into native JavaScript objects
  // const json = await response.text(); // parses JSON response into native JavaScript objects

  return json;
}

export async function middleware(req: NextRequest) {
  // get current path name

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const userToken = req.cookies.get("auth")?.value;
    if (!userToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return;
  }

  if (req.nextUrl.pathname !== "/") {
    const pathName = req.nextUrl.pathname;
    let parts = pathName.split("/");
    let shortUrl = parts[parts.length - 1];

    let data = await getFullLink({ shtnd_url: shortUrl });

    if (data.error) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    let fullUrl = data.url;
    return NextResponse.redirect(fullUrl);
  }
}

export const config = {
  // matcher: "/u/:url*",
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sw.js|shtnr-logo.svg|signup|login|logout).*)",
  ],
};
