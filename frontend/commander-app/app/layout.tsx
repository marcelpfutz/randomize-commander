import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";  
import { HeroUIProvider } from "@heroui/react"; 
import { ThemeProvider as NextThemesProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Commander Generator",
  description: "Gerador de comandantes aleatórios para Magic: The Gathering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <HeroUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </NextThemesProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
