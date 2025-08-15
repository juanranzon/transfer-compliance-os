export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-8">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} Transfer Compliance OS. Todos los derechos reservados.
      </div>
    </footer>
  );
}
