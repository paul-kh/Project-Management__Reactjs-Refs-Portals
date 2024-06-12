import Button from "./Button";

export default function ProjectsSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  seletedProjectId,
}) {
  return (
    <aside className="w-1/3 px-3 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => {
          // Styling the selected project
          let cssClasses =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

          return (
            <li key={project.id}>
              <button
                onClick={() => onSelectProject(project.id)}
                className={
                  project.id === seletedProjectId
                    ? (cssClasses += " bg-stone-800 text-stone-200")
                    : (cssClasses += " text-stone-400")
                }
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
