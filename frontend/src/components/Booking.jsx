import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Loader from './Loader';
import { bookSlotByIdApi, getAvailabilityApi, getLinkDataByIdApi } from '../routes/ApiRoutes';

const Booking = () => {
     const { id } = useParams(); // booking sLinkId
     const [availability, setAvailability] = useState([]);
     const [bookings, setBookings] = useState([]);
     const [selectedDate, setSelectedDate] = useState('');
     const [timeSlots, setTimeSlots] = useState([]);
     const [selectedSlot, setSelectedSlot] = useState('');
     const [loading, setLoading] = useState(true);
     const [bookingLoading, setBookingLoading] = useState(false);
     const token = localStorage.getItem('token');
     const headers = { Authorization: token };
     console.log('id', id)
     useEffect(() => {
          const fetchData = async () => {
               setLoading(true);
               try {
                    const res = await axios.get(`${getLinkDataByIdApi}/${id}`);
                    setAvailability(res.data.availability || []);
                    setBookings(res.data.bookings || []);
               } catch (err) {
                    toast.error('Failed to load booking data');
               } finally {
                    setLoading(false);
               }
          };
          fetchData();
     }, [id]);

     // Extract unique dates from availability
     const uniqueDates = [...new Set(availability.map(a => a.dDate))].sort();

     // Update timeslots when dDate changes
     useEffect(() => {
          if (!selectedDate) {
               setTimeSlots([]);
               return;
          }
          // Filter availability for this dDate
          const slotsForDate = availability.filter(a => a.dDate === selectedDate);

          // Generate half-hour slots between dStartTime and dEndTime (per each availability entry)
          const slots = [];
          slotsForDate.forEach(({ dStartTime, dEndTime }) => {
               let start = dStartTime;
               while (start < dEndTime) {
                    const [h, m] = start.split(':').map(Number);
                    const dt = new Date(0, 0, 0, h, m + 30); // add 30 min
                    const nextSlot = dt.toTimeString().slice(0, 5);

                    slots.push(`${start} - ${nextSlot}`);
                    start = nextSlot;
               }
          });

          // Remove booked slots for this dDate
          const bookedSlots = bookings
               .filter(b => b.dDate === selectedDate)
               .map(b => b.dTimeSlot);

          const availableSlots = slots.filter(s => !bookedSlots.includes(s));

          setTimeSlots(availableSlots);
          setSelectedSlot('');
     }, [selectedDate, availability, bookings]);

     const bookSlot = async () => {
          if (!selectedDate || !selectedSlot) {
               toast.error('Select dDate and time slot');
               return;
          }
          setBookingLoading(true);
          try {
               await axios.post(`${bookSlotByIdApi}/${id}`, { dDate: selectedDate, dTimeSlot: selectedSlot });
               toast.success('Booking confirmed!');
               // Refresh bookings
               const res = await axios.get(`${getAvailabilityApi}/${id}`, { headers });
               console.log('res', res)
               setBookings(res.data.bookings || []);
               setSelectedSlot('');
          } catch (err) {
               toast.error(err.response?.data?.message || 'Failed to book slot');
          } finally {
               setBookingLoading(false);
          }
     };

     if (loading)
          return (
               <div className="container vh-100 d-flex justify-content-center align-items-center">
                    <Loader />
               </div>
          );

     return (
          <div className="container mt-5" style={{ maxWidth: 600 }}>
               <ToastContainer />
               <div className="card p-4 shadow">
                    <h3 className="mb-4">Book a Slot</h3>

                    <div className="mb-3">
                         <label htmlFor="dDate" className="form-label">Select Date</label>
                         <select
                              id="dDate"
                              className="form-select"
                              value={selectedDate}
                              onChange={e => setSelectedDate(e.target.value)}
                         >
                              <option value="">-- Choose Date --</option>
                              {uniqueDates.map(d => (
                                   <option key={d} value={d}>{d}</option>
                              ))}
                         </select>
                    </div>

                    {selectedDate && (
                         <div className="mb-3">
                              <label htmlFor="timeslot" className="form-label">Select Time Slot</label>
                              {timeSlots.length === 0 ? (
                                   <p className="text-danger">No slots available for selected dDate</p>
                              ) : (
                                   <select
                                        id="timeslot"
                                        className="form-select"
                                        value={selectedSlot}
                                        onChange={e => setSelectedSlot(e.target.value)}
                                   >
                                        <option value="">-- Choose Time Slot --</option>
                                        {timeSlots.map((slot, i) => (
                                             <option key={i} value={slot}>{slot}</option>
                                        ))}
                                   </select>
                              )}
                         </div>
                    )}

                    <button
                         className="btn btn-primary"
                         disabled={bookingLoading || !selectedDate || !selectedSlot}
                         onClick={bookSlot}
                    >
                         {bookingLoading ? 'Booking...' : 'Book Slot'}
                    </button>
               </div>
          </div>
     );
};

export default Booking;
