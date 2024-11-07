import { hostConfig } from "./reconciler"
import Reconciler from "react-reconciler"

const reconciler = Reconciler(hostConfig)

export function renderToLiquid(element) {
  // Set up the container to hold Liquid syntax as it accumulates
  const container = { children: "" }

  // Create a root container and render the React element
  const root = reconciler.createContainer(
    container,
    0,
    null,
    false,
    null,
    "e",
    () => {},
    null
  )

  reconciler.updateContainer(element, root, null, null)

  return container.children
}
