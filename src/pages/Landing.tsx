import Button from "../components/Button";
import Navbar from "../components/layout/Navbar";
import Title from "../components/Title";
import { Blogs } from "../components/ui/Blogs";
import { HeroText } from "../components/ui/Hero";
import { Testimonials } from "../components/ui/Testimonials";
import { slides } from "../data/blogs";
import { testimonies } from "../data/testimonies";
import About from "./About";

const Landing = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
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
            <Button value='Join us' small />
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
      </div>
    </div>
  );
};

export default Landing;
