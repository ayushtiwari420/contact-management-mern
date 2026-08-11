# Contact Management MERN Application

A full-stack contact management application built with the MERN stack (MongoDB, Express, React, Node.js). Manage, organize, and track all your important contacts in one place.

## 🎯 Features

- ✨ **Full CRUD Operations**: Create, Read, Update, Delete contacts
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🔍 **Search & Filter**: Find contacts quickly with powerful search
- 📋 **Contact Organization**: Categorize and tag contacts
- 🔐 **Secure Storage**: MongoDB database for safe data storage
- 📧 **Contact Information**: Store phone, email, address, and notes
- 🎨 **Modern UI**: Clean and intuitive user interface
- ⚡ **Fast Performance**: Optimized for speed and efficiency

## 🛠️ Tech Stack

### Frontend
- **React**: UI library
- **JavaScript**: ES6+
- **HTML5 & CSS3**: Markup and styling
- **Axios**: HTTP client for API requests

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB

## 📦 Installation

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running
- Git installed

### Clone and Setup

```bash
# Clone the repository
git clone https://github.com/ayushtiwari420/contact-management-mern.git

# Navigate to the project directory
cd contact-management-mern

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## 🚀 Usage

### Start MongoDB
```bash
# Make sure MongoDB is running
mongod
```

### Start Backend Server
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

### Start Frontend Application
```bash
cd frontend
npm start
# Application opens at http://localhost:3000
```

## 📋 API Endpoints

### Contacts
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get a specific contact
- `POST /api/contacts` - Create a new contact
- `PUT /api/contacts/:id` - Update a contact
- `DELETE /api/contacts/:id` - Delete a contact

## 💾 Database Schema

### Contact Model
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  category: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 User Interface

- **Dashboard**: Overview of all contacts
- **Add Contact**: Form to create new contacts
- **Edit Contact**: Modify existing contact information
- **Delete Contact**: Remove contacts from the system
- **Search Bar**: Quick search functionality
- **Filter Options**: Sort and organize contacts

## 🔐 Security Features

- Input validation
- Error handling
- Secure API endpoints
- Data persistence with MongoDB

## 🧪 Testing

```bash
# Run tests (if configured)
npm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Fork the repository
- Create a feature branch
- Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- MERN stack documentation
- React community
- Express.js documentation
- MongoDB documentation

---

**Manage your contacts efficiently! 📞**