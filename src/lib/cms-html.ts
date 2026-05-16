/** Strip outer <body>/<html> wrappers from GrapesJS exports before injecting into React layout. */
export function extractBodyContent(html: string): string {
  const trimmed = html.trim();
  if (!trimmed) return '';

  const bodyMatch = trimmed.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) return bodyMatch[1].trim();

  const htmlMatch = trimmed.match(/<html[^>]*>([\s\S]*?)<\/html>/i);
  if (htmlMatch) return extractBodyContent(htmlMatch[1]);

  return trimmed;
}

export function isEmptyCmsHtml(html?: string | null): boolean {
  if (!html?.trim()) return true;
  const inner = extractBodyContent(html);
  return !inner || inner === '<body></body>';
}
