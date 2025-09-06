import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Unlock, Users, Shield, Sword, Star, Crown } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { Button } from '@/components/Button'

const Guilds = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  
  // Mock data
  const guilds = [
    {
      id: 1,
      name: "Frontend Masters",
      emblem: "🧙‍♂️",
      xp: 12500,
      members: 24,
      type: "Department",
      visibility: "public",
      description: "Specializing in React, Vue, and modern frontend frameworks"
    },
    {
      id: 2,
      name: "Backend Wizards",
      emblem: "⚡",
      xp: 9800,
      members: 18,
      type: "Department",
      visibility: "public",
      description: "Experts in Node.js, Python, and database optimization"
    },
    {
      id: 3,
      name: "Design Gurus",
      emblem: "🎨",
      xp: 8750,
      members: 15,
      type: "Special Interest",
      visibility: "public",
      description: "UI/UX specialists focused on creating beautiful experiences"
    },
    {
      id: 4,
      name: "DevOps Champions",
      emblem: "⚙️",
      xp: 7600,
      members: 12,
      type: "Project",
      visibility: "private",
      description: "CI/CD pipeline experts and cloud infrastructure specialists"
    },
    {
      id: 5,
      name: "Mobile Mavericks",
      emblem: "📱",
      xp: 6500,
      members: 10,
      type: "Special Interest",
      visibility: "public",
      description: "React Native, Flutter, and native mobile development"
    },
    {
      id: 6,
      name: "QA Knights",
      emblem: "🛡️",
      xp: 5400,
      members: 8,
      type: "Department",
      visibility: "private",
      description: "Testing automation and quality assurance specialists"
    }
  ]

  const filteredGuilds = activeFilter === 'all' 
    ? guilds 
    : guilds.filter(guild => {
        if (activeFilter === 'department') {
          return guild.type === 'Department'
        }
        if (activeFilter === 'public') {
          return guild.visibility === 'public'
        }
        return true
      })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold gradient-text mb-4">Guilds</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Join specialized groups to collaborate, learn, and grow with like-minded adventurers
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Button 
          onClick={() => setActiveFilter('all')}
          variant={activeFilter === 'all' ? 'default' : 'secondary'}
          className={`px-4 py-2 rounded-full ${activeFilter === 'all' ? 'glow pulse-glow' : ''}`}
        >
          All Guilds
        </Button>
        <Button 
          onClick={() => setActiveFilter('department')}
          variant={activeFilter === 'department' ? 'default' : 'secondary'}
          className={`px-4 py-2 rounded-full ${activeFilter === 'department' ? 'glow pulse-glow' : ''}`}
        >
          <Shield className="h-4 w-4 mr-1" />
          Department
        </Button>
        <Button 
          onClick={() => setActiveFilter('public')}
          variant={activeFilter === 'public' ? 'default' : 'secondary'}
          className={`px-4 py-2 rounded-full ${activeFilter === 'public' ? 'glow pulse-glow' : ''}`}
        >
          <Unlock className="h-4 w-4 mr-1" />
          Public
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuilds.map((guild, index) => (
          <motion.div
            key={guild.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="card-hover glow"
          >
            <Card className="h-full flex flex-col bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border-0">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="text-5xl p-3 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200">
                    {guild.emblem}
                  </div>
                  <div>
                    {guild.visibility === 'public' ? (
                      <Unlock className="h-6 w-6 text-green-500 glow" />
                    ) : (
                      <Lock className="h-6 w-6 text-red-500 glow" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-0">
                <CardTitle className="text-2xl font-bold text-gray-800">{guild.name}</CardTitle>
                <CardDescription className="mt-2 text-gray-600">{guild.description}</CardDescription>
                
                <div className="flex items-center mt-4 text-sm">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="font-medium">{guild.members} members</span>
                  <span className="mx-2">•</span>
                  <span className="bg-gradient-to-r from-primary-500 to-primary-600 px-2 py-1 rounded-full text-xs text-white">
                    {guild.type}
                  </span>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-xs text-muted-foreground">Guild XP</span>
                      <div className="font-bold text-lg">{guild.xp.toLocaleString()}</div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-bold">5.0</span>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    className={`
                      w-full rounded-full font-bold py-3 transition-all duration-300
                      ${guild.visibility === 'private' 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 glow'}
                    `}
                    disabled={guild.visibility === 'private'}
                  >
                    {guild.visibility === 'private' ? (
                      <span className="flex items-center">
                        <Lock className="h-4 w-4 mr-1" />
                        Private Guild
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Sword className="h-4 w-4 mr-1" />
                        Join Guild
                      </span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Guilds