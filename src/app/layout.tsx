import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Link from "next/link";

export default function RootLayout({ children }) {
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
