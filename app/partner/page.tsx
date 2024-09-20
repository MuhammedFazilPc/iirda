// "use client";

// import React, { useState } from "react";

// const WorkingPartnerForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     aadharNumber: "",
//     idProof: null,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, files } = e.target;
//     if (name === "idProof" && files) {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // You can handle form submission here (e.g., send data to a backend API)
//     console.log(formData);
    
//     // Reset form after submission (optional)
//     setFormData({
//       name: "",
//       email: "",
//       aadharNumber: "",
//       idProof: null,
//     });
//   };

//   return (
//     <div className="max-w-lg mx-auto py-8 ">
//       <h1 className="text-2xl font-semibold mb-4">Working Partner Signup</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name */}
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             required
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             required
//           />
//         </div>

//         {/* Aadhaar Number */}
//         <div>
//           <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">
//             Aadhaar Number
//           </label>
//           <input
//             type="text"
//             id="aadharNumber"
//             name="aadharNumber"
//             value={formData.aadharNumber}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             required
//           />
//         </div>

//         {/* ID Proof Image */}
//         <div>
//           <label htmlFor="idProof" className="block text-sm font-medium text-gray-700">
//             Upload ID Proof
//           </label>
//           <input
//             type="file"
//             id="idProof"
//             name="idProof"
//             accept="image/*"
//             onChange={handleChange}
//             className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm p-2"
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//           >
//             Sign Up
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default WorkingPartnerForm;
import React from 'react';

function page() {
  return (
    <div>
      <h3>coming soon</h3>
    </div>
  );
}

export default page;

