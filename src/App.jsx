import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";

import { useState } from "react";

function App() {
  /************************************************************************************ 
    The projectState object is used to display UI when user starts adding new project
    or no project is selected:
    - projectsState.selectedProjectId = undefined ==> if no project is selected
    - projectsState.selectedProjectId = null      ==> if user started adding new project 
  *************************************************************************************/
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  // To change state when user clicks 'Create new project' button
  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  // To collect user's input as a new project data
  // when user clicks 'Save' button while creating new project
  // then update the state with new project
  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  let content;
  console.log(projectsState);

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAddProject={handleAddProject} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} />
      {content}
    </main>
  );
}

export default App;
