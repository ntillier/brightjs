
export const isNode = (value: any) => (
    typeof Node === "object" ? value instanceof Node : 
    value && typeof value === "object" && typeof value.nodeType === "number" && typeof value.nodeName === "string"
  )

export const isElement = (value: any) =>  (
    typeof HTMLElement === "object" ? value instanceof HTMLElement : //DOM2
    value && typeof value === "object" && value !== null && value.nodeType === 1 && typeof value.nodeName === "string"
);

export const getType = (arg: any): 'string' | 'bright' | 'element' | undefined => {
  if (typeof arg === 'string') {
    return 'string';
  } else if (arg?.constructor?.name === "BrightJs") {
    return 'bright';
  } else if (isElement(arg) || arg === document || arg === window) {
    return 'element';
  }
  console.trace('type not found');
}