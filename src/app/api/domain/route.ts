import { NextRequest, NextResponse } from 'next/server';
import { NamesiloClient } from '@/lib/namesilo';

export async function GET(req: NextRequest) {
  try {
    const apiKey = req.headers.get('x-namesilo-key');
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'API key required' }, { status: 401 });
    }

    const client = new NamesiloClient(apiKey);
    const domains = await client.listDomains();

    return NextResponse.json({ success: true, data: { domains } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}