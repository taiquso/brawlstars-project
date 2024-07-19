import "../globals.css";

export const metadata = {
  title: "BrawlGuide - Brawlers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
