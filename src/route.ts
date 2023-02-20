import http from "http";
import url from "url";
let routes : Record<string, any> = {}
let instances = new Map()
interface RouteDeclaration {
  params?: string
  key: string
  method: string
}

http.createServer(function (req, res) {
  const _url = url.parse(req.url ?? '')
  const url_with_params = req.url?.split('/').map((el: string) => parseInt(el) ? ':id' : el).join('/')
  try {
    const {instance_name, key} = routes[url_with_params ?? ''][req.method ?? '']
    return (instances.get(instance_name))[key](req, res)
  } catch (e) {
    res.writeHead(500, {'Content-Type': 'json'});
    res.write(JSON.stringify(e));
    return res.end()
  }

}).listen(process.env.PORT ?? 8081);

export default function Route(route: string) {
  return function<T extends { new (...args: any[]): Record<any, any> }>(target: T) {
    let instance = new target()
    instances.set(target.name, instance)
    instance.routes.forEach((el: RouteDeclaration) => {
      const route_with_params = route+(el.params ?? '')
      if (!routes[route_with_params]) {
        routes[route_with_params] = {}
      }
      routes[route_with_params][el.method] = {instance_name: target.name, key: el.key}
      console.log("MOUNTED ROUTE" , route + (el.params ?? '') , "METHOD" , el.method)
    })
  }
}