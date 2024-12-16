import { queryElement } from "../utils";
import gsap from "gsap";

export default function stateModal() {
  const stateModal = queryElement("[data-component='modal']");
  const stateModalBg = queryElement("[data-component='modal-bg']");
  const stateModalDrawer = queryElement("[data-component='modal-drawer']");
  const stateModalClose = queryElement("[data-trigger='modal-close']");
  const stateModalOpen = queryElement("[data-trigger='modal-open']");

  // Initial state
  gsap.set(stateModal, { display: "none" });
  gsap.set(stateModalBg, { opacity: 0 });
  gsap.set(stateModalDrawer, { x: "100%" });

  // Open animation
  function openModal() {
    // Timeline for opening sequence
    const tl = gsap.timeline();

    tl.set(stateModal, { display: "flex" })
      .to(stateModalBg, {
        opacity: 1,
        duration: 0.5,
        ease: "expo.out",
      })
      .to(stateModalDrawer, {
        x: "0%",
        duration: 0.5,
        ease: "expo.out",
      });
  }

  // Close animation
  function closeModal() {
    const tl = gsap.timeline({
      onComplete: () => gsap.set(stateModal, { display: "none" }),
    });

    tl.to(stateModalDrawer, {
      x: "100%",
      duration: 0.5,
      ease: "power4.in",
    }).to(stateModalBg, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  }

  // Event listeners
  stateModalOpen?.addEventListener("click", openModal);
  stateModalClose?.addEventListener("click", closeModal);

  // Optional: Close modal when clicking background
  stateModalBg?.addEventListener("click", (e) => {
    if (e.target === stateModalBg) {
      closeModal();
    }
  });
}
