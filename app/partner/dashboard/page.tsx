'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EventModal from "@/components/addEventForm";
import { useSession } from 'next-auth/react';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<any>({});
  const [leaderBoard, setleaderBoard] = useState([]); // Leaderboard state
  const [events, setEvents] = useState<any[]>([]); // Events state initialized to an empty array
  const [error, setError] = useState<string | null>(null);
  const [isNavbarOpen, setisNavbarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/partner');
    }
  }, [status, router]);

  // Fetch both user data and leaderboard
  useEffect(() => {
    async function fetchData() {
      try {
        if (session) {
          // Fetch user data
          const userRes = await fetch('/api/user/details');
          if (!userRes.ok) {
            throw new Error("Couldn't fetch user data");
          }
          const userData = await userRes.json();
          setUserData(userData);

          // Fetch leaderboard data
          const leaderRes = await fetch('/api/leaderBoard');
          if (!leaderRes.ok) {
            throw new Error("Failed to fetch leaderboard");
          }
          const leaders = await leaderRes.json();
          setleaderBoard(leaders);

          // Fetch user events
          const eventRes = await fetch('/api/user/registeredEvents');
          if (!eventRes.ok) {
            throw new Error("Failed to fetch your events");
          }
          const fetchedEvents = await eventRes.json();
          
          setEvents(fetchedEvents );
          console.log(events) // Set to an empty array if fetchedEvents is null
        }
      } catch (error: any) {
        setError(error.message);
      }
    }

    fetchData();
  }, [session]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Show loading state while session is being checked
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData || !leaderBoard) {
    return <div>Loading user data and leaderboard...</div>;
  }

  return (
    <div>
      <div className="flex flex-col">
        {/* Navbar */}
        <nav className="bg-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div className="text-white text-xl">
              <a href="/" className="text-white">iirda Partner</a>
            </div>
            <Button
              onClick={() => setisNavbarOpen(!isNavbarOpen)}
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
              <li>
                {/* Add Event Button */}
                <Button
                  onClick={() => setIsModalOpen(true)}  // Open modal on click
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Add Event
                </Button>
              </li>
              <li><a href="tel:+918304050894" className="text-white">Contact</a></li>
              <li><a href="/" className="text-white">Log Out</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <EventModal isOpen={isModalOpen} userId={userData.id}onClose={() => setIsModalOpen(false)} />
      {/* Render user-specific data */}
      <div>
        <h2>User Data:</h2>
        <pre>{JSON.stringify(userData, null, 2)}</pre>

        <h2>Leaderboard:</h2>
        <pre>{JSON.stringify(leaderBoard, null, 2)}</pre>

        <h2>Your Events:</h2>
        {events.length > 0 ? (
          <pre>{JSON.stringify(events, null, 2)}</pre>
        ) : (
          <div>No events found.</div> // Handle case where events are empty or null
        )}
      </div>
    </div>
  );
};

export default Dashboard;
