import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerApi } from '../routes/ApiRoutes';

const Register = () => {
     const [sEmail, setEmail] = useState('');
     const [sPassword, setPassword] = useState('');
     const [name, setName] = useState('');
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();

     const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
          try {
               const response = await axios.post(registerApi, {
                    name,
                    sEmail,
                    sPassword,
               });
               console.log('response', response)
               toast.success('Registered successfully! Please log in.');
               navigate('/login');
          } catch (error) {
               console.log('error', error)
               toast.error(error.response?.data?.message || 'Registration failed');
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="container mt-5">
               <div className="row justify-content-center">
                    <div className="col-md-6">
                         <div className="card p-4 shadow-sm">
                              <h2 className="mb-4 text-center">Register</h2>
                              <form onSubmit={handleSubmit}>
                                   <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                             type="text"
                                             className="form-control"
                                             id="name"
                                             value={name}
                                             onChange={(e) => setName(e.target.value)}
                                             required
                                        />
                                   </div>
                                   <div className="mb-3">
                                        <label htmlFor="sEmail" className="form-label">Email address</label>
                                        <input
                                             type="sEmail"
                                             className="form-control"
                                             id="sEmail"
                                             value={sEmail}
                                             onChange={(e) => setEmail(e.target.value)}
                                             required
                                        />
                                   </div>
                                   <div className="mb-3">
                                        <label htmlFor="sPassword" className="form-label">Password</label>
                                        <input
                                             type="sPassword"
                                             className="form-control"
                                             id="sPassword"
                                             value={sPassword}
                                             onChange={(e) => setPassword(e.target.value)}
                                             required
                                        />
                                   </div>
                                   <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                        {loading ? 'Registering...' : 'Register'}
                                   </button>
                              </form>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Register;
