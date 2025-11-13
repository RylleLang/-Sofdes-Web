import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

interface TaskCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: any) => void;
}

interface TaskFormData {
  nurseName: string;
  selectedSupplies: string[];
  sourceLocation: string;
  destinationRooms: string[];
  priority: 'NORMAL' | 'URGENT';
  notes: string;
}

const MEDICAL_SUPPLIES = [
  'Syringes (5ml)',
  'Bandages',
  'Morphine 10mg',
  'IV Fluids',
  'Gloves',
  'Antiseptic Solution',
  'Gauze Pads',
  'Thermometer'
];

const SOURCE_LOCATIONS = [
  'Supply Room',
  'Pharmacy',
  'Storage Room'
];

const DESTINATION_ROOMS = [
  'Room A1',
  'Room A2',
  'Room A3',
  'Room B1',
  'Room B2',
  'ICU',
  'Emergency Room'
];

function TaskCreationModal({ isOpen, onClose, onSubmit }: TaskCreationModalProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    nurseName: '',
    selectedSupplies: [],
    sourceLocation: '',
    destinationRooms: [],
    priority: 'NORMAL',
    notes: ''
  });

  const handleSupplyToggle = (supply: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSupplies: prev.selectedSupplies.includes(supply)
        ? prev.selectedSupplies.filter(s => s !== supply)
        : [...prev.selectedSupplies, supply]
    }));
  };

  const handleDestinationToggle = (room: string) => {
    setFormData(prev => ({
      ...prev,
      destinationRooms: prev.destinationRooms.includes(room)
        ? prev.destinationRooms.filter(r => r !== room)
        : [...prev.destinationRooms, room]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nurseName || !formData.sourceLocation || formData.destinationRooms.length === 0) {
      alert('Please fill in all required fields');
      return;
    }
    
    const taskData = {
      ...formData,
      id: `TASK-${Math.floor(Math.random() * 1000000)}`,
      timestamp: new Date().toLocaleString(),
      status: 'pending'
    };
    
    onSubmit(taskData);
    setFormData({
      nurseName: '',
      selectedSupplies: [],
      sourceLocation: '',
      destinationRooms: [],
      priority: 'NORMAL',
      notes: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Supply Request System</h2>
          <p>Request robot delivery of medical supplies to patient rooms</p>
          <button className="close-btn" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-section">
            <h3>Nurse Information</h3>
            <input
              type="text"
              placeholder="Enter nurse name *"
              value={formData.nurseName}
              onChange={(e) => setFormData(prev => ({ ...prev, nurseName: e.target.value }))}
              required
              className="form-input"
            />
          </div>

          <div className="form-section">
            <h3>Medical Supplies</h3>
            <div className="supply-grid">
              {MEDICAL_SUPPLIES.map(supply => (
                <button
                  key={supply}
                  type="button"
                  className={`supply-btn ${formData.selectedSupplies.includes(supply) ? 'selected' : ''}`}
                  onClick={() => handleSupplyToggle(supply)}
                >
                  {supply}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>Source Location</h3>
            <div className="location-row">
              {SOURCE_LOCATIONS.map(location => (
                <button
                  key={location}
                  type="button"
                  className={`location-btn ${formData.sourceLocation === location ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, sourceLocation: location }))}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>Destination Rooms</h3>
            <div className="room-grid">
              {DESTINATION_ROOMS.map(room => (
                <button
                  key={room}
                  type="button"
                  className={`room-btn ${formData.destinationRooms.includes(room) ? 'selected' : ''}`}
                  onClick={() => handleDestinationToggle(room)}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>Priority</h3>
            <div className="priority-row">
              <button
                type="button"
                className={`priority-btn ${formData.priority === 'NORMAL' ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, priority: 'NORMAL' }))}
              >
                NORMAL
              </button>
              <button
                type="button"
                className={`priority-btn urgent ${formData.priority === 'URGENT' ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, priority: 'URGENT' }))}
              >
                URGENT
              </button>
            </div>
          </div>

          <div className="form-section">
            <h3>Notes (Optional)</h3>
            <textarea
              placeholder="Additional notes or special instructions..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="form-textarea"
              rows={3}
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Delivery Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskCreationModal;
