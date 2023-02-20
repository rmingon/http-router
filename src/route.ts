export let routes : Record<string, any> = {}

interface RouteDeclaration {
  params?: string
  key: string
  method: string
}

export default function Route(route: string) {
  return function<T extends { new (...args: any[]): Record<any, any> }>(target: T) {
    let instance = new target()
    instance.routes.forEach((el: RouteDeclaration) => {
      const route_with_params = route+(el.params ?? '')
      if (!routes[route_with_params]) {
        routes[route_with_params] = {}
      }
      routes[route_with_params][el.method] = (<any>instance)[el.key]
      console.log("MOUNTED ROUTE" , route + (el.params ?? '') , "METHOD" , el.method)
    })
  }
}