interface RainbowTextProps {
  children: React.ReactNode;
}
const RainbowText = ({ children }: RainbowTextProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent font-bold">
      {children}
    </div>
  );
};

export default RainbowText;
