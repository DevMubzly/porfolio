let instance: import("locomotive-scroll").default | null = null;

export function registerLocomotive(
  scroll: import("locomotive-scroll").default
) {
  instance = scroll;
}

export function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  if (instance) {
    instance.scrollTo(element, { offset: -100 });
  } else {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
