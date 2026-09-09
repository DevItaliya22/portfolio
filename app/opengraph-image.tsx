import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Dev Italiya - Full Stack Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const iconData = await readFile(
    join(process.cwd(), 'public/user-icon.png')
  );
  const iconSrc = `data:image/png;base64,${iconData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: 'linear-gradient(145deg, #0a0a0a 0%, #171717 55%, #262626 100%)',
          color: '#fafafa',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
          }}
        >
          <img
            src={iconSrc}
            width={140}
            height={140}
            style={{
              borderRadius: 9999,
              objectFit: 'cover',
              border: '3px solid #404040',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
              }}
            >
              Dev Italiya
            </div>
            <div
              style={{
                fontSize: 28,
                color: '#a3a3a3',
                letterSpacing: '-0.01em',
              }}
            >
              Full Stack Developer
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 26,
              color: '#d4d4d4',
              maxWidth: 760,
              lineHeight: 1.35,
            }}
          >
            Building web apps and products with React, Next.js, and Node.js.
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#737373',
              whiteSpace: 'nowrap',
            }}
          >
            devitaliya.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
