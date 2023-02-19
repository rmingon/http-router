import {routes} from "./index";

export default function Route(route: string) {
  return function<T extends { new (...args: any[]): {} }>(target: T) {
    if (!routes.has(route)) {
      let instance = new target()
      routes.set(route, instance)
    }
  }
}