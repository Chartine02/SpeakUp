import { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";

interface Testimony {
  id: string;
  quote: string;
  name: string;
  title: string;
  date: string;
}

const Testimonies = () => {
  const [testimonies, setTestimonies] = useState<Testimony[]>([
    {
      id: "1",
      quote: "Joining this community was the best decision I made for my mental health journey.",
      name: "Sarah J.",
      title: "Finding Community",
      date: "May 15, 2023",
    },
    {
      id: "2",
      quote: "The resources and support here helped me through my darkest times. I'm forever grateful.",
      name: "Marcus L.",
      title: "A New Beginning",
      date: "June 3, 2023",
    },
  ]);

  const [newTestimony, setNewTestimony] = useState({
    quote: "",
    name: "",
    title: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTestimony.quote || !newTestimony.name || !newTestimony.title) {
      alert("Please fill in all fields");
      return;
    }
    
    const testimony: Testimony = {
      id: Date.now().toString(),
      quote: newTestimony.quote,
      name: newTestimony.name,
      title: newTestimony.title,
      date: new Date().toLocaleDateString(),
    };
    
    setTestimonies([testimony, ...testimonies]);
    setNewTestimony({ quote: "", name: "", title: "" });
  };

  return (
    <div className="min-h-screen text-white py-8 px-4 md:px-20">
      <Title text="Share Your Journey" />
      
      <div className="max-w-3xl mx-auto my-8 p-6 rounded-lg shadow-md" 
           style={{
             background: "linear-gradient(to right, var(--color-primary), var(--color-vivid-purple))"
           }}>
        <h2 className="text-2xl font-medium mb-4">Post Your Testimony</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Your Experience</label>
            <textarea 
              className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white"
              rows={4}
              placeholder="Share how your mental health journey has been..."
              value={newTestimony.quote}
              onChange={(e) => setNewTestimony({...newTestimony, quote: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Your Name</label>
              <input 
                type="text"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white"
                placeholder="Your name or initials"
                value={newTestimony.name}
                onChange={(e) => setNewTestimony({...newTestimony, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block mb-2">Title Your Story</label>
              <input 
                type="text"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white"
                placeholder="e.g., 'My Path to Healing'"
                value={newTestimony.title}
                onChange={(e) => setNewTestimony({...newTestimony, title: e.target.value})}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <div className="w-36">
              <Button value="Share" small type="submit" />
            </div>
          </div>
        </form>
      </div>
      
      <div className="my-12">
        <Title text="Community Testimonies" />
        <p className="text-center text-black mb-8">Read inspiring stories from our community members</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonies.map((testimony) => (
            <div
              key={testimony.id}
              className="relative rounded-2xl border border-b-0 border-primary px-8 py-6"
              style={{
                background: "linear-gradient(180deg, var(--color-primary), #2a0134)",
              }}
            >
              <blockquote>
                <span className="relative z-20 text-sm leading-[1.6] text-white font-normal">
                  {testimony.quote}
                </span>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <span className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.6] text-gray-200 font-normal">
                      {testimony.name}
                    </span>
                    <span className="text-sm leading-[1.6] text-gray-300 font-normal">
                      {testimony.title}
                    </span>
                    <span className="text-xs text-gray-400">
                      {testimony.date}
                    </span>
                  </span>
                </div>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonies; 