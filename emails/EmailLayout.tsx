import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";
import { BRAND, HOTEL_NAME, HOTEL_WEBSITE, tailwindConfig } from "./constants";

interface EmailLayoutProps {
  preview: string;
  headline: string;
  children: ReactNode;
}

export function EmailLayout({ preview, headline, children }: EmailLayoutProps) {
  return (
    <Html lang="es">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hiJ-Ek-_EeA.woff2",
            format: "woff2",
          }}
          fontWeight={600}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hiJ-Ek-_EeA.woff2",
            format: "woff2",
          }}
          fontWeight={700}
          fontStyle="normal"
        />
      </Head>
      <Preview>{preview}</Preview>
      <Tailwind config={tailwindConfig}>
        <Body className="bg-brand-surface font-sans m-0 py-8">
          <Container className="mx-auto max-w-[600px] px-4">
            <Section className="bg-brand-dark rounded-t-xl px-8 py-6">
              <Text className="text-brand-primary text-[11px] font-semibold uppercase tracking-[0.2em] m-0 mb-2">
                {HOTEL_NAME}
              </Text>
              <Text className="text-white text-[22px] font-bold leading-tight m-0">
                {headline}
              </Text>
            </Section>
            <Section
              className="bg-white rounded-b-xl px-8 py-8 border border-solid border-[#e5e7eb]"
              style={{ borderTop: `4px solid ${BRAND.primary}` }}
            >
              {children}
            </Section>
            <Section className="text-center mt-6 px-4">
              <Text className="text-brand-muted text-[12px] leading-relaxed m-0">
                © {new Date().getFullYear()} {HOTEL_NAME}
              </Text>
              <Text className="text-brand-muted text-[12px] m-0 mt-1">
                <Link
                  href={HOTEL_WEBSITE}
                  className="text-brand-secondary no-underline"
                >
                  {HOTEL_WEBSITE.replace("https://", "")}
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
