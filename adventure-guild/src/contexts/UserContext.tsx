import { createContext, useContext, type ReactNode, useState } from 'react'

interface User {
  id: string
  name: string
  role: string
  department: string
  joinDate: string
  level: number
  xp: number
  xpToNext: number
  coins: number
  skills: Skill[]
  achievements: Achievement[]
}

interface Skill {
  id: string
  name: string
  level: number
  xp: number
}

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  earned: boolean
}

interface UserContextType {
  user: User
  updateUser: (user: User) => void
  addXP: (amount: number) => void
  addCoins: (amount: number) => void
  levelUp: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Mock user data
  const initialUser: User = {
    id: '1',
    name: "Alex Morgan",
    role: "Frontend Developer",
    department: "Engineering",
    joinDate: "Jan 15, 2023",
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    coins: 1250,
    skills: [
      { id: '1', name: "React", level: 92, xp: 1200 },
      { id: '2', name: "TypeScript", level: 85, xp: 950 },
      { id: '3', name: "UI/UX Design", level: 78, xp: 800 },
      { id: '4', name: "Node.js", level: 70, xp: 650 },
    ],
    achievements: [
      { id: '1', title: "First Quest", description: "Complete your first quest", date: "2023-01-20", earned: true },
      { id: '2', title: "Team Player", description: "Complete 5 team quests", date: "2023-02-15", earned: true },
      { id: '3', title: "Skill Master", description: "Reach level 10 in a skill", date: "2023-03-10", earned: true },
    ]
  }

  const [user, setUser] = useState<User>(initialUser)

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
  }

  const addXP = (amount: number) => {
    setUser(prevUser => {
      let newXp = prevUser.xp + amount
      let newLevel = prevUser.level
      let newXpToNext = prevUser.xpToNext
      
      // Check if user should level up (possibly multiple times)
      while (newXp >= newXpToNext) {
        newXp = newXp - newXpToNext
        newLevel = newLevel + 1
        newXpToNext = newXpToNext + 1000
      }
      
      return {
        ...prevUser,
        xp: newXp,
        level: newLevel,
        xpToNext: newXpToNext
      }
    })
  }

  const addCoins = (amount: number) => {
    setUser(prevUser => ({
      ...prevUser,
      coins: Math.max(0, prevUser.coins + amount) // Ensure coins don't go negative
    }))
  }

  const levelUp = () => {
    setUser(prevUser => {
      const newXp = Math.max(0, prevUser.xp - prevUser.xpToNext) // Reset XP to remaining amount after level up
      return {
        ...prevUser,
        level: prevUser.level + 1,
        xp: newXp,
        xpToNext: prevUser.xpToNext + 1000
      }
    })
  }

  return (
    <UserContext.Provider value={{ 
      user, 
      updateUser, 
      addXP, 
      addCoins, 
      levelUp 
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}