'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  CORE_SERVICES,
  SERVICE_STATUSES,
  ServiceId,
  ServiceStatus,
  createDefaultServiceMap,
} from '@/lib/service-tracker'
import {
  loadServiceTracker,
  saveServiceTracker,
  uploadServiceFile,
} from '@/lib/service-tracker-store'

type PendingFiles = Partial<Record<ServiceId, File>>

function statusTone(status: ServiceStatus) {
  if (status === 'Completed') return 'bg-green-100 text-green-700 border-green-200'
  if (status === 'Ongoing') return 'bg-amber-100 text-amber-700 border-amber-200'
  return 'bg-slate-100 text-slate-700 border-slate-200'
}

export default function AdminTrackerPage() {
  const [projectId, setProjectId] = useState('')
  const [tracker, setTracker] = useState(createDefaultServiceMap)
  const [pendingFiles, setPendingFiles] = useState<PendingFiles>({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploadingService, setUploadingService] = useState<ServiceId | null>(null)
  const [notice, setNotice] = useState<string>('')
  const [error, setError] = useState<string>('')

  const hasProjectId = projectId.trim().length > 0
  const serviceCount = useMemo(() => CORE_SERVICES.length, [])

  async function handleLoadProject() {
    setError('')
    setNotice('')

    if (!hasProjectId) {
      setError('Enter a project/client ID first.')
      return
    }

    try {
      setLoading(true)
      const data = await loadServiceTracker(projectId)
      setTracker(data)
      setPendingFiles({})
      setNotice('Project data loaded.')
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load project.')
    } finally {
      setLoading(false)
    }
  }

  function handleStatusChange(serviceId: ServiceId, status: ServiceStatus) {
    setTracker((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        status,
      },
    }))
  }

  function handleFileSelection(serviceId: ServiceId, file: File | null) {
    if (!file) return
    setPendingFiles((prev) => ({ ...prev, [serviceId]: file }))
  }

  async function handleUpload(serviceId: ServiceId) {
    setError('')
    setNotice('')

    const file = pendingFiles[serviceId]
    if (!file) {
      setError('Pick a file first (image or PDF).')
      return
    }

    if (!hasProjectId) {
      setError('Set a project/client ID before uploading files.')
      return
    }

    const isAllowed = file.type.startsWith('image/') || file.type === 'application/pdf'
    if (!isAllowed) {
      setError('Only images and PDF files are supported.')
      return
    }

    try {
      setUploadingService(serviceId)
      const uploadedFile = await uploadServiceFile(projectId, serviceId, file)
      setTracker((prev) => ({
        ...prev,
        [serviceId]: {
          ...prev[serviceId],
          files: [uploadedFile, ...prev[serviceId].files],
        },
      }))

      setPendingFiles((prev) => {
        const next = { ...prev }
        delete next[serviceId]
        return next
      })
      setNotice('File uploaded. Click Save Changes to publish for clients.')
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.')
    } finally {
      setUploadingService(null)
    }
  }

  async function handleSave() {
    setError('')
    setNotice('')

    if (!hasProjectId) {
      setError('Enter a project/client ID first.')
      return
    }

    try {
      setSaving(true)
      await saveServiceTracker(projectId, tracker)
      setNotice('Service tracker saved successfully.')
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      <section className="border-b border-border/60 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-primary">Service Tracker Admin</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage the status and files for all {serviceCount} core services.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline">
              <Link href="/">Back to Landing</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/client">Client View</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <Card className="border-border/70 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-primary">Select Client / Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                value={projectId}
                onChange={(event) => setProjectId(event.target.value)}
                placeholder="e.g. acme-trading-2026"
                className="md:max-w-sm"
              />
              <Button onClick={handleLoadProject} disabled={loading}>
                {loading ? 'Loading...' : 'Load Project'}
              </Button>
            </div>
            {notice ? <p className="text-sm text-secondary">{notice}</p> : null}
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {CORE_SERVICES.map((service) => {
            const data = tracker[service.id]
            const selectedFile = pendingFiles[service.id]

            return (
              <Card key={service.id} className="border-border/70 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <CardTitle className="text-lg text-primary">{service.name}</CardTitle>
                    <Badge className={statusTone(data.status)}>{data.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-[220px_1fr] gap-4 items-center">
                    <p className="text-sm font-medium">Status</p>
                    <Select
                      value={data.status}
                      onValueChange={(value) =>
                        handleStatusChange(service.id, value as ServiceStatus)
                      }
                    >
                      <SelectTrigger className="md:max-w-xs">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICE_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-[220px_1fr] gap-4 items-center">
                    <p className="text-sm font-medium">Upload File</p>
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(event) =>
                            handleFileSelection(service.id, event.target.files?.[0] ?? null)
                          }
                          className="max-w-md"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleUpload(service.id)}
                          disabled={uploadingService === service.id}
                        >
                          {uploadingService === service.id ? 'Uploading...' : 'Upload'}
                        </Button>
                      </div>
                      {selectedFile ? (
                        <p className="text-xs text-muted-foreground">
                          Selected: {selectedFile.name}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-[220px_1fr] gap-4">
                    <p className="text-sm font-medium">Uploaded Files</p>
                    {data.files.length ? (
                      <div className="space-y-2">
                        {data.files.map((file) => (
                          <a
                            key={file.storagePath}
                            href={file.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block text-sm text-secondary hover:underline"
                          >
                            {file.name}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No uploaded files yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </section>
    </main>
  )
}
