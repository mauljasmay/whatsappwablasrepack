'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/hooks/use-toast'
import { useWhatsAppSocket } from '@/hooks/use-whatsapp-socket'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  Smartphone,
  MessageSquare,
  Users,
  BookOpen,
  QrCode,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Copy,
  Download,
  Upload,
  Plus,
  Trash2,
  RefreshCw,
  Settings,
  Bell,
  BarChart3,
  Inbox as InboxIcon,
  LogOut,
  Key,
  Shield,
  Globe,
  Database,
  Wifi,
  WifiOff,
  Eye,
  EyeOff,
  Save,
  X,
  Edit2,
  Delete,
  FileText,
  Package,
  CreditCard,
  Zap,
  MoreVertical,
  Lock,
  Unlock,
  Github,
  Menu as MenuIcon,
  User,
  ChevronDown,
  ArrowRight,
  Server,
  Terminal
} from 'lucide-react'

interface Device {
  id: string
  name: string
  phone: string
  status: 'connected' | 'disconnected' | 'pending' | 'expired'
  connectedAt: string | null
  lastSeen: string
  plan: 'lite' | 'pro' | 'enterprise'
  messagesSent: number
  messagesReceived: number
  battery?: number
  isOnline?: boolean
}

interface Contact {
  id: string
  name: string
  nickname?: string
  phone: string
  email?: string
  address?: string
  birthday?: string
  gender: 'male' | 'female'
}

interface Message {
  id: string
  to: string
  message: string
  status: 'sent' | 'delivered' | 'failed' | 'queued'
  sentAt: string
  type: 'text' | 'image' | 'document' | 'video'
}

