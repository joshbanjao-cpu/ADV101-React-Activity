export default function DashboardStats({ courses }) {
const total = courses.length;
const completed = courses.filter(c => c.completed).length;
const active = total - completed;
return <section className="stats">
<div className="stat-card"><span>Total Courses</span><strong>{total}</strong></div>
<div className="stat-card"><span>Active Courses</span><strong>{active}</strong></div>
<div className="stat-card"><span>Completed Courses</span><strong>{completed}</strong></div>
</section>;
}