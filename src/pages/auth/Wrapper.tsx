import { PropsWithChildren } from "react";

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid  min-h-screen place-content-center landing-page py-8">
      <div className="bg-primary w-[500px] text-center text-secondary rounded-xl  p-12 space-y-5">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
