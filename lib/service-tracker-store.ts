'use client'

import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { db, isFirebaseConfigured, storage } from '@/lib/firebase'
import {
  CORE_SERVICES,
  ServiceFile,
  ServiceId,
  ServiceTrackerMap,
  createDefaultServiceMap,
} from '@/lib/service-tracker'

function ensureConfigured() {
  if (!isFirebaseConfigured || !db || !storage) {
    throw new Error(
      'Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* variables to your environment.',
    )
  }
}

function normalizeProjectId(projectId: string) {
  return projectId.trim().toLowerCase().replace(/\s+/g, '-')
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function parseTrackerMap(raw: unknown): ServiceTrackerMap {
  const defaults = createDefaultServiceMap()

  if (!isObject(raw)) return defaults

  for (const service of CORE_SERVICES) {
    const rawService = raw[service.id]
    if (!isObject(rawService)) continue

    const status = rawService.status
    if (status === 'Not Started' || status === 'Ongoing' || status === 'Completed') {
      defaults[service.id].status = status
    }

    const rawFiles = rawService.files
    if (Array.isArray(rawFiles)) {
      defaults[service.id].files = rawFiles
        .filter((file): file is ServiceFile => {
          return (
            isObject(file) &&
            typeof file.name === 'string' &&
            typeof file.url === 'string' &&
            typeof file.storagePath === 'string' &&
            typeof file.contentType === 'string' &&
            typeof file.uploadedAt === 'string'
          )
        })
        .slice(0, 10)
    }
  }

  return defaults
}

export async function loadServiceTracker(projectId: string) {
  ensureConfigured()
  const normalizedId = normalizeProjectId(projectId)

  if (!normalizedId) {
    throw new Error('Project ID is required.')
  }

  const docRef = doc(db!, 'serviceTrackers', normalizedId)
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) {
    return createDefaultServiceMap()
  }

  const data = snapshot.data()
  return parseTrackerMap(data.services)
}

export async function saveServiceTracker(projectId: string, services: ServiceTrackerMap) {
  ensureConfigured()
  const normalizedId = normalizeProjectId(projectId)

  if (!normalizedId) {
    throw new Error('Project ID is required.')
  }

  const docRef = doc(db!, 'serviceTrackers', normalizedId)
  await setDoc(
    docRef,
    {
      projectId: normalizedId,
      services,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )
}

export async function uploadServiceFile(
  projectId: string,
  serviceId: ServiceId,
  file: File,
): Promise<ServiceFile> {
  ensureConfigured()
  const normalizedId = normalizeProjectId(projectId)

  if (!normalizedId) {
    throw new Error('Project ID is required before uploading a file.')
  }

  const safeName = file.name.replace(/\s+/g, '-')
  const storagePath = `service-trackers/${normalizedId}/${serviceId}/${Date.now()}-${safeName}`
  const fileRef = ref(storage!, storagePath)

  await uploadBytes(fileRef, file, { contentType: file.type })
  const url = await getDownloadURL(fileRef)

  return {
    name: file.name,
    url,
    storagePath,
    contentType: file.type || 'application/octet-stream',
    uploadedAt: new Date().toISOString(),
  }
}
