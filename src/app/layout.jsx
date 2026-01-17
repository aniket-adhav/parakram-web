import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "PARAKRAM 2025 - College Sports Fest",
  description: "Unleash the Warrior Within - College Sports Fest 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
