'use client'
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';  // Importing the utility function from utils.ts
import { Button } from '@/components/ui/button'; // Example Shadcn Button component
import LoginModal from '@/components/LoginModal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type TableData = {
  rank: number;
  name: string;
  points: number;
};

const Home: React.FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();  // Get the session
  const router = useRouter();  // Use useRouter correctly

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await fetch('/api/leaderBoard');
        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await res.json();
        setTableData(data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchTable();
  }, []);

  // Redirect to partner page if the user is authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/partner/dashboard');
    }
  }, [session, status, router]);

  // Handle login modal
  const handleLogin = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="text-white text-xl">iirda Partner</div>
          <Button
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
            className="text-white md:hidden"
          >
            ☰
          </Button>
          <ul
            className={cn(
              "md:flex md:space-x-6 mt-2 md:mt-0 md:space-y-0 space-y-2",
              isNavbarOpen ? "block" : "hidden"
            )}
          >
            {!session && (
              <li>
                <Button
                  onClick={handleLogin}  // Open modal on click
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Login
                </Button>
              </li>
            )}
            <li><a href="tel:+91-8304050894" className="text-white">Contact</a></li>
            <li><a href="/" className="text-white">Exit</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row p-4">
        {/* Paragraph */}
        <div className="md:w-1/2 md:order-2 mb-4 md:mb-0">
          <h2 className="text-xl font-bold">Description</h2>
          <p className="text-gray-600">
            This is a small paragraph providing some information about the page content. 
            The table with data is on the left side in larger screens, but it will move below on smaller devices.
          </p>
        </div>

        {/* Table */}
        <div className="md:w-1/2 md:order-1">
          <h2 className="text-xl font-bold mb-2">Leader Board</h2>
          <table className="min-w-full bg-white border border-gray-300 text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Points</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-t">{index + 1}</td>
                  <td className="py-2 px-4 border-t">{row.name}</td>
                  <td className="py-2 px-4 border-t">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Home;
