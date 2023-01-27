export const fadeInUp = {
  initial: { // from 
    opacity: 0,
    y:60
  },
  animate: { // to
    opacity: 1,
    y:0
  }
}
export const fadeInLeft = {
  initial: { // from 
    opacity: 0,
    x:60
  },
  animate: { // to
    opacity: 1,
    x:0
  }
}

export const stagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren:0.1
    }
  },
};
export const routerAnimation = {
  initial: {
    opacity:0
  },
  animate: {
    opacity:1,
    transition: {
      delay: .1,
      duration:.1,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      delay: .1,
      ease:"easeInOut"
    }
  }
};