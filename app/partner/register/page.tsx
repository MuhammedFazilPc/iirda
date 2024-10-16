'use client'
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import TermsModal from '@/components/TermsModal';
import { useRouter } from 'next/navigation';


const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    whatsApp: '',
    sameAsAbove: false,
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router=useRouter()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'sameAsAbove' && checked ? { whatsApp: prevData.mobile } : {}),
      ...(name === 'mobile' && prevData.sameAsAbove ? { whatsApp: value } : {})
    }));
  };

  const validateForm = () => {
    let newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!formData.whatsApp.trim()) newErrors.whatsApp = "WhatsApp number is required";

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 6 characters long and contain both letters and numbers";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setError(null);
      
      try {
      // send the data to  backend
      //call register API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Mobile number already exists');
      }
      const data = await response.json();
      
      router.push('/partner/register/pending')
     

      

    } catch (err: any) {
      // Handle error, show error message
      setError(err.message);
    }

    }
  };

  return (

    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2" >Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder='Enter  your full name'
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder='Enter your mobile number'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.mobile && <p className="text-red-500 text-xs italic">{errors.mobile}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="whatsApp" className="block text-gray-700 text-sm font-bold mb-2">WhatsApp Number</label>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="sameAsAbove"
                checked={formData.sameAsAbove}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm">Same as above</span>
            </label>
          </div>
          <input
            type="tel"
            id="whatsApp"
            name="whatsApp"
            value={formData.whatsApp}
            onChange={handleChange}
            placeholder='Enter your whatsApp number'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={formData.sameAsAbove}
          />
          {errors.whatsApp && <p className="text-red-500 text-xs italic">{errors.whatsApp}</p>}
        </div>



        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter your password'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>

        <div className="mb-6 ">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder='Confirm your password'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
          <p className='mt-2'>
            By continuing, I agree to iirda’s 
            <button onClick={() => setIsTermsModalOpen(true)} className='text-blue-500' type='button'>
              Terms & conditions
            </button>
          </p>
        </div>

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please correct the errors above before submitting.
            </AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}


        <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
        <div className="flex-row items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register & Continue →
          </button>

        </div>
        {/* <div className="mt-4">
        <p className="text-sm text-center mt-4 text-gray-600">
            Already partner?{' '}
            <Button
                onClick={() => setIsModalOpen(true)}  // Open modal on click
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Login
              </Button>
          </p>
        </div> */}
      </form>
      {/* <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />

    </div>

  );
};

export default RegistrationPage;