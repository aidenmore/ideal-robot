import { motion } from 'framer-motion'
import { MessageCircle, Clock, Radio } from 'lucide-react'

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

interface BotCardProps {
  bot: BotStatus
  index: number
}

export function BotCard({ bot, index }: BotCardProps) {
  const statusColors = {
    online: 'bg-cyber-green',
    offline: 'bg-gray-500',
    error: 'bg-cyber-red'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-cyber-panel rounded-xl p-5 border border-cyber-border hover:border-cyber-accent transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{bot.emoji}</span>
          <div>
            <h3 className="font-bold text-white">{bot.name}</h3>
            <p className="text-xs text-gray-400">{bot.username}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColors[bot.status]}`} />
          <span className="text-xs text-gray-400 uppercase">{bot.status}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <MessageCircle className="w-4 h-4" />
            <span>Messages</span>
          </div>
          <span className="text-white font-mono">{bot.messageCount}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Last Active</span>
          </div>
          <span className="text-white font-mono">{bot.lastMessage}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Radio className="w-4 h-4" />
            <span>Interval</span>
          </div>
          <span className="text-white font-mono">{bot.interval}h</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-cyber-border">
        <button className="w-full py-2 bg-cyber-dark hover:bg-cyber-border rounded-lg text-sm text-gray-300 transition-colors">
          Send Test Message
        </button>
      </div>
    </motion.div>
  )
}