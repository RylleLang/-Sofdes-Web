import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewListIcon from '@mui/icons-material/ViewList';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MapIcon from '@mui/icons-material/Map';
import MonitoringIcon from '@mui/icons-material/MonitorHeart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MicIcon from '@mui/icons-material/Mic';
type Tabs = 'dashboard' | 'tasks' | 'robot-map' | 'monitoring' | 'reports' | 'voice-command' | 'settings' | 'help' | 'logout';

type SidebarProps = {
	activeTab: Tabs;
	setActiveTab: (tab: Tabs) => void;
	sidebarOpen: boolean;
	setSidebarOpen: (open: boolean) => void;
};

function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }: SidebarProps) {
	const getIcon = (icon: Tabs) => {
		switch(icon) {
			case 'dashboard':
				return <DashboardIcon fontSize='large' />;
			case 'tasks':
				return <ViewListIcon fontSize='large' />;
			case 'robot-map':
				return <MapIcon fontSize='large' />;
			case 'monitoring':
				return <MonitoringIcon fontSize='large' />;
			case 'reports':
				return <AssessmentIcon fontSize='large' />;
			case 'voice-command':
				return <MicIcon fontSize='large' />;
			case 'settings':
				return <SettingsIcon fontSize='large' />;
			case 'help':
				return <HelpIcon fontSize='large' />;
			case 'logout':
				return <LogoutIcon fontSize='large' />;
			default:
				return <ErrorOutlineIcon fontSize='large' />
		}
	}
	const getTabDisplay = (name: string, icon: Tabs) => {
		return (
			<div className='tab-full'>
				{getIcon(icon)}
				{(() => {if (sidebarOpen) return <h1 className='name'>{name}</h1>})()}
			</div>
		)
	};
	return (
	<div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`} onMouseEnter={() => setSidebarOpen(true)} onMouseLeave={() => setSidebarOpen(false)}>
		<nav className='sidebar-content'>
			<button onClick={() => setActiveTab('dashboard')} className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}>
				{getTabDisplay("Dashboard", 'dashboard')}
			</button>
			<button onClick={() => setActiveTab('tasks')} className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}>
				{getTabDisplay("Task Queue", 'tasks')}
			</button>
			<button onClick={() => setActiveTab('robot-map')} className={`tab-btn ${activeTab === 'robot-map' ? 'active' : ''}`}>
				{getTabDisplay("Robot Map", 'robot-map')}
			</button>
			<button onClick={() => setActiveTab('monitoring')} className={`tab-btn ${activeTab === 'monitoring' ? 'active' : ''}`}>
				{getTabDisplay("Monitoring", 'monitoring')}
			</button>
			<button onClick={() => setActiveTab('reports')} className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}>
				{getTabDisplay("Reports", 'reports')}
			</button>
			<button onClick={() => setActiveTab('voice-command')} className={`tab-btn ${activeTab === 'voice-command' ? 'active' : ''}`}>
				{getTabDisplay("Voice Command", 'voice-command')}
			</button>
			<div className="sidebar-separator"></div>
			<button onClick={() => setActiveTab('settings')} className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}>
				{getTabDisplay("Settings", 'settings')}
			</button>
			<button onClick={() => setActiveTab('help')} className={`tab-btn ${activeTab === 'help' ? 'active' : ''}`}>
				{getTabDisplay("Help", 'help')}
			</button>
			<button onClick={() => setActiveTab('logout')} className={`tab-btn ${activeTab === 'logout' ? 'active' : ''}`}>
				{getTabDisplay("Log out", 'logout')}
			</button>
		</nav>
	</div>
	);
};


export default Sidebar;