import { useState } from 'react'
import { motion } from 'framer-motion'
import { Circle, CircleDot, CheckCircle, Clock, Users, Globe, Zap, Flame, Diamond } from 'lucide-react'
import { useQuests } from '@/contexts/QuestContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { Button } from '@/components/Button'

const QuestBoard = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const { quests, acceptQuest, completeQuest } = useQuests()
  
  const filteredQuests = activeFilter === 'all' 
    ? quests 
    : quests.filter(quest => {
        if (activeFilter === 'easy' || activeFilter === 'medium' || activeFilter === 'hard') {
          return quest.difficulty === activeFilter
        }
        return quest.type === activeFilter
      })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'hard': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <Zap className="h-4 w-4" />
      case 'medium': return <Flame className="h-4 w-4" />
      case 'hard': return <Diamond className="h-4 w-4" />
      default: return <Circle className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'personal': return <Circle className="h-4 w-4" />
      case 'department': return <Users className="h-4 w-4" />
      case 'company': return <Globe className="h-4 w-4" />
      default: return <Circle className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CircleDot className="h-5 w-5 text-blue-500" />
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />
      default: return <Circle className="h-5 w-5" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold gradient-text mb-4">Quest Board</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Embark on exciting adventures and earn rewards for your achievements
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Button 
          onClick={() => setActiveFilter('all')}
          variant={activeFilter === 'all' ? 'default' : 'secondary'}
          className={`px-4 py-2 rounded-full ${activeFilter === 'all' ? 'glow pulse-glow' : ''}`}
        >
          All Quests
        </Button>
        <Button 
          onClick={() => setActiveFilter('easy')}
          variant={activeFilter === 'easy' ? 'default' : 'secondary'}
          className={`px-4 py-2 rounded-full ${activeFilter === 'easy' ? 'glow pulse-glow' : ''}`}
        >
          <Zap className="h-4 w-4 mr-1" />
          Easy
        </Button>
        <Button 
          onClick={() => setActiveFilter('medium')}
          variant={activeFilter === 'medium' ? 'default' : 'secondary'}
          className={`px-4 py-2 rounded-full ${activeFilter === 'medium' ? 'glow pulse-glow' : ''}`}
        >
          <Flame className="h-4 w-4 mr-1" />
          Medium
        </Button>
        <Button 
          onClick={() => setActiveFilter('hard')}
          variant={activeFilter === 'hard' ? 'default' : 'secondary'}
          className={`px-4 py-2 rounded-full ${activeFilter === 'hard' ? 'glow pulse-glow' : ''}`}
        >
          <Diamond className="h-4 w-4 mr-1" />
          Hard
        </Button>
        <Button 
          onClick={() => setActiveFilter('personal')}
          variant={activeFilter === 'personal' ? 'default' : 'secondary'}
          className={`px-4 py-2 rounded-full ${activeFilter === 'personal' ? 'glow pulse-glow' : ''}`}
        >
          <Circle className="h-4 w-4 mr-1" />
          Personal
        </Button>
        <Button 
          onClick={() => setActiveFilter('department')}
          variant={activeFilter === 'department' ? 'default' : 'secondary'}
          className={`px-4 py-2 rounded-full ${activeFilter === 'department' ? 'glow pulse-glow' : ''}`}
        >
          <Users className="h-4 w-4 mr-1" />
          Department
        </Button>
        <Button 
          onClick={() => setActiveFilter('company')}
          variant={activeFilter === 'company' ? 'default' : 'secondary'}
          className={`px-4 py-2 rounded-full ${activeFilter === 'company' ? 'glow pulse-glow' : ''}`}
        >
          <Globe className="h-4 w-4 mr-1" />
          Company
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredQuests.map((quest, index) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="card-hover glow"
          >
            <Card className="h-full flex flex-col bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border-0">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800">{quest.title}</CardTitle>
                    <CardDescription className="mt-1 text-gray-600">{quest.description}</CardDescription>
                  </div>
                  <div className="p-2 rounded-full bg-white/50">
                    {getStatusIcon(quest.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-0">
                <div className="flex items-center mb-4">
                  <span className={`${getDifficultyColor(quest.difficulty)} text-white text-xs px-3 py-1 rounded-full flex items-center mr-2`}>
                    {getDifficultyIcon(quest.difficulty)}
                    <span className="ml-1 capitalize">{quest.difficulty}</span>
                  </span>
                  <div className="text-muted-foreground p-2 rounded-full bg-white/50">
                    {getTypeIcon(quest.type)}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-4">
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg px-3 py-2 text-white">
                      <span className="text-xs">XP</span>
                      <div className="font-bold">{quest.xp}</div>
                    </div>
                    <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg px-3 py-2 text-white">
                      <span className="text-xs">Coins</span>
                      <div className="font-bold">{quest.coins}</div>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    className={`
                      rounded-full px-4 font-bold transition-all duration-300
                      ${quest.status === 'completed' 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : quest.status === 'active' 
                          ? 'bg-blue-500 hover:bg-blue-600 glow' 
                          : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 glow'}
                    `}
                    onClick={() => {
                      if (quest.status === 'pending') {
                        acceptQuest(quest.id)
                      } else if (quest.status === 'active') {
                        completeQuest(quest.id)
                      }
                    }}
                  >
                    {quest.status === 'completed' ? 'Completed' : quest.status === 'active' ? 'Complete' : 'Accept'}
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

export default QuestBoard