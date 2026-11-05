import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let supportsDisplayTransition: boolean | undefined;

/**
 * Probes whether the browser genuinely transitions discrete `display`
 * (guards against Firefox bug 1882408 where CSS.supports returns true
 * without keeping the element visible during exit).
 */
export function canTransitionDisplay(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  if (supportsDisplayTransition !== undefined) {
    return supportsDisplayTransition;
  }
  if (!window.CSS?.supports?.("transition-behavior", "allow-discrete") || !document.body) {
    supportsDisplayTransition = false;
    return false;
  }
  const probe = document.createElement("div");
  probe.style.cssText = "transition: display 1s allow-discrete !important; display: block;";
  document.body.appendChild(probe);
  void getComputedStyle(probe).display;
  probe.style.display = "none";
  supportsDisplayTransition = getComputedStyle(probe).display === "block";
  probe.remove();
  return supportsDisplayTransition;
}

export function supportsTopLayerExit(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.CSS?.supports?.("overlay", "auto") && canTransitionDisplay());
}

/**
 * Animates a <dialog> smoothly out of the top layer across all browsers,
 * using `data-closing` + `getAnimations()` fallback where `overlay` or discrete
 * display transitions are unsupported.
 */
export async function closeDialogSmoothly(dialog: HTMLDialogElement | null, onAfterClose?: () => void) {
  if (!dialog || !dialog.open) {
    onAfterClose?.();
    return;
  }

  if (!supportsTopLayerExit()) {
    dialog.setAttribute("data-closing", "");
    const animations = dialog.getAnimations({ subtree: true });
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise((resolve) => setTimeout(resolve, 350)),
      ]);
    }
    if (!dialog.hasAttribute("data-closing")) {
      onAfterClose?.();
      return;
    }
    dialog.removeAttribute("data-closing");
  }

  dialog.close();
  onAfterClose?.();
}

/**
 * Wires Safari light-dismiss fallback (when `closedby` attribute is unsupported)
 * and routes `Esc` / cancel events through `closeDialogSmoothly`.
 */
export function bindDialogDismissHandlers(
  dialog: HTMLDialogElement | null,
  onRequestClose: () => void
): () => void {
  if (!dialog || typeof window === "undefined") return () => {};

  const handleCancel = (event: Event) => {
    event.preventDefault();
    onRequestClose();
  };

  const handleBackdropClick = (event: MouseEvent) => {
    if ("closedBy" in HTMLDialogElement.prototype) return;
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const insideContent =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!insideContent) {
      onRequestClose();
    }
  };

  dialog.addEventListener("cancel", handleCancel);
  dialog.addEventListener("click", handleBackdropClick);

  return () => {
    dialog.removeEventListener("cancel", handleCancel);
    dialog.removeEventListener("click", handleBackdropClick);
  };
}

/**
 * Executes a same-document View Transition when supported and routes keyboard/AT
 * focus to the target heading or element once complete.
 */
export function runViewTransition(updateDOM: () => void, focusTargetSelector?: string) {
  const routeFocus = () => {
    if (!focusTargetSelector || typeof document === "undefined") return;
    requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(focusTargetSelector);
      el?.focus({ preventScroll: true });
    });
  };

  if (
    typeof document === "undefined" ||
    !("startViewTransition" in document) ||
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  ) {
    updateDOM();
    routeFocus();
    return;
  }

  const docWithVT = document as Document & {
    startViewTransition: (cb: () => void) => { finished: Promise<void> };
  };

  const transition = docWithVT.startViewTransition(() => {
    updateDOM();
  });

  transition.finished.finally(() => {
    routeFocus();
  });
}
