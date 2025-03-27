import { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";

interface Professional {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  imageUrl: string;
  availableDays: string[];
  rating: number;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const Professionals = () => {
  const [professionals] = useState<Professional[]>([
    {
      id: "1",
      name: "Dr. Maya Johnson",
      specialty: "Anxiety & Depression",
      bio: "Licensed therapist with 10 years of experience in cognitive behavioral therapy approaches. Specializes in helping individuals manage anxiety and depression.",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      availableDays: ["Monday", "Wednesday", "Friday"],
      rating: 4.8,
    },
    {
      id: "2",
      name: "Dr. Robert Chen",
      specialty: "Trauma Recovery",
      bio: "Specializing in trauma-informed therapy approaches. Helping individuals process and heal from past traumas through evidence-based techniques.",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      availableDays: ["Tuesday", "Thursday"],
      rating: 4.9,
    },
    {
      id: "3",
      name: "Sarah Martinez, LMFT",
      specialty: "Relationships & Family Therapy",
      bio: "Licensed Marriage and Family Therapist with experience in resolving relationship conflicts and improving family dynamics.",
      imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      availableDays: ["Monday", "Tuesday", "Thursday"],
      rating: 4.7,
    },
  ]);

  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [appointmentReason, setAppointmentReason] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      if (selectedProfessional && selectedProfessional.availableDays.includes(dayName)) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
        });
      }
    }
    
    return dates;
  };

  const generateTimeSlots = (): TimeSlot[] => {
    const slots = [];
    const startHour = 9;
    const endHour = 17;
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (const minutes of ['00', '30']) {
        const available = Math.random() > 0.3;
        slots.push({
          time: `${hour}:${minutes}`,
          available
        });
      }
    }
    
    return slots;
  };

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both a date and time for your appointment");
      return;
    }
    
    setSuccessMessage(`Your appointment with ${selectedProfessional?.name} on ${selectedDate} at ${selectedTime} has been scheduled.`);
    
    setSelectedDate("");
    setSelectedTime("");
    setAppointmentReason("");
    
    setTimeout(() => {
      setIsModalOpen(false);
      setSuccessMessage("");
    }, 3000);
  };

  const openBookingModal = (professional: Professional) => {
    setSelectedProfessional(professional);
    setIsModalOpen(true);
    setSelectedDate("");
    setSelectedTime("");
    setAppointmentReason("");
    setSuccessMessage("");
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="min-h-screen py-8 px-4 md:px-20">
      <Title text="Our Mental Health Professionals" />
      <p className="text-center text-black mb-8">
        Connect with licensed professionals for personalized support
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {professionals.map((professional) => (
          <div 
            key={professional.id}
            className="rounded-xl overflow-hidden shadow-lg"
            style={{
              background: "linear-gradient(to bottom, var(--color-primary), #2a0134)",
            }}
          >
            <div className="h-64 overflow-hidden">
              <img 
                src={professional.imageUrl} 
                alt={professional.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{professional.name}</h3>
              <p className="text-secondary mb-4">{professional.specialty}</p>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(professional.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-white">{professional.rating}</span>
                </div>
              </div>
              <p className="text-white/80 mb-6 text-sm">{professional.bio}</p>
              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">Available on:</h4>
                <div className="flex flex-wrap gap-2">
                  {professional.availableDays.map((day) => (
                    <span 
                      key={day} 
                      className="bg-white/10 text-white text-xs px-3 py-1 rounded-full"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <Button 
                value="Book a Session" 
                onClick={() => openBookingModal(professional)}
              />
            </div>
          </div>
        ))}
      </div>
      
      {isModalOpen && selectedProfessional && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-xl overflow-hidden">
            <div className="p-6" style={{
              background: "linear-gradient(to right, var(--color-primary), var(--color-vivid-purple))",
            }}>
              <h2 className="text-2xl font-bold text-white">Book a Session with {selectedProfessional.name}</h2>
              <p className="text-white/80">{selectedProfessional.specialty}</p>
            </div>
            
            <div className="p-6">
              {successMessage ? (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                  {successMessage}
                </div>
              ) : (
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Select a Date</label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    >
                      <option value="">Select a date</option>
                      {generateAvailableDates().map((date) => (
                        <option key={date.value} value={date.value}>
                          {date.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {selectedDate && (
                    <div>
                      <label className="block text-gray-700 mb-2">Select a Time</label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot, index) => (
                          <button
                            key={index}
                            type="button"
                            disabled={!slot.available}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`py-2 px-4 rounded-lg text-center ${
                              selectedTime === slot.time
                                ? 'bg-primary text-white'
                                : slot.available
                                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Reason for Appointment</label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      rows={4}
                      value={appointmentReason}
                      onChange={(e) => setAppointmentReason(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="w-36">
                      <Button value="Book Appointment" small type="button" onClick={handleBookAppointment} />
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Professionals; 