export default function Footer() {
  return (
    <footer className="bg-teal-800 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-3">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white">
            Library System
          </h2>
          <p className="mt-2 text-sm">
            A simple system to manage books, borrowing, and summaries efficiently.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/all_books" className="hover:text-white">All Books</a></li>
            <li><a href="/add_book" className="hover:text-white">Add Book</a></li>
            <li><a href="/borrowed" className="hover:text-white">Borrow Summary</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-2">Contact</h3>
          <p className="text-sm">Email: support@librarysystem.com</p>
          <p className="text-sm">Location: Bangladesh</p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Library Management System. All rights reserved.
      </div>
    </footer>
  );
}