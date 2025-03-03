import { PropsWithChildren } from "react";

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid place-content-center min-h-screen landing-page py-8">
      <div className="bg-primary text-secondary rounded-xl justify-center place-content-center text-center p-12  grid space-y-5">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
