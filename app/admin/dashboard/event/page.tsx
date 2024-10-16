'use client'
import { useEffect, useState } from 'react';

const updateEvent: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the registration queue data from the /api/pending endpoint
    const fetchEvents= async () => {
      try {
        const res = await fetch('/api/addEvent');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setEvents(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchEvents();
  }, []);

  // Function to approve a user
  const changeEventStatus = async (id: number) => {
    try {
      const res = await fetch('/api/addEvent', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id}),
      });
      if (!res.ok) {
        throw new Error('Failed to approve user');
      }

      // Optionally: remove the approved user from the pending list on the UI side
      setEvents((prev) => prev.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error('Error approving user:', error);
      alert('Error approving user');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (events.length === 0) {
    return <div>No registrations pending approval</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <table className="min-w-full bg-white border border-gray-300 text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Mobile</th>
            <th className="py-2 px-4">EventType</th>
            <th className="py-2 px-4">District</th>
            <th className="py-2 px-4">place</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">UserId</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Approve</th>
          </tr>
        </thead>
        <tbody>
          {events.map((entry) => (
            <tr key={entry.id}>
              <td className="py-2 px-4">{entry.id}</td>
              <td className="py-2 px-4">{entry.name}</td>
              <td className="py-2 px-4">{entry.refereeMobile}</td>
              <td className="py-2 px-4">{entry.eventType}</td>
              <td className="py-2 px-4">{entry.district}</td>
              <td className="py-2 px-4">{entry.place}</td>
              <td className="py-2 px-4">{entry.status}</td>
              <td className="py-2 px-4">{entry.userId}</td>
              <td className="py-2 px-4">{new Date(entry.createdAt).toLocaleString()}</td>
              {
                entry.status==='recieved' &&
              <td className="py-2 px-4">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  onClick={() =>changeEventStatus(entry.id)}
                >
                  Approve
                </button>
              </td>
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default updateEvent ;
