import { useState } from "react";
export default function CourseForm({ onAddCourse }) {
const [code, setCode] = useState("");
const [title, setTitle] = useState("");
const [message, setMessage] = useState("");
function submit(e) {
e.preventDefault();
if (!code.trim() || !title.trim()) {
setMessage("Please complete all fields."); return;
}
const added = onAddCourse({ code: code.trim(), title: title.trim() });
if (!added) {
setMessage("This course code already exists."); return;
}
setCode(""); setTitle(""); setMessage("Course added successfully.");
}
return <section className="panel">
<h2>Add a Course</h2>
<form onSubmit={submit}>
<div className="form-grid">
<label>Course Code
<input value={code} onChange={e => {setCode(e.target.value); setMessage("");}}
placeholder="e.g., ICT 110" required />
</label>
<label>Course Title
<input value={title} onChange={e => {setTitle(e.target.value); setMessage("");}}
placeholder="Course descriptive title" required />
</label>
</div>
<button type="submit">Add Course</button>
</form>
{message && <p role="status" className="message">{message}</p>}
</section>;
}