import { User, Trophy, Scroll, Users, Target } from 'lucide-react'
import { useUser } from '@/contexts/UserContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'

const Dashboard = () => {
  const { user } = useUser()

  // Helper function to calculate skill progress percentage
  const getSkillProgress = (skillXp: number) => {
    // Assuming max XP for a skill is 1500
    return Math.min(100, (skillXp / 1500) * 100)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-4xl font-bold text-center mb-8 glow">Dashboard</h1>
      
      {/* User Profile Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 card-hover glow animate-slide-up">
          <Card className="h-full bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-4">
                <div className="rounded-full p-3 bg-primary-500 glow">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{user.name}</div>
                  <div className="text-primary-600 font-medium">{user.role}</div>
                  <div className="text-sm text-gray-600">{user.department} • Joined {user.joinDate}</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">Level {user.level}</span>
                <span className="text-sm text-gray-600">{user.xp} / {user.xpToNext} XP</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-2 overflow-hidden">
                <div 
                  className="progress-bar" 
                  style={{ width: `${(user.xp / user.xpToNext) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* XP & Level Bars */}
        <div className="col-span-2 card-hover glow animate-slide-up">
          <Card className="h-full bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">Skills & Proficiency</CardTitle>
              <CardDescription>Your top skills and XP progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.skills.slice(0, 2).map((skill, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-md card-hover">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg">{skill.name}</span>
                      <span className="text-sm text-gray-600">{skill.xp} XP</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${getSkillProgress(skill.xp)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Skills & Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-hover glow animate-slide-up">
          <Card className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Trophy className="h-6 w-6 mr-2 text-primary-500" />
                Skills & Proficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.skills.map((skill, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md card-hover">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">{skill.name}</span>
                      <span className="text-sm text-gray-600">{skill.xp} XP</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${getSkillProgress(skill.xp)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="card-hover glow animate-slide-up">
          <Card className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Scroll className="h-6 w-6 mr-2 text-primary-500" />
                Experience Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start bg-white p-4 rounded-lg shadow-md card-hover">
                    <div className="bg-primary-500 rounded-full p-2 mt-1 mr-4 glow">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{achievement.title}</h4>
                      <p className="text-gray-600">{achievement.description}</p>
                      <p className="text-sm text-gray-500 mt-1">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Org Chart & Quest Log */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-hover glow animate-slide-up">
          <Card className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Users className="h-6 w-6 mr-2 text-primary-500" />
                Org Chart
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg p-8 text-center text-white shine-effect">
                <p className="text-xl font-bold">Interactive organization chart</p>
                <p className="mt-2">Will be displayed here</p>
                <p className="text-sm mt-4 opacity-80">Built with React Flow</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="card-hover glow animate-slide-up">
          <Card className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Target className="h-6 w-6 mr-2 text-primary-500" />
                Quest Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-md card-hover glow-accent">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg">Complete user authentication</h4>
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">Active</span>
                  </div>
                  <p className="text-gray-600 mt-2">Implement login and registration flows</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md card-hover glow-accent">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg">Design system setup</h4>
                    <span className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full">Pending</span>
                  </div>
                  <p className="text-gray-600 mt-2">Create component library and documentation</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md card-hover glow-accent">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg">API integration</h4>
                    <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">Completed</span>
                  </div>
                  <p className="text-gray-600 mt-2">Connect frontend to backend services</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard