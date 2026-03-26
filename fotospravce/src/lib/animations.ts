const easing = [0.22, 1, 0.36, 1] as const;

export const fadeIn = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.58, ease: easing } },
};

export const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const staggerItem = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.52, ease: easing } },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.42, ease: easing } },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -28 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.56, ease: easing } },
};

export const slideInRight = {
  initial: { opacity: 0, x: 28 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.56, ease: easing } },
};

export const fadeInUp = staggerItem;
