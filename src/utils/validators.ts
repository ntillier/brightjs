
export const isNode = (value: any) => (
    typeof Node === "object" ? value instanceof Node : 
    value && typeof value === "object" && typeof value.nodeType === "number" && typeof value.nodeName === "string"
  )

export const isElement = (value: any) =>  (
    typeof HTMLElement === "object" ? value instanceof HTMLElement : //DOM2
    value && typeof value === "object" && value !== null && value.nodeType === 1 && typeof value.nodeName === "string"
);
