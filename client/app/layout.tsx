import "./globals.css";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Woxro Restaurant",
  description: "Luxury Sushi Experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.className} bg-[#0b0b0b] text-[#e8e4d9]`}>
        {children}
      </body>
    </html>
  );
}