export default function WhatsAppAgent() {
  const { toast } = useToast()
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  // Admin credentials state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })

  // GitHub update state
  const [deviceUpdateStatus, setDeviceUpdateStatus] = useState<{
    checking: boolean
    deviceUpdate: boolean
    latestVersion: string
    currentVersion: string
    changelog: string[]
  }>({
    checking: false,
    deviceUpdate: false,
    latestVersion: '1.0.0',
    currentVersion: '1.0.0',
    changelog: []
  })

  // WebSocket connection
  const { isConnected, incomingMessages, deviceStatus, sendMessage: sendSocketMessage } = useWhatsAppSocket(null)

  // Settings state
  const [settings, setSettings] = useState({
    apiKey: 'abc123xyz456',
    webhookUrl: '',
    autoReconnect: true,
    notificationEmail: '',
    companyName: '',
    timezone: 'Asia/Jakarta',
    language: 'en',
    theme: 'system'
  })

  // Devices state
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 'WA001',
      name: 'Business WhatsApp',
      phone: '+6281234567890',
      status: 'connected',
      connectedAt: '2024-01-15T10:30:00',
      lastSeen: new Date().toISOString(),
      plan: 'pro',
      messagesSent: 1247,
      messagesReceived: 856,
      battery: 85,
      isOnline: true
    },
    {
      id: 'WA002',
      name: 'Support Line',
      phone: '+6289876543210',
      status: 'disconnected',
      connectedAt: null,
      lastSeen: '2024-01-18T09:20:00',
      plan: 'lite',
      messagesSent: 324,
      messagesReceived: 198,
      battery: 60,
      isOnline: false
    }
  ])

  // Contacts state
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 'C001',
      name: 'John Doe',
      nickname: 'Johnny',
      phone: '6281234567890',
      email: 'john@example.com',
      address: 'Jakarta, Indonesia',
      birthday: '1990-05-15',
      gender: 'male'
    },
    {
      id: 'C002',
      name: 'Jane Smith',
      nickname: 'Jane',
      phone: '6289876543210',
      email: 'jane@example.com',
      address: 'Surabaya, Indonesia',
      birthday: '1992-08-20',
      gender: 'female'
    }
  ])

  // Message history state
  const [messageHistory, setMessageHistory] = useState<Message[]>([
    {
      id: 'M001',
      to: '6281234567890',
      message: 'Hello! Welcome to our service.',
      status: 'delivered',
      sentAt: '2024-01-20T10:30:00',
      type: 'text'
    },
    {
      id: 'M002',
      to: '6289876543210',
      message: 'Your order has been shipped!',
      status: 'sent',
      sentAt: '2024-01-20T11:15:00',
      type: 'text'
    }
  ])

  // Message form state
  const [messageForm, setMessageForm] = useState({
    phone: '',
    message: '',
    isGroup: false,
    variables: true
  })

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    nickname: '',
    phone: '',
    email: '',
    address: '',
    birthday: '',
    gender: 'male'
  })

  // Device form state
  const [deviceForm, setDeviceForm] = useState({
    name: '',
    phone: '',
    plan: 'lite' as 'lite' | 'pro' | 'enterprise'
  })

  const [addDeviceDialog, setAddDeviceDialog] = useState(false)
  const [editContact, setEditContact] = useState<Contact | null>(null)

  // Update device status from WebSocket
  useEffect(() => {
    if (deviceStatus) {
      setDevices(prev =>
        prev.map(d =>
          d.id === deviceStatus.device_id
            ? { ...d, status: deviceStatus.status as any, battery: deviceStatus.battery_level, isOnline: deviceStatus.is_online, lastSeen: deviceStatus.last_seen }
            : d
        )
      )
    }
  }, [deviceStatus])

  // Check for updates on mount
  useEffect(() => {
    checkForUpdates()
  }, [])

  // API functions
  const fetchDevices = async () => {
    try {
      const response = await fetch('/api/devices')
      const data = await response.json()
      if (data.status) {
        setDevices(data.data)
      }
    } catch (error) {
      console.error('Error fetching devices:', error)
    }
  }

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts')
      const data = await response.json()
      if (data.status) {
        setContacts(data.data)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!messageForm.phone || !messageForm.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': settings.apiKey
        },
        body: JSON.stringify(messageForm)
      })

      const data = await response.json()

      if (data.status) {
        toast({
          title: "Success",
          description: "Message sent successfully"
        })

        setMessageHistory(prev => [{
          id: data.data.id,
          to: messageForm.phone,
          message: messageForm.message,
          status: 'sent',
          sentAt: new Date().toISOString(),
          type: 'text'
        }, ...prev])

        if (isConnected) {
          sendSocketMessage({
            phone: messageForm.phone,
            message: messageForm.message,
            isGroup: messageForm.isGroup
          })
        }

        setMessageForm({ phone: '', message: '', isGroup: false, variables: true })
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send message",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddContact = async () => {
    if (!contactForm.name || !contactForm.phone) {
      toast({
        title: "Validation Error",
        description: "Name and phone are required",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      })

      const data = await response.json()

      if (data.status) {
        toast({
          title: "Success",
          description: "Contact added successfully"
        })

        const newContact: Contact = {
          id: data.data.id,
          name: contactForm.name,
          nickname: contactForm.nickname,
          phone: contactForm.phone,
          email: contactForm.email,
          address: contactForm.address,
          birthday: contactForm.birthday,
          gender: contactForm.gender as 'male' | 'female'
        }

        setContacts(prev => [...prev, newContact])
        setContactForm({ name: '', nickname: '', phone: '', email: '', address: '', birthday: '', gender: 'male' })
        setAddDeviceDialog(false)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to add contact",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add contact",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteContact = async (contactId: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return

    try {
      setContacts(prev => prev.filter(c => c.id !== contactId))
      toast({
        title: "Success",
        description: "Contact deleted successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete contact",
        variant: "destructive"
      })
    }
  }

  const handleAddDevice = async () => {
    if (!deviceForm.name || !deviceForm.phone) {
      toast({
        title: "Validation Error",
        description: "Device name and phone are required",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...deviceForm,
          bank: 'BCA',
          periode: 'monthly'
        })
      })

      const data = await response.json()

      if (data.status) {
        toast({
          title: "Success",
          description: "Device created successfully"
        })

        const newDevice: Device = {
          id: data.data.device_id,
          name: deviceForm.name,
          phone: deviceForm.phone,
          status: 'pending',
          connectedAt: null,
          lastSeen: new Date().toISOString(),
          plan: deviceForm.plan,
          messagesSent: 0,
          messagesReceived: 0
        }

        setDevices(prev => [...prev, newDevice])
        setDeviceForm({ name: '', phone: '', plan: 'lite' })
        setAddDeviceDialog(false)
        setSelectedDevice(newDevice.id)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to create device",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create device",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Settings saved successfully"
      })

      setSettingsOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    // Simulated authentication - In production, this should use proper auth
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsAuthenticated(true)
      setCurrentUser({
        id: 1,
        username: 'admin',
        role: 'superadmin',
        email: 'admin@whatsappagent.com'
      })
      setLoginOpen(false)
      toast({
        title: "Welcome",
        description: "Logged in as admin"
      })
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive"
      })
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
    toast({
      title: "Logged Out",
      description: "You have been logged out"
    })
  }

  const checkForUpdates = async () => {
    setDeviceUpdateStatus(prev => ({ ...prev, checking: true }))

    try {
      // Simulated GitHub API call - In production, use actual GitHub API
      await new Promise(resolve => setTimeout(resolve, 2000))

      const hasUpdate = Math.random() > 0.5
      const latestVersion = '1.1.0'

      setDeviceUpdateStatus({
        checking: false,
        deviceUpdate: true,
        latestVersion,
        currentVersion: '1.0.0',
        changelog: hasUpdate ? [
          `New version ${latestVersion} is available!`,
          '✨ New features added',
          '🐛 Bug fixes',
          '⚡ Performance improvements',
          '🔒 Security enhancements'
        ] : []
      })

      if (hasUpdate) {
        toast({
          title: "Update Available",
          description: `Version ${latestVersion} is ready to install`
        })
      } else {
        toast({
          title: "Up to Date",
          description: "You're running the latest version"
        })
      }
    } catch (error) {
      setDeviceUpdateStatus(prev => ({ ...prev, checking: false }))
      toast({
        title: "Error",
        description: "Failed to check for updates",
        variant: "destructive"
      })
    }
  }

  const handleInstallUpdate = async () => {
    setLoading(true)
    toast({
      title: "Installing Update",
      description: "Please wait while we install the update..."
    })

    try {
      // Simulated update installation - In production, this would run actual update commands
      await new Promise(resolve => setTimeout(resolve, 3000))

      toast({
        title: "Update Complete",
        description: "Please refresh the page to apply changes"
      })

      setDeviceUpdateStatus({
        checking: false,
        deviceUpdate: false,
        latestVersion: updateStatus.latestVersion,
        currentVersion: updateStatus.latestVersion,
        changelog: []
      })
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to install update. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "Copied to clipboard"
    })
  }

  const handleDisconnectDevice = async (deviceId: string) => {
    if (!confirm('Are you sure you want to disconnect this device?')) return

    try {
      setDevices(prev =>
        prev.map(d =>
          d.id === deviceId
            ? { ...d, status: 'disconnected', isOnline: false }
            : d
        )
      )

      toast({
        title: "Success",
        description: "Device disconnected successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disconnect device",
        variant: "destructive"
      })
    }
  }

  const handleDeleteDevice = async (deviceId: string) => {
    if (!confirm('Are you sure you want to delete this device? This action cannot be undone.')) return

    try {
      setDevices(prev => prev.filter(d => d.id !== deviceId))

      toast({
        title: "Success",
        description: "Device deleted successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete device",
        variant: "destructive"
      })
    }
  }

  // Load data on mount
  useEffect(() => {
    fetchDevices()
    fetchContacts()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-500" />
            <h1 className="text-xl font-bold hidden sm:block">WhatsApp Agent</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            <Button
              variant={activeTab === 'dashboard' ? 'ghost' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('dashboard')}
              className={activeTab === 'dashboard' ? 'bg-muted' : ''}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'devices' ? 'ghost' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('devices')}
              className={activeTab === 'devices' ? 'bg-muted' : ''}
            >
              <Smartphone className="mr-2 h-4 w-4" />
              Devices
            </Button>
            <Button
              variant={activeTab === 'messages' ? 'ghost' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('messages')}
              className={activeTab === 'messages' ? 'bg-muted' : ''}
            >
              <Send className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Button
              variant={activeTab === 'contacts' ? 'ghost' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('contacts')}
              className={activeTab === 'contacts' ? 'bg-muted' : ''}
            >
              <Users className="mr-2 h-4 w-4" />
              Contacts
            </Button>
            <Button
              variant={activeTab === 'inbox' ? 'ghost' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('inbox')}
              className={activeTab === 'inbox' ? 'bg-muted' : ''}
            >
              <InboxIcon className="mr-2 h-4 w-4" />
              Inbox
            </Button>
            <Button
              variant={activeTab === 'api' ? 'ghost' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('api')}
              className={activeTab === 'api' ? 'bg-muted' : ''}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              API Docs
            </Button>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {/* Connection Status Badge */}
            <Badge
              variant={isConnected ? "default" : "secondary"}
              className="hidden md:flex items-center gap-1"
            >
              {isConnected ? (
                <>
                  <Wifi className="h-3 w-3" />
                  <span className="hidden sm:inline">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3" />
                  <span className="hidden sm:inline">Offline</span>
                </>
              )}
            </Badge>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Settings Button */}
            <Button variant="outline" size="sm" onClick={() => setSettingsOpen(true)}>
              <Settings className="h-4 w-4 hidden sm:block" />
              <span className="sm:hidden">Settings</span>
            </Button>

            {/* Admin Button */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Admin</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold">{currentUser?.username}</span>
                      <span className="text-xs text-muted-foreground">{currentUser?.role}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setAdminOpen(true)}>
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={checkForUpdates} disabled={updateStatus.checking}>
                    <Update className="mr-2 h-4 w-4" />
                    {updateStatus.checking ? 'Checking...' : 'Check Updates'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setLoginOpen(true)}>
                <Lock className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-background p-4 space-y-2">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('dashboard')
                setMobileMenuOpen(false)
              }}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'devices' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('devices')
                setMobileMenuOpen(false)
              }}
            >
              <Smartphone className="mr-2 h-4 w-4" />
              Devices
            </Button>
            <Button
              variant={activeTab === 'messages' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('messages')
                setMobileMenuOpen(false)
              }}
            >
              <Send className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Button
              variant={activeTab === 'contacts' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('contacts')
                setMobileMenuOpen(false)
              }}
            >
              <Users className="mr-2 h-4 w-4" />
              Contacts
            </Button>
            <Button
              variant={activeTab === 'inbox' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('inbox')
                setMobileMenuOpen(false)
              }}
            >
              <InboxIcon className="mr-2 h-4 w-4" />
              Inbox
            </Button>
            <Button
              variant={activeTab === 'api' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('api')
                setMobileMenuOpen(false)
              }}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              API Docs
            </Button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container px-4 py-4 sm:py-6 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-2">
            <TabsTrigger value="dashboard" className="text-xs sm:text-sm">
              <BarChart3 className="mr-1 h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Dash</span>
            </TabsTrigger>
            <TabsTrigger value="devices" className="text-xs sm:text-sm">
              <Smartphone className="mr-1 h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Devices</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="text-xs sm:text-sm">
              <Send className="mr-1 h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="text-xs sm:text-sm">
              <Users className="mr-1 h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Contacts</span>
            </TabsTrigger>
            <TabsTrigger value="inbox" className="text-xs sm:text-sm">
              <InboxIcon className="mr-1 h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Inbox</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="text-xs sm:text-sm">
              <BookOpen className="mr-1 h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">API Docs</span>
              <span className="sm:hidden">API</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{devices.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {devices.filter(d => d.status === 'connected').length} active
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
                  <Send className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {devices.reduce((sum, d) => sum + d.messagesSent, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contacts</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contacts.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +3 this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Message Rate</CardTitle>
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.5%</div>
                  <p className="text-xs text-muted-foreground">
                    Delivery rate
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
                  <Button
                    variant="outline"
                    className="h-auto flex-col items-start p-4 sm:p-6"
                    onClick={() => setActiveTab('devices')}
                  >
                    <QrCode className="mb-2 h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="font-semibold text-sm sm:text-base">Scan QR Code</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Connect new WhatsApp device
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto flex-col items-start p-4 sm:p-6"
                    onClick={() => setActiveTab('messages')}
                  >
                    <Send className="mb-2 h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="font-semibold text-sm sm:text-base">Send Message</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Send single or bulk messages
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto flex-col items-start p-4 sm:p-6"
                    onClick={() => setActiveTab('contacts')}
                  >
                    <Upload className="mb-2 h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="font-semibold text-sm sm:text-base">Import Contacts</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Bulk import from CSV/Excel
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Update Notification */}
            {updateStatus.hasUpdate && (
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <Update className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>Update Available!</AlertTitle>
                <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    Version <strong>{updateStatus.latestVersion}</strong> is available to install.
                  </div>
                  <Button
                    size="sm"
                    onClick={handleInstallUpdate}
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Installing...
                      </>
                    ) : (
                      <>
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Update Now
                      </>
                    )}
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          {/* Devices Tab */}
          <TabsContent value="devices" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Device Management</h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Manage your connected WhatsApp devices
                </p>
              </div>
              <Button onClick={() => setAddDeviceDialog(true)} className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Device
              </Button>
            </div>

            {selectedDevice ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Scan QR Code</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDevice(null)}
                    >
                      Back to List
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Scan this QR code with your WhatsApp app to connect
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <div className="border-4 border-green-600 p-6 sm:p-8 rounded-lg">
                    <QrCode className="h-48 w-48 sm:h-64 sm:w-64 text-green-600" />
                  </div>
                  <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertTitle>QR Code expires in 5 minutes</AlertTitle>
                    <AlertDescription>
                      Please scan code quickly. If it expires, click refresh to generate a new one.
                    </AlertDescription>
                  </Alert>
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <Button onClick={() => setSelectedDevice(null)} className="w-full">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh QR Code
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedDevice(null)} className="w-full">
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {devices.map((device) => (
                  <Card key={device.id} className="relative">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base sm:text-lg truncate">{device.name}</CardTitle>
                          <CardDescription className="truncate">
                            {device.phone}
                          </CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setSelectedDevice(device.id)}>
                              <QrCode className="mr-2 h-4 w-4" />
                              {device.status === 'connected' ? 'Reconnect' : 'Connect'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                              <Settings className="mr-2 h-4 w-4" />
                              Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {device.status === 'connected' && (
                              <DropdownMenuItem onClick={() => handleDisconnectDevice(device.id)}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Disconnect
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleDeleteDevice(device.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <Badge
                          variant={device.status === 'connected' ? 'default' : 'destructive'}
                          className="flex items-center gap-1 text-xs"
                        >
                          {device.status === 'connected' ? (
                            <>
                              <CheckCircle2 className="h-3 w-3" />
                              Connected
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3" />
                              Disconnected
                            </>
                          )}
                        </Badge>
                        <Badge variant="outline" className="capitalize text-xs">
                          {device.plan}
                        </Badge>
                        {device.isOnline !== undefined && (
                          <Badge variant={device.isOnline ? 'default' : 'secondary'} className="text-xs">
                            {device.isOnline ? 'Online' : 'Offline'}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Plan</p>
                          <p className="font-semibold capitalize text-xs sm:text-sm">{device.plan}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Seen</p>
                          <p className="font-semibold text-xs sm:text-sm truncate">
                            {new Date(device.lastSeen).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Sent</p>
                          <p className="font-semibold text-xs sm:text-sm">{device.messagesSent}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Received</p>
                          <p className="font-semibold text-xs sm:text-sm">{device.messagesReceived}</p>
                        </div>
                        {device.battery && (
                          <div className="col-span-2">
                            <p className="text-muted-foreground">Battery</p>
                            <p className="font-semibold text-xs sm:text-sm">{device.battery}%</p>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {device.status !== 'connected' ? (
                          <Button
                            className="flex-1"
                            onClick={() => setSelectedDevice(device.id)}
                          >
                            <QrCode className="mr-2 h-4 w-4" />
                            Connect
                          </Button>
                        ) : (
                          <>
                            <Button variant="outline" className="flex-1" onClick={() => setSettingsOpen(true)}>
                              <Settings className="mr-2 h-4 w-4" />
                              Settings
                            </Button>
                            <Button variant="outline" className="flex-1">
                              <Bell className="mr-2 h-4 w-4" />
                              Test
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Send Message</h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Send WhatsApp messages to individuals or groups
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Send Message Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Compose Message</CardTitle>
                  <CardDescription>
                    Fill in details to send a message
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number / Group ID</Label>
                    <div className="flex gap-2">
                      <Input
                        id="phone"
                        placeholder="6281234567890 or group-id"
                        value={messageForm.phone}
                        onChange={(e) =>
                          setMessageForm({ ...messageForm, phone: e.target.value })
                        }
                      />
                      <Button
                        variant={messageForm.isGroup ? "default" : "outline"}
                        onClick={() => setMessageForm({ ...messageForm, isGroup: !messageForm.isGroup })}
                      >
                        {messageForm.isGroup ? 'Group' : 'Individual'}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message here... Use {name}, {nickname}, {address} for personalization"
                      rows={6}
                      value={messageForm.message}
                      onChange={(e) =>
                        setMessageForm({ ...messageForm, message: e.target.value })
                      }
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="variables"
                        checked={messageForm.variables}
                        onChange={(e) =>
                          setMessageForm({ ...messageForm, variables: e.target.checked })
                        }
                      />
                      <Label htmlFor="variables" className="text-sm">
                        Enable personalization variables
                      </Label>
                    </div>
                  </div>

                  <Alert>
                    <AlertTitle>Personalization Variables</AlertTitle>
                    <AlertDescription>
                      Available variables: <code>{'{name}'}</code>, <code>{'{nickname}'}</code>,{' '}
                      <code>{'{address}'}</code>, <code>{'{birthday}'}</code>, <code>{'{email}'}</code>,{' '}
                      <code>{'{gender}'}</code>
                    </AlertDescription>
                  </Alert>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button className="flex-1" onClick={handleSendMessage} disabled={loading}>
                      {loading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Upload className="mr-2 h-4 w-4" />
                      Bulk Send
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Message History */}
              <Card>
                <CardHeader>
                  <CardTitle>Message History</CardTitle>
                  <CardDescription>Recent messages sent</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {messageHistory.map((msg) => (
                      <div
                        key={msg.id}
                        className="flex items-start gap-3 p-4 border rounded-lg"
                      >
                        <div className="mt-1">
                          {msg.status === 'delivered' ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : msg.status === 'sent' ? (
                            <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm truncate">{msg.to}</p>
                            <Badge variant="outline" className="text-xs shrink-0 ml-2">
                              {new Date(msg.sentAt).toLocaleString()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground break-words">
                            {msg.message}
                          </p>
                          <Badge
                            variant={
                              msg.status === 'delivered' ? 'default' : msg.status === 'sent' ? 'secondary' : 'destructive'
                            }
                            className="text-xs"
                          >
                            {msg.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Contact Management</h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Manage your contact list for personalized messages
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => fetchContacts()}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button onClick={() => setAddDeviceDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Contact
                </Button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Add Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Add New Contact</CardTitle>
                  <CardDescription>
                    Add a new contact to your phonebook
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="c-name">Full Name *</Label>
                      <Input
                        id="c-name"
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="c-nickname">Nickname</Label>
                      <Input
                        id="c-nickname"
                        value={contactForm.nickname}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, nickname: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="c-phone">Phone Number *</Label>
                    <Input
                      id="c-phone"
                      placeholder="6281234567890"
                      value={contactForm.phone}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="c-email">Email</Label>
                      <Input
                        id="c-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="c-birthday">Birthday</Label>
                      <Input
                        id="c-birthday"
                        type="date"
                        value={contactForm.birthday}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, birthday: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="c-address">Address</Label>
                    <Textarea
                      id="c-address"
                      rows={2}
                      value={contactForm.address}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, address: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="c-gender">Gender</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={contactForm.gender === 'male'}
                          onChange={() =>
                            setContactForm({ ...contactForm, gender: 'male' })
                          }
                        />
                        Male
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={contactForm.gender === 'female'}
                          onChange={() =>
                            setContactForm({ ...contactForm, gender: 'female' })
                          }
                        />
                        Female
                      </label>
                    </div>
                  </div>

                  <Button className="w-full" onClick={handleAddContact} disabled={loading}>
                    {loading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Contact
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Contact List */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact List</CardTitle>
                  <CardDescription>
                    {contacts.length} contacts in your phonebook
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="p-4 border rounded-lg space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-sm sm:text-base truncate">{contact.name}</h4>
                            {contact.nickname && (
                              <p className="text-sm text-muted-foreground">
                                @{contact.nickname}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <Badge variant="secondary" className="text-xs">{contact.gender}</Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditContact(contact)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteContact(contact.id)}
                            >
                              <Delete className="h-3 w-3 text-red-600" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="truncate">{contact.phone}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 shrink-0"
                              onClick={() => copyToClipboard(contact.phone)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          {contact.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                              <span className="truncate">{contact.email}</span>
                            </div>
                          )}
                          {contact.address && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                              <span className="line-clamp-1">{contact.address}</span>
                            </div>
                          )}
                          {contact.birthday && (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                              <span>
                                {new Date(contact.birthday).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Inbox Tab */}
          <TabsContent value="inbox" className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Inbox</h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                View incoming messages from WhatsApp
              </p>
            </div>

            <Alert>
              <Bell className="h-4 w-4" />
              <AlertTitle>Enable Incoming Messages</AlertTitle>
              <AlertDescription>
                To receive incoming messages, go to Device Settings and enable "Get Incoming Message"
                option. Messages will appear here automatically.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Recent Messages ({incomingMessages.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {incomingMessages.length > 0 ? (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {incomingMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="flex items-start gap-3 p-4 border rounded-lg bg-muted/50"
                      >
                        <div className="mt-1">
                          <InboxIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm truncate">{msg.from}</p>
                            <Badge variant="outline" className="text-xs shrink-0 ml-2">
                              {new Date(msg.timestamp).toLocaleString()}
                            </Badge>
                          </div>
                          <p className="text-sm break-words">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>No messages yet</p>
                    <p className="text-sm">Enable incoming messages to see them here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Documentation Tab */}
          <TabsContent value="api" className="space-y-4 sm:space-y-6" id="documentation">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">API Documentation</h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Complete guide for integrating WhatsApp Agent API
              </p>
            </div>

            {/* Intro */}
            <Card>
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  WhatsApp Agent is a WhatsApp API gateway service for sending and receiving messages,
                  notifications, schedulers, reminders, group messages, tracking, and chatbots with simple
                  integration for your business.
                </p>
                <p>
                  Our API was designed to be extremely easy to use and accessible to everyone, no matter
                  the programming language or frameworks you use.
                </p>
                <Alert>
                  <AlertTitle>Important Note</AlertTitle>
                  <AlertDescription>
                    Max size file for video, audio, image & document for media message is 2 MB
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Authentication */}
            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>
                  All API requests require authentication using your API token
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Include your API token in request header:
                </p>
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  Authorization: YOUR_API_TOKEN
                </div>
              </CardContent>
            </Card>

            {/* Send Message API */}
            <Card>
              <CardHeader>
                <CardTitle>Send Message</CardTitle>
                <CardDescription>
                  Send text message to individual or group
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Endpoint</h4>
                  <code className="bg-muted px-2 py-1 rounded text-sm">
                    POST /api/send-message
                  </code>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Request Parameters</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2 sm:px-3">Parameter</th>
                          <th className="text-left py-2 px-2 sm:px-3">Type</th>
                          <th className="text-left py-2 px-2 sm:px-3">Required</th>
                          <th className="text-left py-2 px-2 sm:px-3">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-2 sm:px-3">Authorization</td>
                          <td className="py-2 px-2 sm:px-3">string</td>
                          <td className="py-2 px-2 sm:px-3">Yes</td>
                          <td className="py-2 px-2 sm:px-3">API token</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-2 sm:px-3">phone</td>
                          <td className="py-2 px-2 sm:px-3">string</td>
                          <td className="py-2 px-2 sm:px-3">Yes</td>
                          <td className="py-2 px-2 sm:px-3">Target phone number or group ID</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-2 sm:px-3">message</td>
                          <td className="py-2 px-2 sm:px-3">string</td>
                          <td className="py-2 px-2 sm:px-3">Yes</td>
                          <td className="py-2 px-2 sm:px-3">Message content</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2 sm:px-3">isGroup</td>
                          <td className="py-2 px-2 sm:px-3">boolean</td>
                          <td className="py-2 px-2 sm:px-3">No</td>
                          <td className="py-2 px-2 sm:px-3">Set to true for group messages</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Example Request</h4>
                  <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>{`POST /api/send-message
Content-Type: application/json
Authorization: YOUR_API_TOKEN

{
  "phone": "6281234567890",
  "message": "Hello, this is a test message!",
  "isGroup": false
}`}</pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Success Response</h4>
                  <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "status": true,
  "message": "Message sent successfully",
  "data": {
    "id": "MSG123456",
    "phone": "6281234567890",
    "status": "sent"
  }
}`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Send Message */}
            <Card>
              <CardHeader>
                <CardTitle>Send Bulk Messages</CardTitle>
                <CardDescription>
                  Send multiple messages at once
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Endpoint</h4>
                  <code className="bg-muted px-2 py-1 rounded text-sm">
                    POST /api/v2/send-message
                  </code>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Example Request</h4>
                  <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>{`POST /api/v2/send-message
Content-Type: application/json
Authorization: YOUR_API_TOKEN

{
  "data": [
    {
      "phone": "6281234567890",
      "message": "Hello John!",
      "isGroup": false
    },
    {
      "phone": "6289876543210",
      "message": "Hello Jane!",
      "isGroup": false
    }
  ]
}`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Check Phone Number */}
            <Card>
              <CardHeader>
                <CardTitle>Check Phone Number</CardTitle>
                <CardDescription>
                  Verify if a phone number is active on WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Endpoint</h4>
                  <code className="bg-muted px-2 py-1 rounded text-sm">
                    GET /api/check-phone-number?phones={'{phones}'}
                  </code>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Example Request</h4>
                  <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>{`GET /api/check-phone-number?phones=6281234567890,6289876543210
Authorization: YOUR_API_TOKEN`}</pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Success Response</h4>
                  <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "status": "success",
  "data": [
    {
      "phone": "6281234567890",
      "status": "online"
    },
    {
      "phone": "6289876543210",
      "status": "offline"
    }
  ],
  "message": "Success"
}`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personalization */}
            <Card>
              <CardHeader>
                <CardTitle>Message Personalization</CardTitle>
                <CardDescription>
                  Use variables to personalize your messages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTitle>Step 1: Add Contact Information</AlertTitle>
                  <AlertDescription>
                    Make sure you have added phone number, name, and other details in Contact
                    Person section
                  </AlertDescription>
                </Alert>

                <div>
                  <h4 className="font-semibold mb-2">Available Variables</h4>
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-muted p-3 rounded-md">
                      <code>{'{name}'}</code>
                      <p className="text-sm text-muted-foreground mt-1">Full name</p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <code>{'{nickname}'}</code>
                      <p className="text-sm text-muted-foreground mt-1">Nickname</p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <code>{'{address}'}</code>
                      <p className="text-sm text-muted-foreground mt-1">Address</p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <code>{'{birthday}'}</code>
                      <p className="text-sm text-muted-foreground mt-1">Birthday</p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <code>{'{email}'}</code>
                      <p className="text-sm text-muted-foreground mt-1">Email</p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <code>{'{gender}'}</code>
                      <p className="text-sm text-muted-foreground mt-1">Gender</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Example</h4>
                  <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>{`Message Template:
"Hello {nickname}, we have received your order on behalf of {name}, 
and we will promptly send it to your address: {address}. 
Thank you for choosing our store!"

Sent to contact:
- Name: Celavina Celes
- Nickname: Celes256
- Address: Sirus Blackthorn, Sector Dragonfire Lane

Result:
"Hello Celes256, we have received your order on behalf of Celavina Celes, 
and we will promptly send it to your address: Sirus Blackthorn, Sector Dragonfire Lane. 
Thank you for choosing our store!"`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Get Group ID */}
            <Card>
              <CardHeader>
                <CardTitle>Get WhatsApp Group ID</CardTitle>
                <CardDescription>
                  Steps to get Group ID for sending messages to groups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal list-inside space-y-2">
                  <li>Make sure your device is connected and is an Admin/member of WhatsApp Group</li>
                  <li>Activate "Get Incoming Message" on Device Settings</li>
                  <li>Send a message from your phone to WhatsApp Group</li>
                  <li>Open Inbox menu</li>
                  <li>Now you can Copy Group ID</li>
                  <li>To send messages to WhatsApp Group via API, use the Group ID as phone and set isGroup=true</li>
                </ol>
              </CardContent>
            </Card>

            {/* Mention Members in Group */}
            <Card>
              <CardHeader>
                <CardTitle>Mention Members in WhatsApp Group</CardTitle>
                <CardDescription>
                  Use @number to mention members in group messages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  You can use <code>@number</code> in the message body to mention members in the WhatsApp group.
                </p>
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>{`{
  "data": [
    {
      "phone": "6281218444-87687324xxxxxx",
      "message": "Hello @0813939121212, congratulations on joining the group!",
      "isGroup": "true"
    }
  ]
}`}</pre>
                  </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Configure your WhatsApp Agent settings and preferences
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* API Configuration */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Configuration
              </h3>
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="apiKey"
                      type={showApiKey ? "text" : "password"}
                      value={settings.apiKey}
                      onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(settings.apiKey)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  placeholder="https://your-domain.com/webhook"
                  value={settings.webhookUrl}
                  onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
                />
              </div>
            </div>

            {/* Company Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Database className="h-5 w-5" />
                Company Information
              </h3>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Your Company Name"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notificationEmail">Notification Email</Label>
                <Input
                  id="notificationEmail"
                  type="email"
                  placeholder="notifications@company.com"
                  value={settings.notificationEmail}
                  onChange={(e) => setSettings({ ...settings, notificationEmail: e.target.value })}
                />
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Preferences
              </h3>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select
                  id="timezone"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  value={settings.timezone}
                  onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                >
                  <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                  <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                  <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                  <option value="Asia/Singapore">Asia/Singapore</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <select
                  id="language"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                >
                  <option value="en">English</option>
                  <option value="id">Bahasa Indonesia</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="autoReconnect"
                  checked={settings.autoReconnect}
                  onChange={(e) => setSettings({ ...settings, autoReconnect: e.target.checked })}
                />
                <Label htmlFor="autoReconnect">Auto-reconnect devices</Label>
              </div>
            </div>

            {/* Plan Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Package className="h-5 w-5" />
                Current Plan
              </h3>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-lg">Pro Plan</h4>
                      <p className="text-sm text-muted-foreground">
                        10,000 messages/month
                      </p>
                    </div>
                    <Badge variant="default" className="flex items-center gap-1 w-fit">
                      <CheckCircle2 className="h-3 w-3" />
                      Active
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Messages used</span>
                      <span>1,247 / 10,000</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '12.47%' }}></div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Upgrade Plan
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </h3>
              <div className="grid gap-2">
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Export Logs
                </Button>
                <Button variant="outline" className="justify-start">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh All Devices
                </Button>
                <Button variant="outline" className="justify-start" onClick={fetchContacts}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Contacts
                </Button>
                <Button variant="outline" className="justify-start" onClick={fetchDevices}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Devices
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSettings} disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Admin Login Dialog */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
            <DialogDescription>
              Enter your admin credentials to access admin features
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="admin"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="•••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div className="bg-muted p-3 rounded-md text-sm">
              <p className="font-semibold mb-1">Default Credentials:</p>
              <p>Username: <code>admin</code></p>
              <p>Password: <code>admin123</code></p>
              <Alert className="mt-3">
                <AlertTitle className="text-sm">Security Note</AlertTitle>
                <AlertDescription className="text-xs">
                  Please change the default credentials in production environment
                </AlertDescription>
              </Alert>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLoginOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleLogin}>
              <Lock className="mr-2 h-4 w-4" />
              Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Admin Dashboard Dialog */}
      <Dialog open={adminOpen} onOpenChange={setAdminOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Admin Dashboard</DialogTitle>
            <DialogDescription>
              Manage system settings, updates, and administrative tasks
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* User Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">User Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="font-semibold">{currentUser?.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <p className="font-semibold">{currentUser?.role}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">{currentUser?.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GitHub Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  GitHub Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="font-semibold">Current Version</h4>
                    <Badge variant="outline" className="mt-1">{updateStatus.currentVersion}</Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold">Latest Version</h4>
                    <Badge variant={updateStatus.hasUpdate ? 'default' : 'secondary'} className="mt-1">
                      {updateStatus.latestVersion}
                    </Badge>
                  </div>
                </div>

                <Button
                  onClick={checkForUpdates}
                  disabled={updateStatus.checking}
                  className="w-full"
                >
                  {updateStatus.checking ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Checking for updates...
                    </>
                  ) : (
                    <>
                      <Update className="mr-2 h-4 w-4" />
                      Check for Updates
                    </>
                  )}
                </Button>

                {updateStatus.hasUpdate && (
                  <>
                    <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                      <Update className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertTitle>Update Available!</AlertTitle>
                      <AlertDescription className="mt-2">
                        <div className="space-y-2">
                          <p>Version <strong>{updateStatus.latestVersion}</strong> is available.</p>
                          {updateStatus.changelog.length > 0 && (
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {updateStatus.changelog.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>
                    <Button
                      onClick={handleInstallUpdate}
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Installing Update...
                        </>
                      ) : (
                        <>
                          <ArrowRight className="mr-2 h-4 w-4" />
                          Install Update
                        </>
                      )}
                    </Button>
                  </>
                )}

                {!updateStatus.hasUpdate && !updateStatus.checking && (
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Up to Date</AlertTitle>
                    <AlertDescription>
                      You are running the latest version ({updateStatus.currentVersion})
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>WebSocket Service</span>
                    <Badge variant={isConnected ? 'default' : 'destructive'}>
                      {isConnected ? 'Running' : 'Stopped'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Devices</span>
                    <Badge variant="outline">{devices.length} Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Messages Sent</span>
                    <Badge variant="outline">
                      {devices.reduce((sum, d) => sum + d.messagesSent, 0)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Database</span>
                    <Badge variant="default">Connected</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-2">
                  <Button variant="outline" className="justify-start">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restart Services
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    View System Logs
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={fetchDevices}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh All Data
                  </Button>
                  <Button variant="outline" className="justify-start text-red-600" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdminOpen(false)}>
              Close
            </Button>
            <Button onClick={() => window.open('https://github.com/mauljasmay/whatsappwablasrepack', '_blank')}>
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Device Dialog */}
      <Dialog open={addDeviceDialog} onOpenChange={setAddDeviceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Device</DialogTitle>
            <DialogDescription>
              Register a new WhatsApp device for your account
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="deviceName">Device Name *</Label>
              <Input
                id="deviceName"
                placeholder="e.g., Business WhatsApp, Support Line"
                value={deviceForm.name}
                onChange={(e) => setDeviceForm({ ...deviceForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="devicePhone">WhatsApp Phone Number *</Label>
              <Input
                id="devicePhone"
                placeholder="6281234567890"
                value={deviceForm.phone}
                onChange={(e) => setDeviceForm({ ...deviceForm, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="devicePlan">Plan</Label>
              <select
                id="devicePlan"
                className="w-full px-3 py-2 border rounded-md bg-background"
                value={deviceForm.plan}
                onChange={(e) => setDeviceForm({ ...deviceForm, plan: e.target.value as 'lite' | 'pro' | 'enterprise' })}
              >
                <option value="lite">Lite (1,000 messages/month)</option>
                <option value="pro">Pro (10,000 messages/month)</option>
                <option value="enterprise">Enterprise (Unlimited)</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDeviceDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDevice} disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Device
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t py-4 sm:py-6 mt-auto">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p className="text-xs sm:text-sm">© 2024 WhatsApp Agent. All rights reserved.</p>
          <p className="mt-2 text-xs">
            API Documentation for WhatsApp integration services
          </p>
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-4 mt-3 sm:mt-4 text-xs">
            <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
            <a href="https://github.com/mauljasmay/whatsappwablasrepack" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Github className="h-3 w-3" />
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
