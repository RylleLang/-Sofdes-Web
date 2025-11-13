import { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import HistoryIcon from '@mui/icons-material/History';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';

interface VoiceCommand {
	id: string;
	command: string;
	timestamp: number;
	sentToBot?: boolean;
}

interface RobotData {
	position: { x: number; y: number };
	speed: number;
	load: number;
	floor: string;
	status: 'active' | 'paused' | 'stopped';
	battery?: number;
	connected?: boolean;
}

declare global {
	interface Window {
		SpeechRecognition: any;
		webkitSpeechRecognition: any;
	}
}

function VoiceCommandWidget() {
	const [isListening, setIsListening] = useState(false);
	const [transcript, setTranscript] = useState('');
	const [interimTranscript, setInterimTranscript] = useState('');
	const [commands, setCommands] = useState<VoiceCommand[]>([]);
	const [recognition, setRecognition] = useState<any>(null);
	const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'unknown'>('unknown');
	const [robotData, setRobotData] = useState<RobotData>({
		position: { x: 43.3, y: -1.8 },
		speed: 0.6,
		load: 3.2,
		floor: 'Floor 3',
		status: 'active',
		battery: 85,
		connected: true
	});

	useEffect(() => {
		// Check microphone permission
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ audio: true })
				.then(() => setMicPermission('granted'))
				.catch(() => setMicPermission('denied'));
		}

		// Initialize speech recognition
		if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
			const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
			rec.continuous = false;
			rec.interimResults = true;
			rec.lang = 'en-US';
			setRecognition(rec);
		}

		// Load previous commands from localStorage first
		const savedCommands = localStorage.getItem('voiceCommands');
		if (savedCommands) {
			setCommands(JSON.parse(savedCommands));
		}

		// Load previous commands from Firebase
		const db = getDatabase();
		const commandsRef = ref(db, 'voiceCommands');
		onValue(commandsRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				const loadedCommands = Object.keys(data).map(key => ({
					id: key,
					...data[key]
				})).sort((a, b) => b.timestamp - a.timestamp);
				setCommands(loadedCommands);
				localStorage.setItem('voiceCommands', JSON.stringify(loadedCommands));
			} else {
				setCommands([]);
				localStorage.removeItem('voiceCommands');
			}
		});

		// Load robot data from Firebase
		const robotRef = ref(db, '/robot');
		onValue(robotRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				setRobotData(prev => ({
					...prev,
					...data,
					position: data.position || prev.position,
					speed: data.speed || prev.speed,
					load: data.load || prev.load,
					floor: data.floor || prev.floor,
					status: data.status || prev.status,
					battery: data.battery || prev.battery,
					connected: data.connected !== undefined ? data.connected : prev.connected
				}));
			}
		});
	}, []);

	const startListening = () => {
		if (!recognition) {
			alert('Speech recognition not supported in this browser.');
			return;
		}

		recognition.onstart = () => {
			setIsListening(true);
			setTranscript('');
		};

		recognition.onresult = (event: any) => {
			let finalTranscript = '';
			let interimTranscript = '';

			for (let i = event.resultIndex; i < event.results.length; i++) {
				const transcript = event.results[i][0].transcript;
				if (event.results[i].isFinal) {
					finalTranscript += transcript;
				} else {
					interimTranscript += transcript;
				}
			}

			setTranscript(finalTranscript);
			setInterimTranscript(interimTranscript);
		};

		recognition.onend = () => {
			setIsListening(false);
			if (transcript.trim()) {
				saveCommand(transcript.trim());
			}
		};

		recognition.start();
	};

	const stopListening = () => {
		if (recognition) {
			recognition.stop();
		}
	};

	const saveCommand = (command: string) => {
		const db = getDatabase();
		const commandsRef = ref(db, 'voiceCommands');
		const newCommandRef = push(commandsRef, {
			command,
			timestamp: Date.now(),
			sentToBot: false
		});
		const newCommand = {
			id: newCommandRef.key!,
			command,
			timestamp: Date.now(),
			sentToBot: false
		};
		const updatedCommands = [newCommand, ...commands].sort((a, b) => b.timestamp - a.timestamp);
		setCommands(updatedCommands);
		localStorage.setItem('voiceCommands', JSON.stringify(updatedCommands));
	};

	const sendToBot = (commandId: string) => {
		if (!window.confirm('Are you sure you want to send this command to the bot?')) {
			return;
		}
		// Update the command in Firebase to mark it as sent
		const db = getDatabase();
		const commandRef = ref(db, `voiceCommands/${commandId}`);
		// For now, just mark as sent. In a real implementation, you'd send to the bot API
		// and handle the response
		setTimeout(() => {
			// Simulate sending to bot
			alert('Command sent to bot successfully!');
			// Update the command status in the local state
			setCommands(prev => prev.map(cmd =>
				cmd.id === commandId ? { ...cmd, sentToBot: true } : cmd
			));
		}, 500);
	};

	const formatTimestamp = (timestamp: number) => {
		return new Date(timestamp).toLocaleString();
	};

	return (
		<div className="voice-command-page">
			<div className="voice-command-header">
				<div className="header-top">
					<div className="robot-status-indicators">
						<div className="connection-indicator">
							{robotData.connected ? (
								<WifiIcon style={{ color: '#7bb662' }} />
							) : (
								<WifiOffIcon style={{ color: '#e53935' }} />
							)}
							<span>{robotData.connected ? 'Connected' : 'Disconnected'}</span>
						</div>
						<div className="battery-indicator">
							<BatteryFullIcon style={{ color: robotData.battery && robotData.battery > 20 ? '#7bb662' : '#e53935' }} />
							<span>{robotData.battery || 0}%</span>
						</div>
					</div>
				</div>
				<h1>Voice Commands for Robot Control</h1>
				<p>Give voice commands to control the robot. Commands are saved for reference.</p>
			</div>

			<div className="voice-command-controls">
				<div className="recording-section">
					<div className="recording-display">
						<div className={`mic-indicator ${isListening ? 'active' : ''}`}>
							<MicIcon fontSize="large" />
						</div>
						<div className="recording-info">
							<h3>{isListening ? 'Listening...' : 'Ready to Record'}</h3>
							{micPermission === 'denied' && (
								<div className="mic-permission-warning">
									<p style={{ color: '#e53935', fontSize: '12pt' }}>Microphone access denied. Please allow microphone access in your browser settings.</p>
								</div>
							)}
							{isListening && interimTranscript && (
								<div className="current-transcript interim">
									<p><strong>Listening:</strong> {interimTranscript}</p>
								</div>
							)}
						</div>
					</div>
					<div className="control-buttons">
						{!isListening ? (
							<button onClick={startListening} className="record-btn">
								<MicIcon />
								Start Recording
							</button>
						) : (
							<button onClick={stopListening} className="stop-btn">
								<StopIcon />
								Stop Recording
							</button>
						)}
					</div>
				</div>
			</div>

			{transcript && (
				<div className="current-command-section">
					<div className="current-command-display">
						<div className="current-command-content">
							<p><strong>Current Command:</strong> {transcript}</p>
							{(() => {
								const currentCmd = commands.find(cmd => cmd.command === transcript.trim());
								return currentCmd && !currentCmd.sentToBot ? (
									<button
										onClick={() => sendToBot(currentCmd.id)}
										className="send-to-bot-btn"
										disabled={isListening}
									>
										Send to Bot
									</button>
								) : currentCmd && currentCmd.sentToBot ? (
									<span className="sent-status">✓ Sent to Bot</span>
								) : null;
							})()}
						</div>
					</div>
				</div>
			)}

			<div className="command-history">
				<div className="history-header">
					<HistoryIcon />
					<h2>Command History</h2>
				</div>
				<div className="history-list">
					{commands.length === 0 ? (
						<p className="no-commands">No voice commands recorded yet.</p>
					) : (
						commands.map((cmd) => (
							<div key={cmd.id} className="command-item">
								<div className="command-content">
									<div className="command-text">"{cmd.command}"</div>
									<div className="command-time">{formatTimestamp(cmd.timestamp)}</div>
								</div>
								<div className="command-actions">
									{!cmd.sentToBot ? (
										<button
											onClick={() => sendToBot(cmd.id)}
											className="send-to-bot-btn"
											disabled={isListening}
										>
											Send to Bot
										</button>
									) : (
										<span className="sent-status">✓ Sent to Bot</span>
									)}
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default VoiceCommandWidget;
