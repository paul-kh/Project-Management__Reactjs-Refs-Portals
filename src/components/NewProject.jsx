export default function NewProject() {
  return (
    <div>
      <menu>
        <li>
          <button>Save</button>
          <button>Cancel</button>
        </li>
      </menu>
      <div>
        <p>
          <label>Title</label>
          <input />
        </p>
        <p>
          <label>Description</label>
          <textarea />
        </p>
        <p>
          <label>Due Date</label>
          <input />
        </p>
      </div>
    </div>
  );
}
