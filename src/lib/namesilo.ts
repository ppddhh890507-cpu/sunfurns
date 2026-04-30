// Namesilo DNS API wrapper
// API Docs: https://www.namesilo.com/api-reference

const NAMESILO_API_BASE = 'https://www.namesilo.com/api';

export interface DnsRecord {
  record_id: string;
  type: string;
  host: string;
  value: string;
  distance: string;
  ttl: string;
}

export interface NamesiloResponse {
  response: {
    code: string;
    detail?: string;
  };
}

export class NamesiloClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request(action: string, params: Record<string, string> = {}): Promise<any> {
    const url = new URL(`${NAMESILO_API_BASE}/${action}.xml`);
    url.searchParams.append('version', '1');
    url.searchParams.append('type', 'xml');
    url.searchParams.append('key', this.apiKey);
    
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value);
    }

    const response = await fetch(url.toString());
    const text = await response.text();
    
    // Parse XML response
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    const responseElem = xml.querySelector('response');
    
    if (!responseElem) {
      throw new Error('Invalid Namesilo response');
    }

    const code = responseElem.querySelector('code')?.textContent;
    const detail = responseElem.querySelector('detail')?.textContent;

    if (code !== '300') {
      throw new Error(`Namesilo API error: ${code} - ${detail}`);
    }

    return xml;
  }

  // Get domain information
  async getDomainInfo(domain: string) {
    const xml = await this.request('getDomainInfo', { domain });
    return {
      domain: xml.querySelector('domain')?.textContent,
      created: xml.querySelector('created')?.textContent,
      expires: xml.querySelector('expires')?.textContent,
      status: xml.querySelector('status')?.textContent,
    };
  }

  // List all DNS records for a domain
  async listDnsRecords(domain: string): Promise<DnsRecord[]> {
    const xml = await this.request('listDnsRecords', { domain });
    const records: DnsRecord[] = [];
    
    xml.querySelectorAll('resource_record').forEach((record: Element) => {
      records.push({
        record_id: record.querySelector('record_id')?.textContent || '',
        type: record.querySelector('type')?.textContent || '',
        host: record.querySelector('host')?.textContent || '',
        value: record.querySelector('value')?.textContent || '',
        distance: record.querySelector('distance')?.textContent || '',
        ttl: record.querySelector('ttl')?.textContent || '',
      });
    });
    
    return records;
  }

  // Add a DNS record
  async addDnsRecord(params: {
    domain: string;
    rrtype: string;
    rrhost: string;
    rrvalue: string;
    rrdistance?: string;
    rrttl?: string;
  }): Promise<string> {
    const xml = await this.request('addDnsRecord', {
      domain: params.domain,
      rrtype: params.rrtype,
      rrhost: params.rrhost,
      rrvalue: params.rrvalue,
      rrdistance: params.rrdistance || '10',
      rrttl: params.rrttl || '3600',
    });
    
    return xml.querySelector('record_id')?.textContent || '';
  }

  // Delete a DNS record
  async deleteDnsRecord(domain: string, recordId: string): Promise<boolean> {
    await this.request('deleteDnsRecord', { domain, record_id: recordId });
    return true;
  }

  // List all domains for this account
  async listDomains(): Promise<string[]> {
    const xml = await this.request('domainsList');
    const domains: string[] = [];
    xml.querySelectorAll('domain').forEach((domain: Element) => {
      domains.push(domain.textContent || '');
    });
    return domains;
  }

  // Check if domain is configured correctly
  async checkDomainConfig(domain: string): Promise<{
    configured: boolean;
    currentRecords: DnsRecord[];
    neededRecords: string[];
  }> {
    const records = await this.listDnsRecords(domain);
    const neededRecords: string[] = [];
    
    // Check for A record (for web server)
    const hasA = records.some(r => r.type === 'A' && r.host === '@');
    if (!hasA) {
      neededRecords.push('A record @ pointing to server IP');
    }
    
    // Check for CNAME (for www)
    const hasCname = records.some(r => r.type === 'CNAME' && r.host === 'www');
    if (!hasCname) {
      neededRecords.push('CNAME www pointing to @');
    }

    return {
      configured: neededRecords.length === 0,
      currentRecords: records,
      neededRecords,
    };
  }
}

// Factory function
let client: NamesiloClient | null = null;

export function getNamesiloClient(apiKey?: string): NamesiloClient {
  const key = apiKey || process.env.NAMESILO_API_KEY;
  if (!key) {
    throw new Error('Namesilo API key is required');
  }
  if (!client || (apiKey && client['apiKey'] !== key)) {
    client = new NamesiloClient(key);
  }
  return client;
}

// Helper to format DNS records for display
export function formatDnsRecords(records: DnsRecord[]): string {
  if (records.length === 0) return 'No records found';
  
  const lines = ['Current DNS Records:', ...records.map(r => 
    `  ${r.type.padEnd(6)} ${r.host.padEnd(30)} -> ${r.value}`
  )];
  
  return lines.join('\n');
}