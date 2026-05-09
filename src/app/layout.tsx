import { Header } from "@/components/layout/Header";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className="min-h-full flex flex-col max-w-200 mx-auto">
        <Header />
        {children}
      </body>
    </html>
  );
}
