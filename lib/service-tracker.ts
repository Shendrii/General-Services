export const SERVICE_STATUSES = [
  'Not Started',
  'Ongoing',
  'Completed',
] as const

export type ServiceStatus = (typeof SERVICE_STATUSES)[number]

export const CORE_SERVICES = [
  {
    id: 'business-permit',
    name: 'Business Permit Renewal / New Application',
  },
  {
    id: 'bir-form',
    name: 'Filing of BIR FORM',
  },
  {
    id: 'sec-registration',
    name: 'SEC Registration',
  },
  {
    id: 'dti-registration',
    name: 'DTI Registration',
  },
  {
    id: 'spa',
    name: 'SPA (Special Power of Attorney)',
  },
  {
    id: 'business-closure-reopening',
    name: 'Business Closure & Reopening',
  },
] as const

export type ServiceId = (typeof CORE_SERVICES)[number]['id']

export type ServiceFile = {
  name: string
  url: string
  storagePath: string
  contentType: string
  uploadedAt: string
}

export type ServiceTrackerItem = {
  status: ServiceStatus
  files: ServiceFile[]
}

export type ServiceTrackerMap = Record<ServiceId, ServiceTrackerItem>

export function createDefaultServiceMap(): ServiceTrackerMap {
  return CORE_SERVICES.reduce((acc, service) => {
    acc[service.id] = {
      status: 'Not Started',
      files: [],
    }
    return acc
  }, {} as ServiceTrackerMap)
}
