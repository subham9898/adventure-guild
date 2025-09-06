import { Routes, Route, Link } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import { QuestProvider } from './contexts/QuestContext'
import { OrganizationProvider } from './contexts/OrganizationContext'
import Dashboard from './pages/Dashboard'
import QuestBoard from './pages/QuestBoard'
import Guilds from './pages/Guilds'
import GuildHall from './pages/GuildHall'
import Organization from './pages/Organization'

function App() {
  return (
    <UserProvider>
      <QuestProvider>
        <OrganizationProvider>
          <div className="min-h-screen gradient-bg text-white">
            {/* Navigation */}
            <nav className="border-b border-white/20 p-4 backdrop-blur-xl bg-white/15 sticky top-0 z-50 shadow-xl">
              <div className="container mx-auto flex flex-wrap items-center justify-between">
                <Link to="/" className="text-4xl font-bold glow gradient-text animate-float">
                  Adventure Guild
                </Link>
                <div className="flex flex-wrap space-x-2 mt-4 md:mt-0">
                  <Link to="/" className="px-5 py-3 rounded-xl btn-hover bg-white/25 backdrop-blur-lg hover:bg-white/35 transition-all transform hover:scale-105 shadow-lg">
                    <span className="font-bold">Dashboard</span>
                  </Link>
                  <Link to="/quests" className="px-5 py-3 rounded-xl btn-hover bg-white/25 backdrop-blur-lg hover:bg-white/35 transition-all transform hover:scale-105 shadow-lg">
                    <span className="font-bold">Quest Board</span>
                  </Link>
                  <Link to="/guilds" className="px-5 py-3 rounded-xl btn-hover bg-white/25 backdrop-blur-lg hover:bg-white/35 transition-all transform hover:scale-105 shadow-lg">
                    <span className="font-bold">Guilds</span>
                  </Link>
                  <Link to="/guild-hall" className="px-5 py-3 rounded-xl btn-hover bg-white/25 backdrop-blur-lg hover:bg-white/35 transition-all transform hover:scale-105 shadow-lg">
                    <span className="font-bold">Guild Hall</span>
                  </Link>
                  <Link to="/organization" className="px-5 py-3 rounded-xl btn-hover bg-white/25 backdrop-blur-lg hover:bg-white/35 transition-all transform hover:scale-105 shadow-lg">
                    <span className="font-bold">Organization</span>
                  </Link>
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto p-6 animate-fade-in">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/quests" element={<QuestBoard />} />
                <Route path="/guilds" element={<Guilds />} />
                <Route path="/guild-hall" element={<GuildHall />} />
                <Route path="/organization" element={<Organization />} />
              </Routes>
            </main>
          </div>
        </OrganizationProvider>
      </QuestProvider>
    </UserProvider>
  )
}

export default App