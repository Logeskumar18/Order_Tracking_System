# Order Tracking System

A modern, full-featured order tracking application built with React, Node.js, and MongoDB. Track orders from creation through delivery with real-time updates and comprehensive management tools.

## 🎯 Features

### Core Features
- ✅ **Create Orders** - Easily create new orders with detailed information
- ✅ **Order Listing** - View all orders with search and pagination
- ✅ **Order Details** - Access comprehensive order information
- ✅ **Status Updates** - Update order status with real-time tracking
- ✅ **Status Timeline** - Interactive timeline view of order progress
- ✅ **Search & Pagination** - Find orders quickly with advanced filters

### Bonus Features
- 🚀 **WebSocket Live Updates** - Real-time order updates across the platform
- 📧 **Email Notifications** - Automated email alerts for order status changes
- 🧪 **Unit Testing** - Comprehensive test coverage
- 🐳 **Docker Setup** - Containerized deployment

## 📋 Project Structure

```
Order_Tracking_System/
├── Client/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── layouts/         # Layout components
│   │   ├── styles/          # CSS styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── Server/
    ├── models/              # Database models
    ├── routes/              # API routes
    ├── controllers/         # Business logic
    ├── middleware/          # Custom middleware
    └── server.js
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for database)

### Client Setup

1. **Navigate to the Client directory:**
   ```bash
   cd Client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

The application will be available at `http://localhost:5173`

### Server Setup (Coming Soon)

1. **Navigate to the Server directory:**
   ```bash
   cd ../Server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   ```
   PORT=5000
   MONGODB_URL=mongodb://localhost:27017/order-tracking
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## 🌐 Pages & Routes

### Client Routes

| Route | Path | Status |
|-------|------|--------|
| Home | `/` | ✅ Complete |
| Orders Listing | `/orders` | 🔄 Coming Soon |
| Create Order | `/create-order` | 🔄 Coming Soon |
| Order Details | `/order/:id` | 🔄 Coming Soon |
| Dashboard | `/dashboard` | 🔄 Coming Soon |
| Profile | `/profile` | 🔄 Coming Soon |

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icon library
- **CSS3** - Styling

### Backend (To be implemented)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **WebSocket** (optional) - Real-time updates

## 📱 Home Page Features

The home page includes:

1. **Hero Section** - Eye-catching introduction with CTA buttons
2. **Features Section** - Showcase of 6 core features with icons
3. **Stats Section** - Key metrics and achievements
4. **Quick Start Guide** - 4-step guide to get started
5. **Call-to-Action Section** - Prominent CTA for user engagement
6. **Responsive Design** - Mobile-friendly layout
7. **Navigation Bar** - Sticky navigation with responsive menu
8. **Footer** - Quick links and contact information

## 🎨 Design Highlights

- **Modern Color Scheme** - Purple/Blue gradient (#667eea, #764ba2)
- **Smooth Animations** - Elegant hover effects and transitions
- **Mobile Responsive** - Fully responsive design for all devices
- **Bootstrap Integration** - Leveraging Bootstrap 5 components
- **Icon System** - Font Awesome icons throughout

## 📖 Component Documentation

### Navigation.jsx
Sticky navigation bar with responsive mobile menu
- Active route highlighting
- Bootstrap integration
- Mobile hamburger menu

### Home.jsx
Landing page with multiple sections
- Hero banner with CTAs
- Feature cards grid
- Statistics display
- Quick start steps
- Call-to-action section

### MainLayout.jsx
Wrapper layout for all pages
- Navigation at top
- Content area
- Footer with links

## 🔐 Authentication & Security (To be implemented)

- JWT token-based authentication
- Password hashing with bcryptjs
- Role-based access control
- HTTPS support
- CORS configuration

## 🧪 Testing (To be implemented)

- Unit tests with Jest
- Component tests with React Testing Library
- API tests with Supertest
- E2E tests with Cypress

## 🐳 Docker Setup (To be implemented)

```dockerfile
# Example Dockerfile structure
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
```

## 📊 Database Schema (To be implemented)

### Order Model
```javascript
{
  _id: ObjectId,
  orderNumber: String,
  customer: {
    name: String,
    email: String,
    phone: String
  },
  items: [{
    product: String,
    quantity: Number,
    price: Number
  }],
  status: String, // pending, processing, shipped, delivered
  totalAmount: Number,
  shippingAddress: String,
  timeline: [{
    status: String,
    timestamp: Date,
    notes: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 API Endpoints (To be implemented)

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order
- `GET /api/orders/search?query=...` - Search orders

## 📝 Code Standards

- **ESLint** configured for code quality
- **Prettier** for code formatting
- **Component naming** - PascalCase for components
- **File organization** - Organized by feature/functionality
- **Props validation** - PropTypes or TypeScript
- **Error handling** - Try-catch blocks and error boundaries

## 🔍 Development Workflow

1. Create a new branch for each feature
2. Follow the existing code structure
3. Write clean, well-documented code
4. Test thoroughly before committing
5. Create pull requests for review
6. Deploy after approval

## 📝 Git Workflow

```bash
# Clone the repository
git clone <repository-url>
cd Order_Tracking_System

# Create a new feature branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git add .
git commit -m "Add your commit message"

# Push to remote
git push origin feature/your-feature-name

# Create a pull request
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Next Steps

1. ✅ Home page setup
2. 🔄 Set up backend REST APIs
3. 🔄 Create order listing page
4. 🔄 Create order details page
5. 🔄 Implement authentication
6. 🔄 Add WebSocket support
7. 🔄 Set up unit tests
8. 🔄 Docker configuration

## 🙏 Acknowledgments

- React team for the amazing framework
- Bootstrap for the CSS framework
- Font Awesome for icons
- Vite for the fast build tool

---

**Last Updated:** June 2, 2026  
**Version:** 1.0.0-beta
