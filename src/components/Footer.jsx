import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Beneficiary App</h3>
            <p className="text-green-100">Simplifying beneficiary management for a better tomorrow.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/AdminLogin" className="hover:text-green-200 transition-colors">
                  Admin
                </Link>
              </li>
              <li>
                <Link to="/department" className="hover:text-green-200 transition-colors">
                  Department
                </Link>
              </li>
              <li>
                <Link to="/form" className="hover:text-green-200 transition-colors">
                  User Form
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-green-100">Email: info@beneficiaryapp.com</p>
            <p className="text-green-100">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-500 text-center text-green-100">
          <p>&copy; {new Date().getFullYear()} Beneficiary App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;