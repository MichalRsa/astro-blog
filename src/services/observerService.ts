export const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

export const setObserver = (): void => {
  const hiddenElements = document.querySelectorAll(".animationHidden");

  hiddenElements.forEach((element) => {
    observer.observe(element);
  });
};

setObserver();
