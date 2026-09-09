import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'traffic-police-gesture',
    title: 'Traffic Police Gesture Recognition',
    subtitle: 'Real-time Autonomous Spatial Gesture Understanding',
    category: 'Computer Vision & Deep Learning',
    description: 'High-throughput computer vision pipeline that classifies traffic police arm signals and dynamic gestures from urban surveillance feeds to orchestrate adaptive smart-city traffic lights.',
    fullDescription: 'An end-to-end edge-compatible vision system engineered to interpret dynamic and static hand signals from traffic officers under adverse lighting, occlusion, and varying camera angles. Implements spatial temporal graph convolutional networks (ST-GCN) over MediaPipe keypoint coordinates and fine-tuned YOLOv8 bounding boxes, converting physical officer commands into prioritized digital traffic phase transitions.',
    architecture: [
      'Multi-stream video ingestion via OpenCV with GPU-accelerated decoding',
      'YOLOv8 object detector for officer posture and zone isolation',
      'Spatial-Temporal Graph Convolutional Network (ST-GCN) for dynamic sequence classification',
      'MQTT publisher for low-latency signal distribution to urban traffic controllers (<45ms latency)'
    ],
    keyFeatures: [
      '96.4% gesture classification accuracy across 12 distinct standard hand commands',
      'Robust performance in rain, night-time low illumination, and partial camera occlusion',
      'Real-time inference at 38+ FPS on edge hardware (NVIDIA Jetson Xavier)',
      'Telemetry dashboard with live bounding-box telemetry and confidence streams'
    ],
    metrics: [
      { label: 'Inference Speed', value: '38 FPS' },
      { label: 'Validation Accuracy', value: '96.4%' },
      { label: 'Latency', value: '42 ms' },
      { label: 'Gesture Classes', value: '12' }
    ],
    technologies: ['Python', 'PyTorch', 'OpenCV', 'MediaPipe', 'YOLOv8', 'CUDA', 'FastAPI', 'WebSockets'],
    githubUrl: 'https://github.com/Harshmishra214',
    liveUrl: 'https://github.com/Harshmishra214',
    iconName: 'Activity',
    accentColor: '#00f0ff',
    previewBadge: 'CV / Deep Learning'
  },
  {
    id: 'land-governance-gis',
    title: 'Land Governance GIS Platform',
    subtitle: 'Cadastral Spatial Analytics & Immutable Parcel Registry',
    category: 'Full-Stack GIS & Spatial Data',
    description: 'Geospatial web platform providing interactive cadastral parcel mapping, land demarcation validation, title provenance tracking, and spatial conflict resolution for urban governance.',
    fullDescription: 'Developed to eliminate boundary disputes and streamline land titling, this platform integrates spatial database engines with high-precision vector tile renderers. Citizens and land registrars can inspect parcel overlays, compute polygon overlap anomalies in real-time, audit historical boundary modifications, and generate legally certified spatial deeds.',
    architecture: [
      'PostgreSQL with PostGIS extensions for spatial indexing, R-Tree queries, and geometry validation',
      'Node.js & Express REST microservices handling geo-computations and multi-tenant authentication',
      'Vector tile streaming with Mapbox GL / Leaflet rendering 50,000+ parcels at 60 FPS',
      'Automated topology checker detecting parcel slivers, overlaps, and invalid polygon rings'
    ],
    keyFeatures: [
      'Sub-meter boundary precision with automated overlap and encroachment detection',
      'Historical timeline slider showing parcel subdivisions across decades',
      'Exportable geo-referenced PDF survey documents with cryptographic hash verification',
      'Role-based access control for surveyors, district registrars, and property owners'
    ],
    metrics: [
      { label: 'Parcels Mapped', value: '50K+' },
      { label: 'Spatial Query Time', value: '<60ms' },
      { label: 'Uptime Reliability', value: '99.9%' },
      { label: 'Dispute Reduction', value: '78%' }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'PostGIS', 'GeoJSON', 'Tailwind CSS', 'Docker'],
    githubUrl: 'https://github.com/Harshmishra214',
    liveUrl: 'https://github.com/Harshmishra214',
    iconName: 'Map',
    accentColor: '#10b981',
    previewBadge: 'GIS / Full-Stack'
  },
  {
    id: 'medical-records-platform',
    title: 'Medical Records Platform',
    subtitle: 'Secure EHR Architecture with Intelligent Clinical Parsing',
    category: 'Healthcare AI & Distributed Systems',
    description: 'HIPAA-compliant electronic health record (EHR) ecosystem featuring automated prescription OCR, clinical entity extraction, encrypted patient timelines, and role-based physician access.',
    fullDescription: 'A secure, mission-critical healthcare record management suite built to connect hospital departments, diagnostic laboratories, and patients. Utilizes transformer-based Clinical NER (Named Entity Recognition) to automatically structure unstructured physician notes, cross-reference medication contraindications, and maintain an immutable cryptographic access audit log.',
    architecture: [
      'AES-256 encrypted storage layer with field-level encryption for PHI (Protected Health Info)',
      'BioBERT / Clinical transformer microservice for diagnostic extraction and ICD-10 coding',
      'Distributed Node.js / Express API gateway with strict JWT token rotation and audit trails',
      'Responsive React frontend with real-time vitals visualization and DICOM scan viewer'
    ],
    keyFeatures: [
      'Automated extraction of lab values, medications, and dosages from scanned PDF reports',
      'Real-time contraindication warnings when conflicting pharmaceuticals are prescribed',
      'Biometric & MFA login with temporal access tokens for emergency ER attendants',
      'Patient portal with one-click export of consolidated longitudinal health summaries'
    ],
    metrics: [
      { label: 'NER Entity Accuracy', value: '94.2%' },
      { label: 'Data Encryption', value: 'AES-256' },
      { label: 'Parsing Throughput', value: '1.2s/doc' },
      { label: 'Audit Log Integrity', value: '100%' }
    ],
    technologies: ['TypeScript', 'React', 'Python', 'PyTorch', 'Transformers', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Harshmishra214',
    liveUrl: 'https://github.com/Harshmishra214',
    iconName: 'FileText',
    accentColor: '#6366f1',
    previewBadge: 'Healthcare / NLP'
  },
  {
    id: 'attendance-cv-system',
    title: 'Attendance Computer Vision System',
    subtitle: 'Biometric Face Recognition & Anti-Spoofing Architecture',
    category: 'Computer Vision & Automation',
    description: 'High-speed automated attendance engine with multi-face detection, IR liveness confirmation, instantaneous logging, and comprehensive enterprise attendance reporting.',
    fullDescription: 'Engineered to replace slow fingerprint scanners and manual registers, this automated attendance suite leverages deep metric learning embeddings (FaceNet) coupled with dual-spectrum liveness checks (motion frequency + texture analysis). It detects and logs multiple individuals concurrently passing through a doorway or classroom portal within 300 milliseconds.',
    architecture: [
      'RetinaFace / MTCNN multi-stage detector for robust face alignment under rotational tilt',
      'FaceNet 512-dimensional embedding generator with cosine distance matching against indexed database',
      'Anti-spoofing pipeline classifying print attacks, digital screen replays, and silicone masks',
      'Automated scheduled report dispatch to database and administrative email summaries'
    ],
    keyFeatures: [
      'Multi-subject batch recognition: identifies up to 8 individuals simultaneously in one frame',
      '99.1% True Acceptance Rate (TAR) at 0.01% False Acceptance Rate (FAR)',
      'Sub-second attendance timestamp logging directly to PostgreSQL database',
      'Zero-touch operation with real-time audio and visual HUD verification notifications'
    ],
    metrics: [
      { label: 'Multi-Face Tracking', value: '8 Faces' },
      { label: 'Recognition Speed', value: '280 ms' },
      { label: 'Liveness Accuracy', value: '98.8%' },
      { label: 'False Accept Rate', value: '<0.01%' }
    ],
    technologies: ['Python', 'OpenCV', 'FaceNet', 'PyTorch', 'PostgreSQL', 'FastAPI', 'React', 'Docker'],
    githubUrl: 'https://github.com/Harshmishra214',
    liveUrl: 'https://github.com/Harshmishra214',
    iconName: 'Users',
    accentColor: '#ec4899',
    previewBadge: 'CV / Biometrics'
  }
];
