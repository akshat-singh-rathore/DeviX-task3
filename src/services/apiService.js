const apiBaseUrl = 'http://localhost:4000'

async function request(resource, method = 'GET', payload = null) {
  const init = { method, headers: { 'Content-Type': 'application/json' } }
  if (payload) {
    init.body = JSON.stringify(payload)
  }
  const response = await fetch(`${apiBaseUrl}/${resource}`, init)
  if (!response.ok) {
    throw new Error(`Unable to ${method} ${resource}`)
  }
  if (method === 'DELETE') {
    return null
  }
  return response.json()
}

export async function fetchResource(resource) {
  return request(resource)
}

export async function createResource(resource, payload) {
  return request(resource, 'POST', payload)
}

export async function updateResource(resource, id, payload) {
  return request(`${resource}/${id}`, 'PATCH', payload)
}

export async function deleteResource(resource, id) {
  return request(`${resource}/${id}`, 'DELETE')
}

export async function loadDatabase() {
  const resources = ['departments', 'subjects', 'notices', 'calendar', 'announcements', 'students', 'faculty', 'staff']
  const results = await Promise.all(resources.map((resource) => fetchResource(resource).catch(() => null)))
  return resources.reduce((payload, resource, index) => {
    if (results[index]) {
      payload[resource] = results[index]
    }
    return payload
  }, {})
}
