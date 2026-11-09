import { useEffect, useState } from "react";
import CourseCard from "./components/CourseCard";
import CourseForm from "./components/CourseForm";
import DashboardStats from "./components/DashboardStats";
const initialCourses = [
{ id: "course-1", code: "ICT 105", title: "Web Development", completed: false },
{ id: "course-2", code: "ICT 101", title: "Introduction to Computing", completed: true },
{ id: "course-3", code: "LIS 112", title: "Systems Analysis", completed: false }
];
export default function App() {
const [courses, setCourses] = useState(() => {
try {
const saved = localStorage.getItem("student-courses");
if (saved) {
const parsed = JSON.parse(saved);
if (Array.isArray(parsed)) return parsed;
}
} catch (error) { console.error("Unable to load courses:", error); }
return initialCourses;
});
const [search, setSearch] = useState("");
useEffect(() => {
try {
localStorage.setItem("student-courses", JSON.stringify(courses));
} catch (error) { console.error("Unable to save courses:", error); }
}, [courses]);
const filtered = courses.filter(c => {
const keyword = search.toLowerCase();
return c.code.toLowerCase().includes(keyword)
|| c.title.toLowerCase().includes(keyword);
});
function addCourse(newCourse) {
if (courses.some(c => c.code.toLowerCase() === newCourse.code.toLowerCase())) {
return false;
}
setCourses(previous => [...previous, {
id: crypto.randomUUID(), ...newCourse, completed: false
}]);
return true;
}
function toggleCourse(id) {
setCourses(previous => previous.map(c =>
c.id === id ? { ...c, completed: !c.completed } : c
));
}
function deleteCourse(id) {
setCourses(previous => previous.filter(c => c.id !== id));
}
return <main className="dashboard">
<header className="dashboard-header">
<p className="eyebrow">Academic Portal</p>
<h1>Student Academic Dashboard</h1>
<p>Manage and monitor your courses.</p>
</header>
<DashboardStats courses={courses} />
<CourseForm onAddCourse={addCourse} />
<section className="panel">
<div className="section-heading">
<h2>My Courses</h2>
<label><span className="sr-only">Search Courses</span>
<input value={search} onChange={e => setSearch(e.target.value)}
placeholder="Search courses..." />
</label>
</div>
<div className="course-list">
{filtered.length ? filtered.map(course =>
<CourseCard key={course.id} course={course}
onToggle={toggleCourse} onDelete={deleteCourse} />
) : <p>No matching courses found.</p>}
</div>

REACT 19.3

Instructor & Student Guide • Page 17

</section>
</main>;
}