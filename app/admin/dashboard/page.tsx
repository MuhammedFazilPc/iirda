'use client'
import { useEffect, useState } from 'react';

const AdminDashboard: React.FC = () => {
  const [registrationQue, setRegistrationQue] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the registration queue data from the /api/pending endpoint
    const fetchRegistrationQue = async () => {
      try {
        const res = await fetch('/api/admin/pending');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setRegistrationQue(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchRegistrationQue();
  }, []);

  // Function to approve a user
  const approveUser = async (id: number,name: string,  mobile: string, whatsApp: string,password:string) => {
    try {
      const res = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name,  mobile,whatsApp,password}),
      });
      if (!res.ok) {
        throw new Error('Failed to approve user');
      }

      // Optionally: remove the approved user from the pending list on the UI side
      setRegistrationQue((prev) => prev.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error('Error approving user:', error);
      alert('Error approving user');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (registrationQue.length === 0) {
    return <div>No registrations pending approval</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Registrations</h1>
      <table className="min-w-full bg-white border border-gray-300 text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Mobile</th>
            <th className="py-2 px-4">WhatsApp</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Created At</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {registrationQue.map((entry) => (
            <tr key={entry.id}>
              <td className="py-2 px-4">{entry.id}</td>
              <td className="py-2 px-4">{entry.name}</td>
              <td className="py-2 px-4">{entry.mobile}</td>
              <td className="py-2 px-4">{entry.whatsApp}</td>
              <td className="py-2 px-4">{entry.status}</td>
              <td className="py-2 px-4">{new Date(entry.createdAt).toLocaleString()}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  onClick={() => approveUser(entry.id, entry.name, entry.mobile, entry.whatsApp,entry.password)}
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
