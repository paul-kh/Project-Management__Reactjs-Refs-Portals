import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";

import { useState } from "react";
import SelectedProject from "./components/SelectedProject";

function App() {
  /************************************************************************************ 
    The projectState object is used to display UI when user starts adding new project
    or no project is selected:
    - projectsState.selectedProjectId = undefined ==> if no project is selected
    - projectsState.selectedProjectId = null      ==> if user started adding new project 
  *************************************************************************************/

  /* Data modeling of the 'projectsState' object that we are defining as the state in this app:
      projectsState: {
        selectedProjectId: 123,
        projects: [
                    { id: 1, title: “project 1”, description: “description 1”, dueDate: “today” },
                    { id: 2, title: “project 2”, description: “description 2”, dueDate: “tomorrow” },
                    ...
                  ]
        tasks:    [
                    {id: 1, text: "Task 1", projectId: 1},
                    {id: 2, text: "Task 2", projectId: 1},
                    ...
                  ]
      }
*/
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  // The function to add tasks to a selected project
  function handleAddTask(tasksData) {
    if (tasksData.text.trim() === "") {
      return;
    }

    setProjectsState((prevState) => {
      const newTask = {
        ...tasksData,
        id: Math.random(),
        projectId: prevState.selectedProjectId,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  // The function to clear a task from a selected project
  function handleDeleteTask() {}

  // Function for updating state with 'selectedProjectId' set to the id
  // of the project that user selected/clicked on the <ProjectSidebar>.
  // We pass the function as value to <ProjectSidebar> component which
  // pass on the function to handle 'onClick' event when user clicks
  // on a project button.
  function handleSelectProject(projectId) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: projectId,
      };
    });
  }

  // The function for deleting an existing project.
  // We use array.filter() method to create a new array
  // that filters out the deleted project
  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  // The function for changing state with 'selectedProjectId' set to 'null'
  // when user clicks 'Create new project' button to start adding new project.
  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null, // 'null' is rendering <NewProject> component
      };
    });
  }

  // The function for collecting user's input as a new project data
  // when user clicks 'Save' button while creating new project
  // then update the state with new project and 'selectedProjectId' set to 'undefined'
  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
        selectedProjectId: undefined, // 'undefined' is for rendering <NoProjectSelected> component
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

  // Inside the array 'projects' as the property of the 'projectsState' object,
  // we are finding the project that has its id matching the value of
  // the selectedProjectId property of the 'projectsState' object.
  // We use the array.find() which is the JS built-in method.
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  // Render the selected project if user clicked on an existing project (projectId !== undefined or null)
  let content = (
    <SelectedProject
      project={selectedProject}
      onDeleteProject={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  console.log(projectsState.tasks);

  // Render <NewProject> component if user click 'Add new project' button
  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onAddProject={handleAddProject}
        onCancelProject={handleCancelAddProject}
      />
    );

    // Render <NoProjectSelected> component if no project is selected (id='undefined)
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        projects={projectsState.projects}
      />
      {content}
    </main>
  );
}

export default App;
