import Button from "../components/Button";
import Title from "../components/Title";
import { Blogs } from "../components/ui/Blogs";
import { HeroText } from "../components/ui/Hero";
import { Testimonials } from "../components/ui/Testimonials";
import { slides } from "../data/blogs";
import { testimonies } from "../data/testimonies";
import About from "./About";
import { useNavigate } from "react-router-dom";
import Routes from "../routes";
import { motion } from "framer-motion";
import { faqs, stats, procedures } from "../data/faq";
import { services } from "../data/services";

const Landing = () => {
  const navigate = useNavigate();
  
  const handleBookSession = () => {
    navigate(Routes.PROFESSIONALS);
  };
  
  return (
    <div className="overflow-x-hidden">
      <div className="space-y-12">
        <section className="landing-page grid px-20 grid-cols-2 items-center py-20">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <HeroText
                className="px-8 font-bold text-6xl"
                words="Speak Up, Be Heard!"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <HeroText
                className="px-8 text-xl"
                words="A safe space for open conversations and mental wellness support."
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="px-8 text-lg opacity-90"
            >
              Join thousands who've found clarity, support, and growth through our community.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="px-8 flex gap-4"
            >
              <Button value="Join us" small />
              <Button value="Learn More" small onClick={() => navigate(Routes.ABOUT)} />
            </motion.div>
          </div>
          <motion.div 
            className="justify-self-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img src="hero-group.svg" alt="Diverse group of people engaged in conversation" width={700} />
          </motion.div>
        </section>
        <About />
        <section className="py-20 px-20 bg-gray-50 text-gray-800">
          <Title text="How It Works" />
          <div className="text-center mb-12">
            <p className="text-lg max-w-2xl mx-auto">
              Getting the support you need is simple and straightforward with SpeakUp
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
            {procedures.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="py-16 landing-page text-white">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Our Impact</h2>
            <p className="mt-2">Real results from our community</p>
          </div>
          
          <div className="grid grid-cols-4 gap-8 max-w-5xl mx-auto px-4">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-lg"
              >
                <h3 className="text-4xl font-bold text-secondary mb-2">{stat.number}</h3>
                <p className="opacity-90">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="py-20 px-20">
          <Title text="What We Offer" />
          <div className="text-center mb-12">
            <p className="text-lg max-w-2xl mx-auto">
              SpeakUp provides comprehensive mental wellness support through these key features
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-10 max-w-6xl mx-auto">
            {services.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 text-gray-800 p-6 rounded-lg shadow-sm"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="py-12 px-20">
          <Title text="Articles" />
          <div className="text-center mb-6">
            <p className="text-lg max-w-2xl mx-auto">
              Discover insights, tips, and stories that can help guide your mental wellness journey.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Blogs slides={slides} />
          </div>
        </section>
        <Testimonials
          className="pb-4"
          items={testimonies}
          direction="left"
          speed="slow"
        />
        <section className="bg-primary my-12 mx-60 rounded-md py-16 px-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-secondary">
              Ready to take the next step?
            </h2>
            <p className="text-xl">
              Connect with our professional counselors and start your journey
              toward better mental health today.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Button value="Book a Session" onClick={handleBookSession} />
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-secondary/80 border-2 border-primary"></div>
                  ))}
                </div>
                <p className="text-sm text-secondary">
                  Join 5,000+ people who have transformed their lives
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 px-20 bg-gray-50 text-gray-800">
          <Title text="Frequently Asked Questions" />
          <div className="max-w-4xl mx-auto mt-10">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-6 border-b border-gray-200 pb-6"
              >
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default Landing;
