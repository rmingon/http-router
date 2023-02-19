type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'

export default function Method(method: Method, params?: string) {
  return function<T extends Record<Method, any>>(target: T, key: keyof T, descriptor: PropertyDescriptor) {
    target[method] = target[key]
  }
}