/**
 * Small helpers shared by the component specs. Kept deliberately tiny — they only wrap
 * the DOM queries and async waits that would otherwise be duplicated everywhere.
 */

export function text(el: Element | null | undefined): string {
  return (el?.textContent ?? '').trim();
}

export function texts(nodes: Iterable<Element>): string[] {
  return Array.from(nodes).map((node) => text(node));
}

export function buttonByText(root: ParentNode, label: string): HTMLButtonElement {
  const button = Array.from(root.querySelectorAll('button')).find((candidate) =>
    text(candidate).toLowerCase().includes(label.toLowerCase()),
  );
  if (!button) {
    throw new Error(`No button matching "${label}"`);
  }
  return button as HTMLButtonElement;
}

export function byText(root: ParentNode, label: string): Element | undefined {
  return Array.from(root.querySelectorAll('*')).find((el) => text(el) === label);
}

/** Resolves once the predicate is true, polling on the macrotask queue. */
export async function waitUntil(predicate: () => boolean, timeoutMs = 2000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (!predicate()) {
    if (Date.now() > deadline) {
      throw new Error('waitUntil timed out');
    }
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
}
