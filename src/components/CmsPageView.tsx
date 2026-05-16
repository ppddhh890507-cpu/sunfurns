type CmsPageViewProps = {
  html: string;
  css?: string;
  className?: string;
};

export default function CmsPageView({ html, css = '', className = 'py-16' }: CmsPageViewProps) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: `<style>${css}</style>${html}`,
      }}
    />
  );
}
