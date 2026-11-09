export default function CourseCard({ course, onToggle, onDelete }) {
return (
<article className="course-card">
<div>
<h3>{course.code}</h3>
<p>{course.title}</p>
<span className={course.completed ? "status completed" : "status active"}>
{course.completed ? "Completed" : "Active"}
</span>
</div>
<div className="card-actions">
<button className="secondary" type="button"
onClick={() => onToggle(course.id)}>
{course.completed ? "Mark Active" : "Complete"}
</button>
<button className="danger" type="button"
onClick={() => onDelete(course.id)}>Delete</button>
</div>
</article>
);
}