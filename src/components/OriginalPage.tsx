import { useEffect, useRef, useState } from 'react';

interface OriginalPageProps {
  src: string;
  title: string;
}

export default function OriginalPage({ src, title }: OriginalPageProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(800);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'resize' && event.data?.height) {
        setHeight(event.data.height + 20);
      }
    };
    window.addEventListener('message', handleMessage);

    // Also poll for height changes
    const interval = setInterval(() => {
      try {
        const iframe = iframeRef.current;
        if (iframe?.contentDocument?.body) {
          const h = iframe.contentDocument.body.scrollHeight;
          if (h > 100) setHeight(h + 20);
        }
      } catch {
        // cross-origin, ignore
      }
    }, 500);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(interval);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      className="w-full border-0"
      style={{ height: `${height}px`, minHeight: '600px' }}
      onLoad={() => {
        try {
          const iframe = iframeRef.current;
          if (iframe?.contentDocument?.body) {
            setHeight(iframe.contentDocument.body.scrollHeight + 20);
          }
        } catch {
          // cross-origin
        }
      }}
    />
  );
}
