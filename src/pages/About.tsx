const About = () => {
  return (
    <div className="grid grid-cols-2  px-20 py-16 text-black items-center place-content-center">
      <div className="space-y-5 justify-center">
        <h1 className="text-5xl font-medium">
          Comprehensive Mental Health Care Solution
        </h1>
        <h2 className="text-xl font-medium text-primary">
          We want you to feel better, faster!
        </h2>
        <p className="flex text-lg flex-col gap-5">
          We know that it can be hard to look past your worries and focus on
          what's important,but this is not just about getting through today-
          its'a bout getting through life. And we think that's work the effort!
          <span>
            We've got a lot of great things planned for our app: blogs and
            videos to help you calm down and get centered, therapy session to
            help you work out your issues and find soultions, and even social
            events where you can meet other people who are looking for ways to
            improve their mental healrh. We're all here because we care about
            your well-being, and we want to help you thrive!
          </span>
        </p>
      </div>
      <div className="justify-self-center">
        <img src="speakup-mobile.svg" alt="" className="object-fill" />
      </div>
    </div>
  );
};

export default About;
