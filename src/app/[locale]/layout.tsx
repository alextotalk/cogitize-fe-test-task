import { locales, routing } from "@/i18n";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Geist, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import { AppLayout } from "../layouts";
import { ReduxProvider } from "../providers";
import "../styles/globals.css";

const INTER = Inter({
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-inter",
  subsets: ["cyrillic-ext", "latin-ext"],
});

// Geist is the design's typeface (Figma). Variable font → all weights, incl. ExtraBold (800).
// Inter stays as the Cyrillic fallback (Geist has no Cyrillic subset).
const GEIST = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${GEIST.variable} ${INTER.variable} font-sans flex min-h-screen flex-col`}
      >
        <NextIntlClientProvider>
          <ReduxProvider>
            <AppLayout>{children}</AppLayout>
            <Toaster />
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
