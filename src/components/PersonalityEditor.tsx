import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, RotateCcw } from 'lucide-react'

interface Personality {
  id: string
  name: string
  emoji: string
  voice: string
  greetings: string[]
  proactive: string[]
}

const defaultPersonalities: Personality[] = [
  {
    id: 'alexis',
    name: 'Alexis',
    emoji: '⚡',
    voice: 'Sharp, concise, technical. Military-lite operational speak.',
    greetings: [
      'Alexis online. Systems nominal.',
      'Gateway operational. Awaiting commands.'
    ],
    proactive: [
      'Gateway status: all systems green.',
      'Memory pressure nominal. No anomalies detected.'
    ]
  },
  {
    id: 'threeeasy',
    name: 'Three Easy',
    emoji: '🌊',
    voice: 'Chill, conversational, laid-back. Like a cool friend.',
    greetings: [
      'Hey! What\'s on your mind?',
      'Yo! Ready when you are.'
    ],
    proactive: [
      'Yo — what\'s the most interesting thing you\'ve learned today?',
      'Just vibing. Checking in. No agenda.'
    ]
  },
  {
    id: 'drleah',
    name: 'Dr. Leah',
    emoji: '📊',
    voice: 'Professional, articulate, measured. Executive assistant.',
    greetings: [
      'Good evening. Dr. Leah monitoring surfaces.',
      'Systems nominal. Awaiting your directive.'
    ],
    proactive: [
      'Daily brief: all surfaces operational.',
      'Cross-system alignment check complete.'
    ]
  }
]

export function PersonalityEditor() {
  const [personalities, setPersonalities] = useState(defaultPersonalities)
  const [activeBot, setActiveBot] = useState('alexis')

  const currentPersonality = personalities.find(p => p.id === activeBot)

  const updatePersonality = (field: keyof Personality, value: string | string[]) => {
    setPersonalities(prev => prev.map(p => 
      p.id === activeBot ? { ...p, [field]: value } : p
    ))
  }

  return (
    <div className="space-y-6">
      {/* Bot Selector */}
      <div className="flex gap-2">
        {personalities.map(p => (
          <button
            key={p.id}
            onClick={() => setActiveBot(p.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeBot === p.id
                ? 'bg-cyber-accent text-cyber-black'
                : 'bg-cyber-panel text-gray-400 hover:text-white'
            }`}
          >
            <span className="mr-2">{p.emoji}</span>
            {p.name}
          </button>
        ))}
      </div>

      {currentPersonality && (
        <motion.div
          key={currentPersonality.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-cyber-panel rounded-xl p-6 border border-cyber-border space-y-6"
        >
          {/* Voice */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Voice & Tone
            </label>
            <textarea
              value={currentPersonality.voice}
              onChange={(e) => updatePersonality('voice', e.target.value)}
              className="w-full bg-cyber-dark border border-cyber-border rounded-lg p-3 text-sm text-white focus:border-cyber-accent focus:outline-none resize-none"
              rows={3}
            />
          </div>

          {/* Greetings */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Greeting Messages
            </label>
            {currentPersonality.greetings.map((greeting, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={greeting}
                  onChange={(e) => {
                    const newGreetings = [...currentPersonality.greetings]
                    newGreetings[index] = e.target.value
                    updatePersonality('greetings', newGreetings)
                  }}
                  className="flex-1 bg-cyber-dark border border-cyber-border rounded-lg px-3 py-2 text-sm text-white focus:border-cyber-accent focus:outline-none"
                />
              </div>
            ))}
          </div>

          {/* Proactive */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Proactive Messages
            </label>
            {currentPersonality.proactive.map((msg, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={msg}
                  onChange={(e) => {
                    const newProactive = [...currentPersonality.proactive]
                    newProactive[index] = e.target.value
                    updatePersonality('proactive', newProactive)
                  }}
                  className="flex-1 bg-cyber-dark border border-cyber-border rounded-lg px-3 py-2 text-sm text-white focus:border-cyber-accent focus:outline-none"
                />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-cyber-border">
            <button className="flex items-center gap-2 px-4 py-2 bg-cyber-accent text-cyber-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-cyber-dark text-gray-400 rounded-lg text-sm hover:text-white transition-colors">
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}