# ⛰️ Mountain Trekker - Mountain Check-in App

> 🚀 **Vibe Coding**
> Through the Trae editor, the full process development from requirements analysis, architecture design to code implementation is realized.
> English | [中文](./README.md)

Mountain Trekker is a check-in application designed for mountain climbing enthusiasts. It helps users record their climbing journeys, track check-in progress, and analyze climbing data. Features include a map display of famous mountains nationwide, check-in records, and statistical data analysis.

[![GitHub](https://img.shields.io/badge/GitHub-mountains--journey-black?style=for-the-badge&logo=github)](https://github.com/xmwMing/mountains-journey)
[![Vue](https://img.shields.io/badge/Vue-3.5+-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.90+-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

## 🚀 Core Features

### 🗺️ Map Features
- **Nationwide Mountain Display** - Shows locations and elevation of famous mountains nationwide
- **Smart Search** - Search and filter by mountain name, province, and city
- **Detailed Information** - Click mountains to view geographic location, elevation, difficulty, and more
- **Real-time Updates** - Dynamically update filter results for quick mountain location

### ✅ Check-in Features
- **Mountain Check-in** - Record climbing time and notes
- **Check-in Animation** - Beautiful animation effects upon successful check-in
- **History Records** - View complete check-in history
- **Record Management** - Delete individual check-in records with confirmation prompts

### 📊 Statistical Analysis
- **Data Overview** - Number of checked-in mountains, check-in percentage, total elevation climbed
- **Elevation Ranking** - TOP10 bar chart of checked-in mountains by elevation
- **Timeline** - Line chart showing check-in timeline and climbing journey
- **Tag Cloud** - Tag cloud display of checked-in mountain names
- **Data Visualization** - Professional charts based on ECharts

### 🔍 Search & Filter
- **Real-time Search** - Filter mountains by name in real-time
- **Province Filter** - Quickly locate mountains by province
- **City Filter** - City options automatically update based on selected province
- **One-click Reset** - Quickly clear all filter conditions

### 🔐 User Authentication
- **Secure Login** - User authentication system based on Supabase Auth
- **Session Management** - Automatic detection and recovery of user sessions
- **Data Isolation** - Each user's check-in data is stored independently

### 📱 Responsive Design
- **Multi-device Adaptation** - Perfectly adapted for desktop and mobile
- **Mobile Optimization** - Optimized interaction experience and touch operations for mobile
- **Smooth Animations** - Carefully designed transition animations and loading effects

## 🛠️ Tech Stack

### Frontend Technologies
- **Framework**: Vue 3.5+ (Composition API)
- **Language**: TypeScript 5.9+
- **Build Tool**: Vite 7.2+
- **Routing**: Vue Router 4.6+
- **State Management**: Pinia 3.0+
- **Local Storage**: LocalForage 1.10+

### Backend Services
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time Subscription**: Supabase Realtime

### Map & Visualization
- **Map Service**: AMap (高德地图)
- **Data Visualization**: ECharts 6.0+

### Development Tools
- **Type Checking**: TypeScript Compiler
- **Code Standards**: ESLint + Prettier

## 🚀 Quick Start

### Requirements

- Node.js >= 16.0.0
- npm >= 8.0.0

### Local Development

```bash
# Clone the project
git clone https://github.com/xmwMing/mountains-journey.git
cd mountains-journey

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env file and add your API keys

# Start development server
npm run dev
```

### Build & Deploy

```bash
# Type check + build
npm run build

# Preview build
npm run preview
```

## 🔧 Environment Variables

Create a `.env` file in the project root directory and configure the following environment variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AMap Configuration
VITE_AMAP_KEY=your_amap_api_key
```

### Getting API Keys

#### Supabase
1. Visit [Supabase](https://supabase.com/) and create an account
2. Create a new project
3. Get API URL and anon key from project settings

#### AMap (高德地图)
1. Visit [AMap Open Platform](https://lbs.amap.com/)
2. Register and create an application
3. Select Web端 (JS API)
4. Get API Key

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── AmapView.vue        # Map component
│   ├── AuthForm.vue        # Login/Registration form
│   ├── CheckinHistory.vue  # Check-in records component
│   ├── Navbar.vue          # Navigation bar component
│   ├── PeakInfo.vue        # Mountain info component
│   └── PeakSearch.vue      # Search filter component
├── config/              # Configuration files
│   └── supabase.ts         # Supabase client configuration
├── store/               # State management
│   ├── auth.ts             # Authentication state management
│   └── mountains.ts        # Mountain and check-in data management
├── types/               # TypeScript type definitions
│   └── index.ts            # Core type declarations
├── views/               # Page views
│   ├── LoginView.vue       # Login page
│   ├── MapView.vue         # Map page
│   └── StatsView.vue       # Statistics page
├── App.vue              # Root component
└── main.ts              # Application entry
```

### Core Module Descriptions

#### 1. Authentication System (`store/auth.ts`)
- User authentication based on Supabase Auth
- Automatic session detection and recovery
- Login/Registration/Logout functionality
- Session state persistence

#### 2. Mountain Data Management (`store/mountains.ts`)
- Loading and caching of mountain data
- CRUD operations for check-in records
- Real-time calculation of statistical data
- Local caching optimization for data

#### 3. Map Component (`components/AmapView.vue`)
- AMap integration
- Mountain marker display
- Click interaction handling
- Map zoom and pan

#### 4. Statistics Visualization (`views/StatsView.vue`)
- ECharts chart integration
- Multi-dimensional data display
- Responsive chart adaptation
- Data animation effects

## 🚀 Deployment Guide

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/xmwMing/mountains-journey&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY,VITE_AMAP_KEY&envDescription=Supabase%20and%20AMap%20API%20keys)

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/xmwMing/mountains-journey)

> 📖 For detailed deployment guide, see: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📊 Database Design

### Table Structure

#### `peaks` Table
```sql
CREATE TABLE peaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  province VARCHAR(100),
  city VARCHAR(100),
  elevation INTEGER,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  description TEXT,
  difficulty VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `checkins` Table
```sql
CREATE TABLE checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  peak_id UUID REFERENCES peaks(id) ON DELETE CASCADE,
  checkin_date TIMESTAMP DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎯 Development Guide

### Adding New Mountains

1. Add mountain data to the `peaks` table in Supabase database
2. Ensure correct latitude and longitude coordinates
3. Set appropriate elevation and difficulty levels

### Extending Statistics Features

1. Add new computed properties in `store/mountains.ts`
2. Add new chart components in `views/StatsView.vue`
3. Use ECharts API to configure chart styles

### Customizing Map Styles

1. Modify map configuration in `components/AmapView.vue`
2. Adjust marker styles and info windows
3. Add custom layers or controls

## 📈 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=xmwMing/mountains-journey&type=Date)](https://www.star-history.com/#xmwMing/mountains-journey&Date)

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/) - Progressive JavaScript framework
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [AMap](https://lbs.amap.com/) - Professional map service
- [ECharts](https://echarts.apache.org/) - Powerful data visualization library
- [Pinia](https://pinia.vuejs.org/) - Vue state management library

## 📄 License

MIT License

## 📞 Contact

For questions or suggestions, please:
- Submit an [Issue](https://github.com/xmwMing/mountains-journey/issues)
- Start a [Pull Request](https://github.com/xmwMing/mountains-journey/pulls)
- Contact project maintainers

---

**⛰️ Mountain Trekker** - Record every climb, witness growth journey
