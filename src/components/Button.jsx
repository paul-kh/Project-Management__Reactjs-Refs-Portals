// This <Button> component is for creating new project.
// It's outsourced from <ProjectsSidebar> so the <button> can be used
// in different places as needed in the app without having to style it again and again

export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
    >
      {children}
    </button>
  );
}
