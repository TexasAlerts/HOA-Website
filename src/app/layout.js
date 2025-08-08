import './globals.css';

export const metadata = {
  title: 'Doug Charles for Windsong Ranch HOA Board',
  description: 'Transparency. Stewardship. Listening. Vote Doug Charles.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white shadow sticky top-0 z-20">
          <nav className="max-w-5xl mx-auto flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <img src="/wsr-logo.png" alt="WSR Logo" className="h-10" />
              <span className="font-bold">Windsong Ranch</span>
            </div>
            <ul className="hidden sm:flex gap-6 text-sm">
              <li><a href="/">Home</a></li>
              <li><a href="/endorsements">Endorsements</a></li>
              <li><a href="/voting">Voting Info</a></li>
            </ul>
          </nav>
        </header>
        <main className="max-w-5xl mx-auto p-4">{children}</main>
        <footer className="max-w-5xl mx-auto p-6 text-sm text-center text-slate-600">
          © {new Date().getFullYear()} Doug Charles Campaign — dbcharles@me.com
        </footer>
      </body>
    </html>
  );
}