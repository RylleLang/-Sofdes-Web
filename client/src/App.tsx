import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import TaskQueue from './pages/TaskQueue';
import RobotMap from './pages/RobotMap';
import Monitoring from './pages/Monitoring';
import Reports from './pages/Reports';
import VoiceCommandWidget from './components/VoiceCommandWidget';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Logout from './pages/Logout';
import './App.css'

const customTheme = createTheme({
	palette: {
		primary: {
			main: "#3513e1",
		},
	},
});

function App() {
	const [activeTab, setActiveTab] = useState<'dashboard' | 'tasks' | 'robot-map' | 'monitoring' | 'reports' | 'voice-command' | 'settings' | 'help' | 'logout'>('dashboard');
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<ThemeProvider theme={customTheme}>
			<div className="app">
				<Sidebar activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<div className="main-content">
					<Header title={(() => {
					switch(activeTab) {
						case 'dashboard': return 'Dashboard';
						case 'tasks': return 'Task Queue';
						case 'robot-map': return 'Robot Map';
						case 'monitoring': return 'Monitoring';
						case 'reports': return 'Reports';
						case 'voice-command': return 'Voice Command';
						case 'settings': return 'Settings';
						case 'help': return 'Help';
						case 'logout': return 'Log out';
						default: return 'Dashboard';
					}
				})()} />
				{
					(() => {
						switch(activeTab) {
							case 'tasks':
								return <TaskQueue />;
							case 'robot-map':
								return <RobotMap />;
							case 'monitoring':
								return <Monitoring />;
							case 'reports':
								return <Reports />;
							case 'voice-command':
								return <VoiceCommandWidget />;
							case 'settings':
								return <Settings />;
							case 'help':
								return <Help />;
							case 'logout':
								return <Logout />;
							default:
								return <Dashboard setActiveTab={setActiveTab} />;
						}
					})()
				}
				</div>
			</div>
		</ThemeProvider>
	)
}

export default App
