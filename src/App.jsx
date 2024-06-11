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
        selectedProjectId: undefined, // closing new project window once user saved project
      };
    });
  }

  // We revert the selectedProjectId property of
  // the state back to 'undefined' when user clicks
  // 'Cancel' while adding new project.
  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  let content;

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onAddProject={handleCancelAddProject}
        onCancelProject={handleCancelProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
      />
      {content}
    </main>
  );
}

export default App;
