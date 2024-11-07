import { Children } from "react"
import type { HostConfig } from "react-reconciler"

import { DefaultEventPriority } from "react-reconciler/constants.js"

export const hostConfig: HostConfig<
  string, // Type,
  Record<string, unknown>, // Props,
  Renderer, // Container,
  Node<unknown>, // Instance,
  TextNode, // TextInstance,
  never, // SuspenseInstance,
  never, // HydratableInstance,
  never, // PublicInstance,
  never, // HostContext,
  true, // UpdatePayload,
  never, // ChildSet,
  number, // TimeoutHandle,
  number // NoTimeout,
> = {
  createInstance(type, props) {
    console.log("createInstance", { type, props })
    switch (type) {
      // Self-closing tags
      case "liquid":
        return {
          type,
          children: "",
          toString() {
            return `{% ${type} ${props.children} %}`
          },
        }
      // https://shopify.dev/docs/api/liquid/tags/layout
      case "layout":
        return {
          type,
          children: "",
          toString() {
            if (props.name && props.none) {
              throw Error("no podes las dos")
            }

            if (props.name) {
              return `{% layout '${props.name}' %}`
            }

            if (props.none) {
              return `{% layout none %}`
            }

            throw Error("tampoco podes")
          },
        }
      // https://shopify.dev/docs/api/liquid/tags/render
      case "render":
        return {
          type,
          children: "",
          toString() {
            return `{% render '${props.name}' %}`
          },
        }
      // https://shopify.dev/docs/api/liquid/tags/section
      case "section":
      // https://shopify.dev/docs/api/liquid/tags/sections
      case "sections":
        return {
          type,
          children: "",
          toString() {
            return `{% ${type} '${props.name}' %}`
          },
        }
      // Basic paired tags
      case "raw":
      case "javascript":
        return {
          type,
          children: "",
          toString() {
            return `{% ${type} %}${props.children}{% end${type} %}`
          },
        }
      // case "liquid-var":
      //   return {
      //     type,
      //     children: "",
      //     toString() {
      //       // Render this as a Liquid variable using props for variable name
      //       const varName = props.name || "var"
      //       return `{{ ${varName} }}`
      //     },
      //   }

      // Default case for unsupported types
      default:
        return {
          type,
          children: "",
          toString() {
            return `<${type}>` // This should actually be something usable
          },
        }
    }
  },

  createTextInstance(text) {
    // Just return the text as-is, which will become part of Liquid output
    return text
  },

  appendInitialChild(parent, child) {
    if (typeof child === "string") {
      console.log("calling appendInitialChild", parent, child)
      parent.children += child
    } else {
      console.log("calling appendInitialChild", parent, child)
      parent.children += child.toString()
    }
  },

  appendChildToContainer(container, child) {
    console.log("calling appendChildToContainer", container, child)
    container.children += child.toString()
    console.log("called appendChildToContainer, result is", container.children)
  },

  prepareForCommit() {
    console.log("called prepareForCommit")
    return null
  },
  resetAfterCommit() {},
  detachDeletedInstance() {},
  clearContainer(container) {
    console.log("called clearContainer", container)
    container.children = ""
  },

  finalizeInitialChildren() {
    return false
  },
  prepareUpdate() {
    return null
  },
  getRootHostContext() {
    return {}
  },
  getChildHostContext() {
    return {}
  },
  shouldSetTextContent() {
    return false
  },
  supportsMutation: true,
  appendChild() {
    console.log("called appendChild")
  },
  insertBefore() {},
  removeChild() {
    console.log("called removeChild")
  },
}
