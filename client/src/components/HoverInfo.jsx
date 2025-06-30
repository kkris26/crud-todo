const HoverInfo = ({ children }) => {
  return (
    <span
      className="group-hover:flex hidden absolute right-1 -bottom-6 w-max px-2 h-5   p-0 rounded-md leading-0 btn text-xs font-light opacity-0 group-hover:opacity-100 
transform  translate-y-2 group-hover:translate-y-0 
transition-all duration-300 ease-out items-center"
    >
      {children}
    </span>
  );
};
export default HoverInfo;
