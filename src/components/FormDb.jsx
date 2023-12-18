import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setDBConfig } from '@/redux/dbConfigSlice';

const FormDb = () => {
  const [formData, setFormData] = useState({
    hostname: '',
    username: '',
    password: '',
    database: ''
  });

  const dispatch = useDispatch();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Successfully connected to the database');
        dispatch(setDBConfig(formData));
      } else {
        toast.error('Failed to connect to the database');
      }
    } catch (error) {
      toast.error('Error connecting to the database: ' + error.message);
    }
  };

  return (
    <div>
       <ToastContainer />
      <div className='absolute -mt-3 bg-white left-[39%]'>
        MySQL Data
      </div>
    <form className='max-w-md mx-auto p-4 border border-black mt-5  ' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4'>

        <div className='flex gap-4'>
          <label>
            <input
              type="text"
              name="hostname"
              placeholder='MySQL Host'
              className='border border-black text-center px-2 py-1 rounded'
              value={formData.hostname}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            <input
              type="text"
              name="database"
              placeholder='MySQL Database'
              className='border border-black text-center px-2 py-1 rounded'
              value={formData.database}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className='flex gap-4'>
          <label>
            <input
              type="text"
              name="username"
              placeholder='MySQL Username'
              className='border border-black text-center px-2 py-1 rounded'
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            <input
              type="password"
              name="password"
              placeholder='MySQL Password'
              className='border border-black text-center px-2 py-1 rounded'
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded mx-40' type="submit">
          Connect
        </button>
      </div>
    </form>
              </div>
  );
};

export default FormDb;
