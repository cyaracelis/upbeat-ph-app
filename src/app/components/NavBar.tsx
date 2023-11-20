import React from 'react';
import Image from 'next/image';
import logo1 from '../../../public/images/dlsu-white.png';
import logo2 from '../../../public/images/altdsi-white.png';

const NavBar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full bg-green-900 text-white">
      <div className="flex justify-between items-center h-18 pl-4">
        <span className="text-2xl font-bold">UPBEAT-PH</span>
        <div className="flex items-center space-x-2 m-2">
          <Image src={logo1} alt="DLSU Logo" width={60} height={60} />
          <Image src={logo2} alt="ALTDSI Logo" width={64} height={64} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
