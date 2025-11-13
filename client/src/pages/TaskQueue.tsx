import { useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HistoryIcon from '@mui/icons-material/History';
import AddIcon from '@mui/icons-material/Add';

import { timeAgo } from '../utils/Utils';
import TaskCreationModal from '../components/TaskCreationModal';

type Task = {
	id: number;
	name: string;
	priority: 'Low' | 'Medium' | 'High';
	timeAdded: string;
};

type SortType = 'time' | 'priority';

function TaskQueue() {
	const [tasks, setTasks] = useState<Task[]>([
		{ id: 1, name: 'Deliver meds', priority: 'High', timeAdded: '2025-10-09 19:30' },
		{ id: 2, name: 'Collect vitals', priority: 'Medium', timeAdded: '2025-10-09 19:45' },
	]);
	const [sortBy, setSortBy] = useState<SortType>('time');
	const [showHistory, setShowHistory] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const sortTasks = (tasks: Task[]): Task[] => {
		if (sortBy === 'time') {
			// Sort by time within priority groups (High priority first, then Medium, then Low)
			const priorityOrder = { High: 1, Medium: 2, Low: 3 } as const;
			return [...tasks].sort((a, b) => {
				// First sort by priority
				const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
				if (priorityDiff !== 0) return priorityDiff;
				
				// If same priority, sort by time (oldest first)
				return a.timeAdded.localeCompare(b.timeAdded);
			});
		}
		
		// Sort by priority only
		const priorityOrder = { High: 1, Medium: 2, Low: 3 } as const;
		return [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
	};

	const pressIfSelected = (sortType: SortType) => (sortType === sortBy) ? "pressed" : "";

	const handleTaskSubmit = (taskData: any) => {
		const newTask: Task = {
			id: Math.max(...tasks.map(t => t.id)) + 1,
			name: `Deliver ${taskData.selectedSupplies.join(', ')} to ${taskData.destinationRooms.join(', ')}`,
			priority: taskData.priority === 'URGENT' ? 'High' : taskData.priority === 'NORMAL' ? 'Medium' : 'Low',
			timeAdded: new Date().toISOString()
		};
		setTasks(prev => [...prev, newTask]);
	};

	return (
		<div className="page task-queue">
			<div className="controls">
				<h1>Sort by</h1>
				<button className={`sort-btn ${pressIfSelected('time')}`} onClick={() => setSortBy('time')}>Time Added</button>
				<button className={`sort-btn ${pressIfSelected('priority')}`} onClick={() => setSortBy('priority')}>Priority</button>
				<div className='spacer'></div>
				<button className='add-task-btn' onClick={() => setIsModalOpen(true)}>
					<AddIcon fontSize="small" />
					<span>Add Task</span>
				</button>
				<button className='history-btn' onClick={() => setShowHistory(!showHistory)}>
					<HistoryIcon fontSize="medium" color='primary' />
				</button>
			</div>

			<div className='task-list'>
				{sortTasks(tasks).map((task) => (
					<div key={task.id} className='entry'>
						<div className='info'>
							<h1 className='name'>{task.name}</h1>
							<h4 className={`priority ${task.priority.toLowerCase()}`}>{`${task.priority} Priority`}</h4>
						</div>
						<h4 className='time'>{timeAgo(task.timeAdded)}</h4>
					</div>
					
				))}
			</div>

			{showHistory && <p className="history">History view (placeholder)</p>}
			
			<TaskCreationModal 
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleTaskSubmit}
			/>
		</div>
	);
}

export default TaskQueue;