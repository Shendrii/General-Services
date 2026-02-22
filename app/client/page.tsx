'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CORE_SERVICES, ServiceStatus, createDefaultServiceMap } from '@/lib/service-tracker'
import { loadServiceTracker } from '@/lib/service-tracker-store'

function statusTone(status: ServiceStatus) {
  if (status === 'Completed') return 'bg-green-100 text-green-700 border-green-200'
  if (status === 'Ongoing') return 'bg-amber-100 text-amber-700 border-amber-200'
  return 'bg-slate-100 text-slate-700 border-slate-200'
}

export default function ClientTrackerPage() {
  const [projectId, setProjectId] = useState('')
  const [tracker, setTracker] = useState(createDefaultServiceMap)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  async function handleLoad() {
    setError('')
    setNotice('')

    if (!projectId.trim()) {
      setError('Enter your project/client ID.')
      return
    }

    try {
      setLoading(true)
      const data = await loadServiceTracker(projectId)
      setTracker(data)
      setNotice('Service tracker loaded.')
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load tracker.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      <section className="border-b border-border/60 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-primary">Client Service Tracker</h1>
            <p className="text-sm text-muted-foreground mt-1">
              View status updates and downloadable files for your services.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline">
              <Link href="/">Back to Landing</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/admin">Admin View</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <Card className="border-border/70 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-primary">Find Your Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                value={projectId}
                onChange={(event) => setProjectId(event.target.value)}
                placeholder="Enter project/client ID"
                className="md:max-w-sm"
              />
              <Button onClick={handleLoad} disabled={loading}>
                {loading ? 'Loading...' : 'Load Tracker'}
              </Button>
            </div>
            {notice ? <p className="text-sm text-secondary">{notice}</p> : null}
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {CORE_SERVICES.map((service) => {
            const item = tracker[service.id]
            return (
              <Card key={service.id} className="border-border/70 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <CardTitle className="text-lg text-primary">{service.name}</CardTitle>
                    <Badge className={statusTone(item.status)}>{item.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {item.files.length ? (
                    <div className="space-y-2">
                      {item.files.map((file) => (
                        <a
                          key={file.storagePath}
                          href={file.url}
                          download={file.name}
                          className="block text-sm text-secondary hover:underline"
                        >
                          Download: {file.name}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No file uploaded yet for this service.
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </main>
  )
}
