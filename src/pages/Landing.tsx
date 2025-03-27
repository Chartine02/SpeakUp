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

const Landing = () => {
  const navigate = useNavigate();
  

  const handleBookSession = () => {
    navigate(Routes.PROFESSIONALS);
  };
  
 

  return (
    <div className="overflow-x-hidden">
      <div className="space-y-5">
        <section className="landing-page grid px-20  grid-cols-2 items-center py-20 ">
          <div className="space-y-6">
            <HeroText
              className="px-8 font-bold text-6xl "
              words="Welcome to SpeakUp app!"
            />
            <HeroText
              className="px-8 text-xl"
              words="We're so excited to have you as part of our community."
            />
            <Button value="Join us" small />
          </div>
          <div className="justify-self-center">
            <img src="hero-group.svg" alt="" width={700} />
          </div>
        </section>
        <About />
        <section className="py-12 px-20 ">
          <Title text="Articles" />
          <div className="flex items-center justify-center">
            <p className="">Read articles that relates to you!</p>
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
            <Button value="Book a Session" onClick={handleBookSession} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
