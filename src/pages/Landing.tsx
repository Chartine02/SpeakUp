import Navbar from "../components/layout/Navbar";
import Title from "../components/Title";
import { Blogs } from "../components/ui/Blogs";
import { Hero } from "../components/ui/Hero";
import { Testimonials } from "../components/ui/Testimonials";
import { slides } from "../data/blogs";
import { testimonies } from "../data/testimonies";
import About from "./About";

const Landing = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="space-y-5">
        <section className="landing-page grid  grid-cols-2 items-center py-20 ">
          <Hero
            className="text-center px-8"
            words="Welcome to SpeakUp app! We're so excited to have you as part of our community."
          />
          {/* <p className=" flex flex-col justify-center px-12 text-center text-5xl">
          <span>Welcome to SpeakUp app!</span>
          We're so excited to have you as part of our community.
          </p> */}
          <div className="">
            <img src="preview.png" alt="" />
          </div>
        </section>
        <About />
        <section className="py-12 px-12 ">
          <Title text="Articles"/>
          <div className="flex items-center justify-center">
            <p className="">Read articles that relates to you!</p>
            <Blogs slides={slides} />
          </div>
        </section>
        <Testimonials
          className=""
          items={testimonies}
          direction="left"
          speed="slow"
        />
      </div>
    </div>
  );
};

export default Landing;
