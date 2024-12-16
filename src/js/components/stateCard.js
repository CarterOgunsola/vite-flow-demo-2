import { queryElement } from "../utils";
import gsap from "gsap";

export default function stateCard() {
  const stateCard = queryElement("[data-component='state-card']");
  const stateCardImage = queryElement("[data-component='state-card-image']");
  const stateCardTitle = queryElement("[data-component='state-card-title']");
  const stateCardDescription = queryElement(
    "[data-component='state-card-description']"
  );

  // Set initial state for description
  gsap.set(stateCardDescription, {
    y: 20,
    opacity: 0,
  });

  // Create GSAP timeline
  const tl = gsap.timeline({ paused: true });

  // Add animations to timeline
  tl.to([stateCardImage, stateCardTitle], {
    scale: 1.1,
    duration: 0.6,
    ease: "power3.out",
  }).to(
    stateCardDescription,
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    },
    "<"
  ); // The "<" makes this animation start at the same time as the previous one

  // Add event listeners
  stateCard.addEventListener("mouseenter", () => {
    tl.play();
  });

  stateCard.addEventListener("mouseleave", () => {
    tl.reverse();
  });
}

console.log("stateCard.js");
