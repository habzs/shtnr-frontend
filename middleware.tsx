import { NextRequest, NextResponse } from "next/server";

async function getFullLink(data = {}) {
  const url = `${process.env.NEXT_PUBLIC_SHTNR_FRONTEND}/full`;
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
  const pathName = req.nextUrl.pathname;
  let parts = pathName.split("/");
  let shortUrl = parts[parts.length - 1];

  let data = await getFullLink({ shtnd_url: shortUrl });

  if (data.error) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.rewrite(url);
  }

  let fullUrl = data.url;
  return NextResponse.redirect(fullUrl);
}

export const config = {
  matcher: "/u/:url*",
};
