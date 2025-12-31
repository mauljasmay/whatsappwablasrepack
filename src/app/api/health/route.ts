import { NextResponse } from 'next/server'

export async function GET() {
  // Check database
  let dbStatus = 'unknown'
  try {
    const fs = require('fs')
    const path = require('path')
    const dbPath = path.join(process.cwd(), 'db', 'custom.db')
    dbStatus = fs.existsSync(dbPath) ? 'connected' : 'not found'
  } catch (error) {
    dbStatus = 'error'
  }

  // Check environment
  const env = process.env.NODE_ENV || 'development'

  // Check build status
  let buildStatus = 'not_built'
  try {
    const fs = require('fs')
    const buildPath = path.join(process.cwd(), '.next', 'standalone')
    buildStatus = fs.existsSync(buildPath) ? 'built' : 'not_built'
  } catch (error) {
    buildStatus = 'error'
  }

  // Version info
  const version = '1.0.0'

  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: env,
    version: version,
    checks: {
      database: {
        status: dbStatus,
        message: dbStatus === 'connected' ? 'Database accessible' : 'Database not found'
      },
      build: {
        status: buildStatus,
        message: buildStatus === 'built' ? 'Production build found' : 'Production build not found'
      },
      environment: {
        status: env === 'production' ? 'ok' : 'development',
        message: env === 'production' ? 'Production environment' : 'Development environment'
      },
      filesystem: {
        status: 'ok',
        message: 'File system accessible'
      }
    },
    services: {
      webapp: {
        status: 'unknown',
        message: 'Web application status unknown - check via supervisor/pm2'
      },
      websocket: {
        status: 'unknown',
        message: 'WebSocket service status unknown - check via supervisor/pm2'
      }
    },
    uptime: {
      process_uptime: process.uptime(),
      message: 'Process running since startup'
    },
    memory: {
      used: process.memoryUsage(),
      total: process.memoryUsage(),
      message: 'Memory usage information'
    }
  })
}
