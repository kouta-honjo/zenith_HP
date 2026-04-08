import { useEffect, useRef, useState } from 'react';

interface OriginalPageProps {
  src: string;
  title: string;
}

export default function OriginalPage({ src, title }: OriginalPageProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(800);
  const stableCount = useRef(0);
  const lastHeight = useRef(0);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'resize' && event.data?.height) {
        setHeight(event.data.height + 20);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const measureHeight = () => {
    try {
      const iframe = iframeRef.current;
      if (iframe?.contentDocument?.body) {
        const h = iframe.contentDocument.body.scrollHeight;
        if (h > 100) {
          setHeight(h + 20);
          // Stop polling once height is stable for 3 checks
          if (Math.abs(h - lastHeight.current) < 5) {
            stableCount.current++;
          } else {
            stableCount.current = 0;
          }
          lastHeight.current = h;
        }
      }
    } catch {
      // cross-origin
    }
  };

  useEffect(() => {
    // Poll until stable, then stop
    const interval = setInterval(() => {
      if (stableCount.current >= 3) {
        clearInterval(interval);
        return;
      }
      measureHeight();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      className="w-full border-0"
      style={{ height: `${height}px`, minHeight: '400px' }}
      onLoad={measureHeight}
    />
  );
}
