"use client";
import { useState } from 'react';
import axios from 'axios';

export default function Store() {
  const [storeName, setStoreName] = useState('');
  const [domain, setDomain] = useState('');
  const [country, setCountry] = useState('Bangladesh');
  const [category, setCategory] = useState('Fashion');
  const [currency, setCurrency] = useState('BDT');
  const [email, setEmail] = useState('any@email.com');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Function to check domain availability
  const checkDomainAvailability = async () => {
    try {
      const domainToCheck = `${domain}.expressitbd.com`;
      const response = await axios.get(
        `https://interview-task-green.vercel.app/task/domains/check/${domainToCheck}`
      );

      if (response.data === false) {
        // Domain is not available, proceed to create store
        await createStore();
      } else {
        setMessage('Domain is available. No action taken.');
      }
    } catch (error) {
      setMessage('Error checking domain availability.');
      console.error(error);
    }
  };

  // Function to create a store
  const createStore = async () => {
    const storeData = {
      name: storeName,
      currency: currency,
      country: country,
      domain: domain,
      category: category,
      email: email,
    };

    try {
      const response = await axios.post(
        'https://interview-task-green.vercel.app/task/stores/create',
        storeData
      );
      setMessage('Store created successfully!');
      console.log('Store created:', response.data);
    } catch (error) {
      setMessage('Error creating store.');
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Store Name Validation
    if (storeName.length < 3) {
      newErrors.storeName = 'Store name must be at least 3 characters long.';
    }

    // Domain Validation
    if (!domain) {
      newErrors.domain = 'Domain is required.';
    }

    // Email Validation
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format!';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if validation fails
    } else {
      setErrors({}); // Clear errors if validation passes
      checkDomainAvailability(); // Proceed with domain availability check
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Create a Store</h1>
        <p className="text-gray-500 mb-2">Add your basic store information and complete the setup</p>
        <hr />
        <form onSubmit={handleSubmit}>
          {/* Store Name */}
          <div className="mb-4 mt-2">
            <label className="block text-sm font-medium mb-2">Give your online store name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className={`w-full p-2 border ${
                errors.storeName ? 'border-red-500' : 'border-gray-300'
              } rounded-lg`}
              placeholder="Enter your store name"
              required
            />
            {errors.storeName && (
              <p className="text-xs text-red-500 mt-1">{errors.storeName}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              A great store name is a big part of your success. Make sure it aligns with your brand and products.
            </p>
          </div>

          {/* Domain */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Your online store subdomain</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className={`w-full p-2 rounded-lg ${
                  errors.domain ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your domain name"
                required
              />
              <span className="p-2 bg-gray-100">.expressitbd.com</span>
            </div>
            {errors.domain && (
              <p className="text-xs text-red-500 mt-1">{errors.domain}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              A SEO-friendly store name is a crucial part of your success. Make sure it aligns with your brand and products.
            </p>
          </div>

          {/* Country */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Where's your store located?</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="Bangladesh">Bangladesh</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
              <option value="Australia">Australia</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Set your store's default location so we can optimize store access and speed for your customers.
            </p>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">What's your Category?</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="Fashion">Fashion</option>
              <option value="Electronics">Electronics</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Sports">Sports</option>
              <option value="Books">Books</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Set your store's default category so that we can optimize store access and speed for your customers.
            </p>
          </div>

          {/* Currency */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Choose store currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="BDT">BDT (Taka)</option>
              <option value="USD">USD (Dollar)</option>
              <option value="EUR">EUR (Euro)</option>
              <option value="GBP">GBP (Pound)</option>
              <option value="AUD">AUD (Dollar)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              This is the main currency you wish to sell in.
            </p>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Store contact email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg`}
              required
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              This is the email you'll use to send notifications to and receive orders from customers.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Create Store
          </button>
        </form>

        {/* Display Message */}
        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}