import { ImageResponse } from "next/og";
import { profile, stats } from "@/content/profile";
import { isLocale, t } from "@/lib/i18n";

export const alt = "David Artagnan — Front-end Lead";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OpenGraphImage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "pt";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8f4ec",
          color: "#2b2622",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#9a3f28",
            }}
          >
            {t(profile.role, locale)}
          </div>
          <div style={{ fontSize: 104, lineHeight: 1, letterSpacing: -3 }}>{profile.name}</div>
          <div style={{ fontSize: 30, color: "#6b6259", maxWidth: 780, lineHeight: 1.35 }}>
            {t(profile.headline, locale)}
          </div>
        </div>

        <div style={{ display: "flex", gap: 64, borderTop: "1px solid #ddd5c8", paddingTop: 28 }}>
          {stats.map((stat) => (
            <div key={stat.value} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 46, lineHeight: 1 }}>{stat.value}</div>
              <div
                style={{
                  fontSize: 17,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#6b6259",
                }}
              >
                {t(stat.label, locale)}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
};

export default OpenGraphImage;
