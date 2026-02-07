import { Project } from '../info';

export const shuttle: Project = {
  id: 'shuttle',
  category: 'freelance',
  title: 'Shuttle - Real-time Hotel Transport System',
  github: 'private',
  description:
    '🚧 Ongoing - Complex multi-platform shuttle management system with real-time tracking, WebSocket communications, and Google Maps integration. 6 repositories managing guest transport logistics across hotels.',
  longDescription: `**⚠️ Project Status: Active Development** - An ongoing, sophisticated **real-time shuttle management ecosystem** handling complex hotel transport logistics with multi-platform architecture and live tracking capabilities.

## System Architecture:

### Multi-Platform Infrastructure (6 Repositories)
- **Server**: Node.js/Express backend with WebSocket real-time communication
- **Guest Portal**: Hotel selection and shuttle booking interface
- **Front Desk System**: Guest verification and request management
- **Driver Application**: Route management and live tracking interface
- **Admin Dashboard**: Comprehensive scheduling and analytics platform
- **Super Admin Panel**: Multi-hotel management and system configuration

## Real-time Logistics Flow:

### Booking & Verification Process
1. **Guest Request**: Guest selects hotel and requests shuttle through web portal
2. **Real-time Notification**: Request instantly appears on front desk system via WebSockets
3. **Verification**: Front desk verifies guest is staying at the hotel
4. **Driver Scheduling**: System assigns available drivers and schedules pickup
5. **Live Updates**: Guest receives real-time ETA and driver location tracking

### Advanced Tracking & Optimization
- **Live Location Tracking**: Real-time Google Maps integration showing driver position
- **ETA Calculations**: Dynamic time estimates based on traffic and location data
- **Seat Management**: Automatic handling when shuttle reaches capacity
- **Route Optimization**: Cost-efficient routing algorithms for multiple pickups
- **Pickup Precision**: Google Maps-based location selector for exact pickup points

## Technical Implementation:

### Real-time Communication
- **WebSocket Architecture**: Instant bi-directional communication across all platforms
- **Live Synchronization**: Real-time updates for scheduling, location, and status changes
- **Multi-user Chat**: Integrated communication between front desk, drivers, and guests
- **Event Broadcasting**: System-wide notifications for booking changes and updates

### Google Maps Integration
- **Live Tracking**: Real-time vehicle location with map visualization
- **Precise Location Selection**: Advanced pickup point selection interface
- **Route Optimization**: Intelligent routing for cost and time efficiency
- **ETA Accuracy**: Dynamic time calculations with traffic data integration

### Administrative Features
- **Full UI Calendar**: Comprehensive event scheduling with drag-and-drop interface
- **Analytics Dashboard**: Detailed performance metrics and operational insights
- **Multi-hotel Management**: Super admin controls for creating and managing hotel properties
- **Driver Performance**: Tracking and analytics for driver efficiency and ratings

## Advanced System Features:

### Capacity & Resource Management
- **Intelligent Scheduling**: Automatic driver assignment based on availability and location
- **Seat Optimization**: Real-time capacity management with overflow handling
- **Multi-hotel Coordination**: Cross-property shuttle sharing for efficiency
- **Peak Time Management**: Dynamic resource allocation during high-demand periods

### User Experience Optimization
- **Role-based Interfaces**: Customized dashboards for each user type (guest, driver, admin)
- **Mobile-first Design**: Responsive interfaces optimized for on-the-go usage
- **Intuitive Workflows**: Streamlined processes for quick booking and management
- **Real-time Feedback**: Instant status updates and notifications throughout the journey

## Deployment & Infrastructure:
- **AWS VM Deployment**: Complete end-to-end deployment on cloud infrastructure
- **Scalable Architecture**: Built to handle multiple hotels and high concurrent usage
- **Performance Optimization**: Efficient WebSocket management and database queries
- **Security Implementation**: Secure communication and data protection across all platforms

## Business Impact:
Revolutionizing hotel transport logistics by providing guests with Uber-like convenience while giving hotels complete control over their shuttle operations. The system reduces operational costs through intelligent routing while significantly improving guest satisfaction through real-time tracking and communication.

*This project demonstrates expertise in complex real-time systems, multi-platform development, advanced mapping integration, and sophisticated logistics management - showcasing the ability to build enterprise-level transportation solutions.*`,
  tags: [
    'Real-time',
    'WebSockets',
    'Google Maps',
    'Multi-Platform',
    'Logistics',
    'Hotel Management',
  ],
  features: [
    'Real-time WebSocket communication across 6 platforms',
    'Live Google Maps tracking and location selection',
    'Multi-role management (Guest, Driver, Front Desk, Admin, Super Admin)',
    'Advanced seat capacity and resource optimization',
    'Integrated chat system between all user types',
    'Full UI calendar with comprehensive event scheduling',
    'AWS VM deployment with scalable architecture',
    'Dynamic ETA calculations and route optimization',
    'Multi-hotel management and analytics dashboard',
    'Precise pickup location selector with Google Maps integration',
  ],
  techStack: [
    'Node.js',
    'Express.js',
    'WebSockets',
    'Next.js',
    'Google Maps API',
    'AWS VM',
    'Real-time Analytics',
    'Multi-Platform Architecture',
  ],
  views: 0,
  date: 'Jul 22, 2025',
  repoCount: 6,
};
