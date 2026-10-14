import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Lucas Souza | Frontend Developer",
  description:
    "Frontend developer with 5 years of experience building web applications with React, Next.js and TypeScript. Open to remote roles.",
  authors: [{ name: "Lucas Souza de Oliveira" }],
  openGraph: {
    title: "Lucas Souza | Frontend Developer",
    description: "React, Next.js and TypeScript. AI-assisted development with Claude Code.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

// Restores the saved accent color before paint to avoid a flash.
const accentScript = `try{var c=["#8AAEE8","#7EE0A1","#F2C46D","#C3A6FF","#FF8FA3"],i=+localStorage.getItem("accent");if(i>0&&i<c.length)document.documentElement.style.setProperty("--ac",c[i])}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${mono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: accentScript }} />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
