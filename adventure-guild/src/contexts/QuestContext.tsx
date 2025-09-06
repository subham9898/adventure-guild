import { createContext, useContext, type ReactNode, useState } from 'react'
import { useUser } from './UserContext'

interface Quest {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  type: 'personal' | 'department' | 'company'
  xp: number
  coins: number
  status: 'active' | 'pending' | 'completed'
}

interface QuestContextType {
  quests: Quest[]
  activeQuests: Quest[]
  completedQuests: Quest[]
  acceptQuest: (questId: string) => void
  completeQuest: (questId: string) => void
  getQuestById: (questId: string) => Quest | undefined
}

const QuestContext = createContext<QuestContextType | undefined>(undefined)

export const QuestProvider = ({ children }: { children: ReactNode }) => {
  const { addXP, addCoins } = useUser()
  
  // Mock quest data
  const initialQuests: Quest[] = [
    {
      id: '1',
      title: "Complete user authentication",
      description: "Implement login and registration flows with proper validation",
      difficulty: "easy",
      type: "personal",
      xp: 150,
      coins: 50,
      status: "active"
    },
    {
      id: '2',
      title: "Design system setup",
      description: "Create component library and documentation for team use",
      difficulty: "medium",
      type: "department",
      xp: 300,
      coins: 100,
      status: "pending"
    },
    {
      id: '3',
      title: "API integration",
      description: "Connect frontend to backend services with error handling",
      difficulty: "hard",
      type: "company",
      xp: 500,
      coins: 200,
      status: "completed"
    },
    {
      id: '4',
      title: "Performance optimization",
      description: "Improve page load times and reduce bundle size",
      difficulty: "hard",
      type: "personal",
      xp: 400,
      coins: 150,
      status: "pending"
    },
    {
      id: '5',
      title: "Mobile responsiveness",
      description: "Ensure all pages work well on mobile devices",
      difficulty: "medium",
      type: "department",
      xp: 250,
      coins: 75,
      status: "pending"
    },
    {
      id: '6',
      title: "Accessibility audit",
      description: "Check and fix accessibility issues across the application",
      difficulty: "easy",
      type: "company",
      xp: 200,
      coins: 75,
      status: "active"
    }
  ]

  const [quests, setQuests] = useState<Quest[]>(initialQuests)
  
  const activeQuests = quests.filter(quest => quest.status === 'active')
  const completedQuests = quests.filter(quest => quest.status === 'completed')

  const acceptQuest = (questId: string) => {
    setQuests(prevQuests => 
      prevQuests.map(quest => 
        quest.id === questId ? { ...quest, status: 'active' } : quest
      )
    )
  }

  const completeQuest = (questId: string) => {
    setQuests(prevQuests => 
      prevQuests.map(quest => {
        if (quest.id === questId && quest.status === 'active') {
          // Reward user when completing a quest
          addXP(quest.xp)
          addCoins(quest.coins)
          return { ...quest, status: 'completed' } as Quest
        }
        return quest
      })
    )
  }

  const getQuestById = (questId: string) => {
    return quests.find(quest => quest.id === questId)
  }

  return (
    <QuestContext.Provider value={{ 
      quests,
      activeQuests,
      completedQuests,
      acceptQuest,
      completeQuest,
      getQuestById
    }}>
      {children}
    </QuestContext.Provider>
  )
}

export const useQuests = () => {
  const context = useContext(QuestContext)
  if (context === undefined) {
    throw new Error('useQuests must be used within a QuestProvider')
  }
  return context
}