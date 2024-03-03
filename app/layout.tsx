import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "../Styles/prism.css";
import { ThemeProvider } from "@/providers/themeProvider";
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from "@/providers/toastProvider";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const sg = Space_Grotesk({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-sg'
})

export const metadata: Metadata = {
  title: "ConnectCraft",
  description: "A App for CSE-DS Students",
  icons: {
    icon: "https://cdn-icons-png.flaticon.com/128/11738/11738792.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'primary-gradient',
          footerActionLink: 'primary-text-gradient hover:text-primary-500'
        }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${sg.variable}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
