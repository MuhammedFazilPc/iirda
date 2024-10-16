import React from 'react';
import Link from 'next/link';

const PartnerNavbar: React.FC = () => {
  return (
    <nav className="bg-green-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/partner" className="text-white text-2xl font-bold">
          Dashboard
        </Link>
        <div className="space-x-4">
          <Link href="/partner/profile" className="text-white hover:text-green-200">
            Profile
          </Link>
          <Link href="/partner/login" className="text-white hover:text-green-200">
            Login
          </Link>
          {/* <Link href="/partner/registration" className="text-white hover:text-green-200">
            Register
          </Link> */}
          <Link href="/" className="bg-white text-green-600 px-4 py-2 rounded hover:bg-green-100">
            Exit Partner Area
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PartnerNavbar;