import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useReducedMotion,
} from "motion/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { GatsbyImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby";

const ToastContext = createContext(null);

/**
 * Imperative access to the toast system. Must be used inside <ToastProvider>.
 *
 * toast(options):
 * @param {string} options.id        Unique toast identity. Defaults to `message`
 *                                   when `message` is a string. When a toast with
 *                                   the same id is already visible, it shakes
 *                                   instead of adding a duplicate.
 * @param {React.ReactNode} options.message  Required. The prompt text (or rich
 *                                           node) always shown by default.
 * @param {React.ReactNode} options.content  Optional. Revealed on hover with the
 *                                           original transition animation.
 * @param {() => void} options.onClick       Optional. Body-click handler. When set,
 *                                           clicking the body runs it instead of closing.
 * @param {React.ReactNode} options.avatar   Optional. Overrides the brand avatar.
 * @param {() => void} options.onDismiss      Optional. Runs whenever the toast is dismissed
 *                                           (close button, body-click close, or auto-dismiss).
 * @param {number} [options.duration=0]       Auto-dismiss after N ms. 0 keeps it until closed.
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within <ToastProvider>");
  }
  return ctx;
}

function ToastItem({
  message,
  content,
  onClick,
  onClose,
  avatar,
  shakeId,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  const textRef = useRef(null);
  // The card grows to the natural height of the active content. Animating the
  // real `height` (instead of a scale transform) keeps the rounded corners a
  // constant size while the toast expands.
  const [cardHeight, setCardHeight] = useState(null);

  // Entrance: the card starts slightly offset and settles in.
  useEffect(() => {
    controls.start({ opacity: 1, y: 0, scale: 1 });
  }, [controls]);

  // Re-run the left-right shake on the whole toast whenever the same toast
  // is triggered again.
  useEffect(() => {
    if (shakeId > 0) {
      controls.start({
        x: [0, -8, 8, -5, 5, -2, 0],
        transition: { duration: 0.45, ease: "easeInOut" },
      });
    }
  }, [shakeId, controls]);

  // Measure the active content height. The card sits above the avatar (32px)
  // and the vertical padding (py-2 = 16px).
  useLayoutEffect(() => {
    if (textRef.current) {
      setCardHeight(Math.max(textRef.current.offsetHeight + 16, 48));
    }
  }, [isHovered, message, content]);

  const avatarData = useStaticQuery(graphql`
    query {
      me: file(relativePath: { eq: "lattespirit.jpg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: NONE, layout: FULL_WIDTH)
        }
      }
    }
  `);

  const brandAvatar = avatarData.me?.childImageSharp && (
    <GatsbyImage
      image={avatarData.me.childImageSharp.gatsbyImageData}
      className="w-8 h-8 rounded-full"
      alt="Jeffrey Yeung"
    />
  );

  const handleBodyClick = (e) => {
    // Let interactive children (links, buttons) handle their own clicks.
    if (e.target instanceof Element && e.target.closest("a, button")) return;
    if (typeof onClick === "function") {
      onClick(e);
    } else {
      onClose(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={controls}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleBodyClick}
      role="status"
      className="relative origin-top cursor-pointer pointer-events-auto"
    >
      <div
        style={{
          height: cardHeight ? `${cardHeight}px` : "auto",
          transition: prefersReducedMotion
            ? "none"
            : "height 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
        className="relative overflow-hidden rounded-xl flex items-center pl-4 pr-12 py-2 bg-white/20 backdrop-blur-md shadow-lg border border-white/20 text-sm md:text-base origin-top"
      >
        <div className="shrink-0">{avatar || brandAvatar}</div>
        <div
          ref={textRef}
          className="flex flex-col w-56 md:w-64 relative ml-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {!isHovered || !content ? (
              <motion.div
                key="message"
                layout
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="text-pink-light block"
              >
                {message}
              </motion.div>
            ) : (
              <motion.div
                key="content"
                layout
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
              >
                {content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <button
        className="absolute top-3 right-3 text-white bg-white/20 hover:bg-white/40 rounded-full p-1 cursor-pointer transition-colors"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose(e);
        }}
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current[id];
    if (timer) {
      clearTimeout(timer);
      delete timers.current[id];
    }
  }, []);

  const toast = useCallback(
    (options = {}) => {
      const {
        id,
        message,
        content,
        onClick,
        avatar,
        onDismiss,
        duration = 0,
      } = options;

      const toastId =
        id ?? (typeof message === "string" ? message : `toast-${Date.now()}`);

      setToasts((prev) => {
        const existing = prev.find((t) => t.id === toastId);
        if (existing) {
          return prev.map((t) =>
            t.id === toastId
              ? {
                  ...t,
                  message,
                  content,
                  onClick,
                  avatar,
                  onDismiss,
                  shakeId: t.shakeId + 1,
                }
              : t,
          );
        }
        const fresh = {
          id: toastId,
          message,
          content,
          onClick,
          avatar,
          onDismiss,
          duration,
          shakeId: 0,
        };
        // Newest toast sits on top; the rest slide down via layout.
        return [fresh, ...prev];
      });

      // Always reset the auto-dismiss timer for this id so a re-triggered
      // toast (deduplicated) doesn't get dismissed by a stale timer.
      if (timers.current[toastId]) clearTimeout(timers.current[toastId]);
      if (duration > 0) {
        timers.current[toastId] = setTimeout(() => {
          removeToast(toastId);
        }, duration);
      }
    },
    [removeToast],
  );

  const clearAll = useCallback(() => {
    Object.values(timers.current).forEach((timer) => clearTimeout(timer));
    timers.current = {};
    setToasts([]);
  }, []);

  useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      Object.values(activeTimers).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const value = useMemo(
    () => ({ toast, removeToast, clearAll }),
    [toast, removeToast, clearAll],
  );

  const handleClose = useCallback(
    (t) => {
      removeToast(t.id);
      if (typeof t.onDismiss === "function") t.onDismiss(t.id);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="fixed top-6 right-0 md:right-6 z-[70] flex flex-col items-end gap-2 pr-4 md:pr-0 max-w-[calc(100vw-2rem)] pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <ToastItem key={t.id} {...t} onClose={() => handleClose(t)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
