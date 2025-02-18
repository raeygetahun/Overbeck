import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const session = useSession();
  const initials = session?.data?.user?.name
    ? session.data.user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    : '';

  return (
    <nav className="bg-black p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-500 text-white mr-2">
          {initials}
        </div>
        <a className="text-white font-semibold">{session?.data?.user?.name}</a>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => signOut()}
          className="flex items-center text-white focus:outline-none mr-4"
        >
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
