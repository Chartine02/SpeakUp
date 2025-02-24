
interface TitlePrps {
  text: string;
}

const Title = ({ text }: TitlePrps) => {
  return (
    <div className=" flex flex-col items-center justify-center py-6  gap-2">
      <h1 className="text-3xl font-bold text-primary">{text}</h1>
      <span className="h-0.5 w-12 bg-primary"></span>
    </div>
  );
};

export default Title;
