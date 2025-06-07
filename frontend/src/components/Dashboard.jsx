import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { generatePublicLinkApi, saveAvailabilityApi } from '../routes/ApiRoutes';

const Dashboard = () => {
     const [dDate, setDate] = useState('');
     const [dStartTime, setStartTime] = useState('');
     const [dEndTime, setEndTime] = useState('');
     const [availability, setAvailability] = useState([]);
     const [loadingSave, setLoadingSave] = useState(false);
     const [loadingLink, setLoadingLink] = useState(false);
     const [link, setLink] = useState(null);

     const token = localStorage.getItem('token');
     const headers = { Authorization: token };

     const saveAvailability = async () => {
          if (!dDate || !dStartTime || !dEndTime) {
               toast.error('Please fill all fields');
               return;
          }
          if (dStartTime >= dEndTime) {
               toast.error('Start time must be before end time');
               return;
          }

          setLoadingSave(true);
          try {
               await axios.post(
                    saveAvailabilityApi,
                    { dDate, dStartTime, dEndTime },
                    { headers }
               );
               toast.success('Availability saved successfully');
               setAvailability(prev => [...prev, { dDate, dStartTime, dEndTime }]);
               setDate('');
               setStartTime('');
               setEndTime('');
          } catch (error) {
               toast.error(error.response?.data?.message || 'Failed to save availability');
          } finally {
               setLoadingSave(false);
          }
     };

     const generateLink = async () => {
          setLoadingLink(true);
          try {
               const res = await axios.post(generatePublicLinkApi, {}, { headers });
               setLink(`${window.location.origin}/booking/${res.data.sLinkId}`);
               toast.success('Booking link generated successfully');
          } catch {
               toast.error('Failed to generate booking link');
          } finally {
               setLoadingLink(false);
          }
     };

     return (
          <div className="dashboard-container">

               <div className="container py-5">
                    <div className="row justify-content-center">
                         <div className="col-lg-8">
                              <div className="card shadow-sm border-0">
                                   <div className="card-header bg-primary text-white">
                                        <h2 className="h4 mb-0">Manage Your Availability</h2>
                                   </div>

                                   <div className="card-body p-4">
                                        <div className="mb-4">
                                             <h3 className="h5 mb-3 text-muted">Add New Availability</h3>

                                             <div className="mb-3">
                                                  <label htmlFor="dDate" className="form-label fw-semibold">
                                                       Date <span className="text-danger">*</span>
                                                  </label>
                                                  <input
                                                       id="dDate"
                                                       type="Date"
                                                       className="form-control form-control-lg"
                                                       value={dDate}
                                                       onChange={e => setDate(e.target.value)}
                                                       disabled={loadingSave || loadingLink}
                                                       min={new Date().toISOString().split('T')[0]} // Prevent past dates
                                                  />
                                             </div>

                                             <div className="row g-3 mb-4">
                                                  <div className="col-md-6">
                                                       <label htmlFor="dStartTime" className="form-label fw-semibold">
                                                            Start Time <span className="text-danger">*</span>
                                                       </label>
                                                       <input
                                                            id="dStartTime"
                                                            type="time"
                                                            className="form-control form-control-lg"
                                                            value={dStartTime}
                                                            onChange={e => setStartTime(e.target.value)}
                                                            disabled={loadingSave || loadingLink}
                                                       />
                                                  </div>
                                                  <div className="col-md-6">
                                                       <label htmlFor="dEndTime" className="form-label fw-semibold">
                                                            End Time <span className="text-danger">*</span>
                                                       </label>
                                                       <input
                                                            id="dEndTime"
                                                            type="time"
                                                            className="form-control form-control-lg"
                                                            value={dEndTime}
                                                            onChange={e => setEndTime(e.target.value)}
                                                            disabled={loadingSave || loadingLink}
                                                       />
                                                  </div>
                                             </div>

                                             <div className="d-flex gap-3">
                                                  <button
                                                       className="btn btn-success btn-lg flex-grow-1"
                                                       onClick={saveAvailability}
                                                       disabled={loadingSave || loadingLink}
                                                  >
                                                       {loadingSave ? (
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                       ) : null}
                                                       {loadingSave ? 'Saving...' : 'Save Availability'}
                                                  </button>

                                                  <button
                                                       className="btn btn-primary btn-lg flex-grow-1"
                                                       onClick={generateLink}
                                                       disabled={loadingSave || loadingLink}
                                                  >
                                                       {loadingLink ? (
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                       ) : null}
                                                       {loadingLink ? 'Generating...' : 'Generate Link'}
                                                  </button>
                                             </div>
                                        </div>

                                        {link && (
                                             <div className="alert alert-info mt-4">
                                                  <h4 className="h6 mb-2">Your Booking Link:</h4>
                                                  <div className="input-group">
                                                       <input
                                                            type="text"
                                                            className="form-control"
                                                            value={link}
                                                            readOnly
                                                       />
                                                       <button
                                                            className="btn btn-outline-secondary"
                                                            type="button"
                                                            onClick={() => {
                                                                 navigator.clipboard.writeText(link);
                                                                 toast.info('Link copied to clipboard!');
                                                            }}
                                                       >
                                                            Copy
                                                       </button>
                                                  </div>
                                                  <small className="d-block mt-2">
                                                       Share this link with others to allow them to book appointments during your available times.
                                                  </small>
                                             </div>
                                        )}

                                        <hr className="my-4" />

                                        <div className="availability-section">
                                             <h3 className="h5 mb-3 text-muted">Your Current Availability</h3>

                                             {availability.length === 0 ? (
                                                  <div className="alert alert-warning">
                                                       You haven't added any availability slots yet.
                                                  </div>
                                             ) : (
                                                  <div className="table-responsive">
                                                       <table className="table table-hover align-middle">
                                                            <thead className="table-light">
                                                                 <tr>
                                                                      <th>Date</th>
                                                                      <th>Start Time</th>
                                                                      <th>End Time</th>
                                                                      <th>Actions</th>
                                                                 </tr>
                                                            </thead>
                                                            <tbody>
                                                                 {availability.map((a, i) => (
                                                                      <tr key={i}>
                                                                           <td>{new Date(a.dDate).toLocaleDateString('en-US', {
                                                                                year: 'numeric',
                                                                                month: 'short',
                                                                                day: 'numeric',
                                                                                weekday: 'short'
                                                                           })}</td>
                                                                           <td>{a.dStartTime}</td>
                                                                           <td>{a.dEndTime}</td>
                                                                           <td>
                                                                                <button
                                                                                     className="btn btn-sm btn-outline-danger"
                                                                                     onClick={() => {
                                                                                          // Implement delete functionality
                                                                                          const updated = [...availability];
                                                                                          updated.splice(i, 1);
                                                                                          setAvailability(updated);
                                                                                          toast.success('Availability removed');
                                                                                     }}
                                                                                >
                                                                                     Remove
                                                                                </button>
                                                                           </td>
                                                                      </tr>
                                                                 ))}
                                                            </tbody>
                                                       </table>
                                                  </div>
                                             )}
                                        </div>
                                   </div>

                                   <div className="card-footer bg-light text-muted small">
                                        Last updated: {new Date().toLocaleString()}
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Dashboard;