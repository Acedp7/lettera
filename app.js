const openButton = document.querySelector("#open-letter");
const envelopeScene = document.querySelector(".envelope-scene");
const opening = document.querySelector("#opening");
const letter = document.querySelector("#love-letter");
const flowerBurst = document.querySelector("#flower-burst");

function releaseFlowers() {
  const flowers = ["✿", "❀", "✽", "❁", "✾", "❀", "✿", "✽", "❁", "✾", "❀", "✿"];

  flowers.forEach((flower, index) => {
    const petal = document.createElement("span");
    const angle = (Math.PI * 2 * index) / flowers.length;
    const distance = 95 + (index % 3) * 28;
    petal.className = "flower";
    petal.textContent = flower;
    petal.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    petal.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    petal.style.setProperty("--turn", `${index * 47}deg`);
    petal.style.setProperty("--size", `${1.2 + (index % 3) * 0.3}rem`);
    petal.style.setProperty("--delay", `${(index % 4) * 25}ms`);
    flowerBurst.append(petal);
    petal.addEventListener("animationend", () => petal.remove(), { once: true });
  });
}

openButton.addEventListener("click", () => {
  if (!letter.hidden) return;

  openButton.setAttribute("aria-expanded", "true");
  envelopeScene.classList.add("is-open");
  opening.classList.add("is-opening");
  releaseFlowers();

  window.setTimeout(() => {
    letter.hidden = false;
    opening.hidden = true;
    letter.querySelector(".letter-copy").focus({ preventScroll: true });
    letter.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 350);
});
