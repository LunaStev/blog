import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Link from "next/link";

export const metadata = {
  title: "LunaStev’s Dev Blog",
  description: "컴파일러, 운영체제, 시스템 프로그래밍 블로그",
  keywords: ["컴파일러", "시스템 프로그래밍", "OS", "Rust", "Wave", "언어 설계"],
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "LunaStev’s Dev Blog",
    siteName: "LunaStev Dev Blog",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* ----- NAVBAR ----- */}
        <nav className="navbar shadow-sm mb-4 blog-navbar">
          <div className="container">
            <Link href="/" className="navbar-brand blog-title">
              LunaStev Blog
            </Link>

            <div>
              <Link href="/" className="nav-link d-inline-block mx-2">Home</Link>
              <Link href="/about" className="nav-link d-inline-block mx-2">About</Link>
              <Link href="/posts" className="nav-link d-inline-block mx-2">Posts</Link>
              <Link href="https://github.com/LunaStev" className="nav-link d-inline-block mx-2">GitHub</Link>
              <Link href="https://discord.gg/3nev5nHqq9" className="nav-link d-inline-block mx-2">Discord</Link>
              <Link href="mailto:luna@lunastev.org" className="nav-link d-inline-block mx-2">Email</Link>
            </div>
          </div>
        </nav>

        {/* ----- CONTENT WRAPPER ----- */}
        <main className="container mb-5">
          <div className="content-wrapper">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
