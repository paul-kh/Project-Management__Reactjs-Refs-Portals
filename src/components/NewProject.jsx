import { useRef } from "react";

import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ onAddProject }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  // Ref for calling Modal to open when error on user's inpu
  const modal = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredtDueDate = dueDate.current.value;
    const projectData = {
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredtDueDate,
    };

    // Validating user input
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredtDueDate.trim() === ""
    ) {
      // Show error Modal
      modal.current.open();

      return;
    }

    // Sending project data to be executed in
    // the function 'handleAddProject()' passed from
    // the <App> componetnt as props 'onAddProject'
    onAddProject(projectData);
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-800 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Please provide a valid value for every input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950">
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" />
          <Input ref={description} label="Description" textarea />
          <Input type="date" ref={dueDate} label="Due Date" />
        </div>
      </div>
    </>
  );
}
