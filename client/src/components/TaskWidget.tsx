type TaskWidgetProps = {
	setActiveTab: (tab: 'dashboard' | 'tasks') => void;
};

function TaskWidget({ setActiveTab }: TaskWidgetProps) {
	return (
		<div className="widget task-widget" onClick={() => setActiveTab('tasks')}>
			<h1>Current Task</h1>
			<p>Patient room delivery (example)</p>
		</div>
	);
}

export default TaskWidget;