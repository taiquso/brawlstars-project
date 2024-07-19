import "./globals.css";

export const metadata = {
  title: "BrawlGuide - Brawl Stars stats",
  description: "Check your brawl stats !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
