import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bot, Activity, Zap, MessageSquare, Settings } from 'lucide-react'
import { BotCard } from './BotCard'
import { PersonalityEditor } from './PersonalityEditor'

interface BotStatus {
  id: string
  name: string
  username: string
  status: 'online' | 'offline' | 'error'
  lastMessage: string
  messageCount: number
  emoji: string
  interval: number
}

const mockBots: BotStatus[] = [
  {
    id: 'alexis',
    name: 'Alexis',
    username: '@Alexis_2020_bot',
    status: 'online',
    lastMessage: '2 min ago',
    messageCount: 47,
    emoji: '⚡',
    interval: 2
  },
  {
    id: 'threeeasy',
    name: 'Three Easy',
    username: '@Three_easy_bot',
    status: 'online',
    lastMessage: '5 min ago',
    messageCount: 32,
    emoji: '🌊',
    interval: 3
  },
  {
    id: 'drleah',
    name: 'Dr. Leah',
    username: '@DrLeahBot',
    status: 'online',
    lastMessage: '12 min ago',
    messageCount: 28,
    emoji: '📊',
    interval: 4
  }
]

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'personalities'>('overview')
  const [systemHealth, setSystemHealth] = useState(98)

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5) * 4)))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8 text-cyber-accent" />
            <div>
              <h1 className="text-2xl font-bold text-white">Ideal Robot</h1>
              <p className="text-sm text-gray-400">Bot Command Center</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-cyber-panel rounded-lg px-4 py-2">
              <Activity className={`w-4 h-4 ${systemHealth > 90 ? 'text-cyber-green' : 'text-cyber-red'}`} />
              <span className="text-sm font-mono">{systemHealth.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'overview' 
              ? 'bg-cyber-accent text-cyber-black' 
              : 'bg-cyber-panel text-gray-400 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('personalities')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'personalities' 
              ? 'bg-cyber-accent text-cyber-black' 
              : 'bg-cyber-panel text-gray-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          Personalities
        </button>
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-cyber-panel rounded-xl p-4 border border-cyber-border"
            >
              <div className="flex items-center gap-2 text-cyber-accent mb-2">
                <Bot className="w-5 h-5" />
                <span className="text-sm font-medium">Active Bots</span>
              </div>
              <p className="text-3xl font-bold text-white">3/3</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-cyber-panel rounded-xl p-4 border border-cyber-border"
            >
              <div className="flex items-center gap-2 text-cyber-purple mb-2">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm font-medium">Messages Today</span>
              </div>
              <p className="text-3xl font-bold text-white">107</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-cyber-panel rounded-xl p-4 border border-cyber-border"
            >
              <div className="flex items-center gap-2 text-cyber-green mb-2">
                <Activity className="w-5 h-5" />
                <span className="text-sm font-medium">Uptime</span>
              </div>
              <p className="text-3xl font-bold text-white">14h 22m</p>
            </motion.div>
          </div>

          {/* Bot Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockBots.map((bot, index) => (
              <BotCard key={bot.id} bot={bot} index={index} />
            ))}
          </div>
        </>
      ) : (
        <PersonalityEditor />
      )}
    </div>
  )
}