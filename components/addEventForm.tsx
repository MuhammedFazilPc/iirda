'use client'
import { useState } from 'react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId:String|null;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose ,userId}) => {
  const [formData, setFormData] = useState({
    name: '',
    refereeMobile: '',
    eventType: '',
    district: '',
    place: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API endpoint)
    // console.log(formData);
   
    const { name, refereeMobile, eventType, district, place } = formData
    try {
      const response = await fetch('/api/addEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, refereeMobile, eventType, district, place, userId }),
      });
    } catch (error) {
      console.log(error)
    }
    onClose(); // Close the modal after submitting
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Refer an Event</h2>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Referee Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter referee name ,not your name"
              required
            />
          </div>

          {/* Mobile Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="tel"
              name="refereeMobile"
              value={formData.refereeMobile}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter referee mobile number"
              required
            />
          </div>

          {/* Event Type (Dropdown) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Type</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>Select event type</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Nikah</option>
              <option value="Birthday">Birthday</option>
              <option value="Conference">Conference</option>
              <option value="Concert">Concert</option>
              <option value="Birthday">Convocation</option>
              <option value="Birthday">Others</option>
            </select>
          </div>

          {/* Place Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter event district"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Place</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter event location"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
