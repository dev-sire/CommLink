import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Modals } from "@/components/modals";
import { Toaster } from "@/components/ui/sonner";
import { JotaiProvider } from "@/components/jotai-provider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL("https://commlink-devsire.vercel.app"),
  title: "CommLink: Your Team's Central Hub",
  description: "CommLink is a powerful team communication platform that brings your team together in one place. With features like real-time messaging, file sharing, and task management, CommLink streamlines collaboration and boosts productivity.",
  openGraph: {
    title: "CommLink: Your Team's Central Hub",
    description: "CommLink is a powerful team communication platform that brings your team together in one place. With features like real-time messaging, file sharing, and task management, CommLink streamlines collaboration and boosts productivity",
    url: "https://commlink-devsire.vercel.app",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body
          className={inter.className}
        >
          <ConvexClientProvider>
            <JotaiProvider>
              <Toaster />
              <Modals />
              {children}
            </JotaiProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
