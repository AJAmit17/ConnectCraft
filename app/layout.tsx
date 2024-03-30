import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import "../Styles/prism.css";
import { ThemeProvider } from "@/providers/themeProvider";
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from "@/providers/toastProvider";

const mulish = Mulish({
  style: 'normal',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "ConnectCraft",
  description: "A Web App for CSE-DS Students",
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
        <body className={`${mulish.className}`}>
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
