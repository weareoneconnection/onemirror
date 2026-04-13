import type { Metadata } from "next";
import "./globals.css";
import { getAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "OneAI Mirror",
  description: "See the world your mind creates.",
  metadataBase: new URL(getAppUrl()),
  openGraph: {
    title: "OneAI Mirror",
    description: "What if the whole world was like you?",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "OneAI Mirror",
    description: "What if the whole world was like you?"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
