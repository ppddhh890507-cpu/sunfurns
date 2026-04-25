import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">SUNFURNS</h3>
            <p className="text-gray-400 text-sm">
              Professional sofa manufacturer specializing in B2B furniture solutions. 
              Factory direct pricing with OEM/ODM capabilities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/products" className="hover:text-white">Products</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/products" className="hover:text-white">Fabric Sofas</Link></li>
              <li><Link href="/products" className="hover:text-white">Leather Sofas</Link></li>
              <li><Link href="/products" className="hover:text-white">Modular Sofas</Link></li>
              <li><Link href="/products" className="hover:text-white">Office Furniture</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@sunfurns.com</li>
              <li>WhatsApp: +86 138 0013 8000</li>
              <li>WeChat: sunfurns</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sunfurns. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
