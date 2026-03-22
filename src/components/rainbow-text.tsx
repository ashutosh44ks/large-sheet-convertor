interface RainbowTextProps {
  children: React.ReactNode;
}
const RainbowText = ({ children }: RainbowTextProps) => {
  return (
    <span className="bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent font-bold">
      {children}
    </span>
  );
};

export default RainbowText;
