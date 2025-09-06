import { motion } from 'framer-motion'
import { Trophy, Medal, Crown, ShoppingBag, TrendingUp, Star, Zap, Shield, Sword } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { Button } from '@/components/Button'

const GuildHall = () => {
  // Mock data
  const userLeaderboard = [
    { id: 1, name: "Alex Morgan", xp: 12500, rank: 1 },
    { id: 2, name: "Taylor Swift", xp: 11200, rank: 2 },
    { id: 3, name: "Jamie Smith", xp: 9800, rank: 3 },
    { id: 4, name: "Jordan Lee", xp: 8750, rank: 4 },
    { id: 5, name: "Casey Johnson", xp: 7600, rank: 5 },
  ]

  const guildLeaderboard = [
    { id: 1, name: "Frontend Masters", emblem: "🧙‍♂️", xp: 25000, rank: 1 },
    { id: 2, name: "Backend Wizards", emblem: "⚡", xp: 19800, rank: 2 },
    { id: 3, name: "Design Gurus", emblem: "🎨", xp: 17500, rank: 3 },
    { id: 4, name: "DevOps Champions", emblem: "⚙️", xp: 15200, rank: 4 },
    { id: 5, name: "Mobile Mavericks", emblem: "📱", xp: 13750, rank: 5 },
  ]

  const achievements = [
    { id: 1, title: "Quest Master", description: "Complete 50 quests", icon: "🏆", earned: true },
    { id: 2, title: "Team Builder", description: "Create 5 guilds", icon: "👥", earned: true },
    { id: 3, title: "Skill Master", description: "Reach level 100 in a skill", icon: "⭐", earned: false },
    { id: 4, title: "Leader", description: "Reach top 3 in leaderboard", icon: "👑", earned: true },
    { id: 5, title: "Explorer", description: "Join 10 guilds", icon: "🧭", earned: false },
  ]

  const rewards = [
    { id: 1, name: "Golden Badge", description: "Display on your profile", cost: 500, icon: "🥇" },
    { id: 2, name: "Custom Title", description: "Personalize your name", cost: 300, icon: "🖋️" },
    { id: 3, name: "Theme Pack", description: "Exclusive UI themes", cost: 750, icon: "🎨" },
    { id: 4, name: "XP Booster", description: "Double XP for 24 hours", cost: 1000, icon: "⚡" },
  ]

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-amber-800" />;
      default: return <Trophy className="h-5 w-5 text-blue-500" />;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10"
    >
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold gradient-text mb-4">Guild Hall</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Celebrate achievements, compete on leaderboards, and claim your rewards
        </p>
      </div>
      
      {/* Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* User Leaderboard */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="card-hover glow"
        >
          <Card className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Trophy className="h-6 w-6 text-primary-500 mr-2" />
                User Leaderboard
              </CardTitle>
              <CardDescription>Top adventurers in the guild</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userLeaderboard.map((user, index) => (
                  <motion.div 
                    key={user.id} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-2xl ${
                      user.rank === 1 ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300' : 
                      user.rank === 2 ? 'bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300' : 
                      user.rank === 3 ? 'bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-300' : 
                      'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        user.rank === 1 ? 'bg-yellow-500 text-black' : 
                        user.rank === 2 ? 'bg-gray-300 text-black' : 
                        user.rank === 3 ? 'bg-amber-800 text-white' : 
                        'bg-primary-500 text-white'
                      }`}>
                        {getRankBadge(user.rank)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{user.name}</div>
                        <div className="text-sm text-gray-600">Level {Math.floor(user.xp / 1000)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{user.xp.toLocaleString()} XP</div>
                      <div className="text-sm text-gray-600">Rank #{user.rank}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Guild Leaderboard */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="card-hover glow"
        >
          <Card className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Crown className="h-6 w-6 text-primary-500 mr-2" />
                Guild Leaderboard
              </CardTitle>
              <CardDescription>Top guilds in the organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {guildLeaderboard.map((guild, index) => (
                  <motion.div 
                    key={guild.id} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-2xl ${
                      guild.rank === 1 ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300' : 
                      guild.rank === 2 ? 'bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300' : 
                      guild.rank === 3 ? 'bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-300' : 
                      'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 text-2xl ${
                        guild.rank === 1 ? 'bg-gradient-to-br from-yellow-200 to-yellow-300' : 
                        guild.rank === 2 ? 'bg-gradient-to-br from-gray-200 to-gray-300' : 
                        guild.rank === 3 ? 'bg-gradient-to-br from-amber-200 to-amber-300' : 
                        'bg-gradient-to-br from-primary-100 to-primary-200'
                      }`}>
                        {guild.emblem}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{guild.name}</div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <Shield className="h-3 w-3 mr-1" />
                          {guild.rank === 1 ? 'Champion Guild' : guild.rank === 2 ? 'Elite Guild' : guild.rank === 3 ? 'Veteran Guild' : 'Active Guild'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{guild.xp.toLocaleString()} XP</div>
                      <div className="text-sm text-gray-600">Rank #{guild.rank}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Achievements and Rewards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Achievements */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="card-hover glow"
        >
          <Card className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Medal className="h-6 w-6 text-primary-500 mr-2" />
                Achievements
              </CardTitle>
              <CardDescription>Unlock badges and recognition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div 
                    key={achievement.id} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`p-5 rounded-2xl border-2 ${
                      achievement.earned 
                        ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300' 
                        : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 opacity-70'
                    }`}
                  >
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <CardTitle className="text-lg font-bold text-gray-800">{achievement.title}</CardTitle>
                    <CardDescription className="mt-1 text-gray-600">{achievement.description}</CardDescription>
                    {achievement.earned && (
                      <div className="mt-3 flex items-center text-green-600">
                        <Star className="h-4 w-4 mr-1" />
                        <span className="text-xs font-bold">UNLOCKED</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Rewards Shop */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="card-hover glow"
        >
          <Card className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <ShoppingBag className="h-6 w-6 text-primary-500 mr-2" />
                Rewards Shop
              </CardTitle>
              <CardDescription>Redeem your coins for exclusive items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rewards.map((reward, index) => (
                  <motion.div 
                    key={reward.id} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200"
                  >
                    <div className="flex items-center">
                      <span className="text-3xl mr-4">{reward.icon}</span>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-800">{reward.name}</CardTitle>
                        <CardDescription className="text-gray-600">{reward.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1 rounded-full mr-3">
                        <Zap className="h-4 w-4 mr-1" />
                        <span className="font-bold">{reward.cost}</span>
                      </div>
                      <Button size="sm" className="rounded-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                        <ShoppingBag className="h-4 w-4 mr-1" />
                        Buy
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Company Stats */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="card-hover glow"
      >
        <Card className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <TrendingUp className="h-6 w-6 text-primary-500 mr-2" />
              Company Stats
            </CardTitle>
            <CardDescription>Organization-wide metrics and engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div 
                className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-2xl text-center border border-primary-200"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">142</div>
                <div className="text-lg font-bold text-gray-800 mb-1">Active Quests</div>
                <div className="text-sm text-gray-600 flex items-center justify-center">
                  <Sword className="h-4 w-4 mr-1" />
                  In Progress
                </div>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-accent-50 to-accent-100 p-6 rounded-2xl text-center border border-accent-200"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-accent-600 mb-2">24</div>
                <div className="text-lg font-bold text-gray-800 mb-1">Guilds</div>
                <div className="text-sm text-gray-600 flex items-center justify-center">
                  <Shield className="h-4 w-4 mr-1" />
                  Active Communities
                </div>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl text-center border border-green-200"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-green-600 mb-2">156</div>
                <div className="text-lg font-bold text-gray-800 mb-1">Members</div>
                <div className="text-sm text-gray-600 flex items-center justify-center">
                  <Star className="h-4 w-4 mr-1" />
                  Active Adventurers
                </div>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl text-center border border-purple-200"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-purple-600 mb-2">89%</div>
                <div className="text-lg font-bold text-gray-800 mb-1">Engagement</div>
                <div className="text-sm text-gray-600 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Monthly Activity
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default GuildHall