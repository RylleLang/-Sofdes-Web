import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import InfoIcon from '@mui/icons-material/Info';

interface RobotData {
  position: { x: number; y: number };
  speed: number;
  load: number;
  floor: string;
  status: 'active' | 'paused' | 'stopped';
  battery?: number;
  connected?: boolean;
}

function RobotStatusWidget() {
  const [robotData, setRobotData] = useState<RobotData>({
    position: { x: 43.3, y: -1.8 },
    speed: 0.6,
    load: 3.2,
    floor: 'Floor 3',
    status: 'active'
  });

  // Firebase integration for real-time data
  useEffect(() => {
    const db = getDatabase();
    const robotRef = ref(db, '/robot');

    const unsubscribe = onValue(robotRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRobotData(prev => ({
          ...prev,
          ...data,
          position: data.position || prev.position,
          speed: data.speed || prev.speed,
          load: data.load || prev.load,
          floor: data.floor || prev.floor,
          status: data.status || prev.status
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleControlAction = (action: 'pause' | 'resume' | 'stop') => {
    // Here you would typically send commands to your robot control system
    console.log(`Robot ${action} command sent`);
    // For now, just update local state
    setRobotData(prev => ({
      ...prev,
      status: action === 'pause' ? 'paused' : action === 'resume' ? 'active' : 'stopped'
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#7bb662';
      case 'paused': return '#f0dd0f';
      case 'stopped': return '#e53935';
      default: return '#3513e1';
    }
  };

  return (
    <div className="widget robot-status-widget">
      <h1>Robot Status</h1>
      
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-info">
          <div className="status-item">
            <MyLocationIcon fontSize="small" style={{ color: '#3513e1' }} />
            <span>Position: X: {robotData.position.x}, Y: {robotData.position.y}</span>
          </div>
          <span className="robot-id">ID: MED-001</span>
        </div>
        
        <div className="control-buttons">
          <button 
            className="control-btn pause-btn"
            onClick={() => handleControlAction('pause')}
            disabled={robotData.status === 'paused' || robotData.status === 'stopped'}
            title="Pause Robot"
          >
            <PauseIcon fontSize="small" />
          </button>
          <button 
            className="control-btn resume-btn"
            onClick={() => handleControlAction('resume')}
            disabled={robotData.status === 'active'}
            title="Resume Robot"
          >
            <PlayArrowIcon fontSize="small" />
          </button>
          <button 
            className="control-btn stop-btn"
            onClick={() => handleControlAction('stop')}
            title="Emergency Stop"
          >
            <StopIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* Status Grid */}
      <div className="status-grid">
        <div className="status-item-widget">
          <div className="widget-icon speed-icon">
            <SpeedIcon fontSize="medium" />
          </div>
          <div className="widget-content">
            <div className="widget-value">{robotData.speed} m/s</div>
            <div className="widget-label">Speed</div>
            <div className="widget-status" style={{ color: getStatusColor(robotData.status) }}>
              {robotData.status}
            </div>
          </div>
        </div>

        <div className="status-item-widget">
          <div className="widget-icon load-icon">
            <LocalShippingIcon fontSize="medium" />
          </div>
          <div className="widget-content">
            <div className="widget-value">{robotData.load} kg</div>
            <div className="widget-label">Load</div>
            <div className="widget-status" style={{ color: robotData.load > 0 ? '#7bb662' : '#f0dd0f' }}>
              {robotData.load > 0 ? 'loaded' : 'empty'}
            </div>
          </div>
        </div>

        <div className="status-item-widget">
          <div className="widget-icon location-icon">
            <LocationOnIcon fontSize="medium" />
          </div>
          <div className="widget-content">
            <div className="widget-value">{robotData.floor}</div>
            <div className="widget-label">Location</div>
            <div className="widget-status" style={{ color: '#3513e1' }}>
              positioned
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RobotStatusWidget;
