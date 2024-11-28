import { pinata } from "@/lib/pinata";
import { NextResponse, NextRequest } from "next/server";

interface FileMetadata {
  name: string;
  size: number;
  type: string;
  url: string;
  cid: string;
}

// New route segment configuration
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
// This replaces the bodyParser config
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const { cid } = await pinata.upload.file(file);
    const url = await pinata.gateways.createSignedURL({
      cid: cid,
      expires: 3600,
    });

    const metadata: FileMetadata = {
      name: file.name,
      size: file.size,
      type: file.type,
      url: url,
      cid: cid
    };

    return NextResponse.json(metadata, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cid = searchParams.get('cid');
    
    if (!cid) {
      return NextResponse.json({ error: "CID is required" }, { status: 400 });
    }

    const url = await pinata.gateways.createSignedURL({
      cid: cid,
      expires: 3600,
    });

    return NextResponse.json({ url }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}