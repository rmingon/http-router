type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'

export default function Method(method: Method, params?: string) {
  return function<T>(target: T, key: keyof T, descriptor: PropertyDescriptor) {
    if (!(<any>target).routes) {
      (<any>target).routes = []
    }
    (<any>target).routes.push({params, key, method})
  }
}