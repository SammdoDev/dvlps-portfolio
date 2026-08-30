"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

interface LiquidMetalButtonProps {
  label?: string;
  onClick?: () => void;
  viewMode?: "text" | "icon";
  /** Icon shown when viewMode="icon". Defaults to Sparkles. */
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

export function LiquidMetalButton({
  label = "Get Started",
  onClick,
  viewMode = "text",
  icon,
  variant = "primary",
  disabled = false,
  type = "button",
  className,
}: LiquidMetalButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  useEffect(() => {
    const styleId = "liquid-metal-btn-style";
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .liquid-metal-btn {
        --lm-bezel: linear-gradient(
          180deg,
          #f5f5f5 0%,
          #9a9a9a 14%,
          #3c3c3c 34%,
          #101010 52%,
          #050505 58%,
          #3c3c3c 76%,
          #a8a8a8 92%,
          #f5f5f5 100%
        );
      }
      .liquid-metal-bezel {
        background: var(--lm-bezel);
      }
      .liquid-metal-face {
        background: linear-gradient(180deg, #242424 0%, #050505 100%);
      }
      .liquid-metal-shine {
        background: linear-gradient(
          115deg,
          transparent 30%,
          rgba(255, 255, 255, 0.16) 45%,
          rgba(255, 255, 255, 0.35) 50%,
          rgba(255, 255, 255, 0.16) 55%,
          transparent 70%
        );
        background-size: 220% 220%;
        background-position: 120% 50%;
        transition: background-position 0.6s ease, opacity 0.3s ease;
      }
      .liquid-metal-btn:hover .liquid-metal-shine {
        background-position: -20% 50%;
      }
      @keyframes liquid-metal-ripple {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0.55; }
        100% { transform: translate(-50%, -50%) scale(4.5); opacity: 0; }
      }
      .liquid-metal-ripple {
        animation: liquid-metal-ripple 0.6s ease-out;
      }
      @media (prefers-reduced-motion: reduce) {
        .liquid-metal-shine { transition: none; }
        .liquid-metal-ripple { animation: none; opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const ripple = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        id: rippleId.current++,
      };
      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    }
    onClick?.();
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      aria-label={label}
      className={cn(
        "liquid-metal-btn group relative isolate inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full border font-medium transition-all duration-300 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-55",
        viewMode === "icon"
          ? "h-11 w-11 sm:h-[46px] sm:w-[46px]"
          : "h-11 gap-2 px-6 sm:h-[46px] sm:px-7",
        variant === "primary"
          ? "border-white/30 bg-black text-white shadow-[0_12px_30px_rgba(0,0,0,0.55)] hover:-translate-y-0.5 hover:border-white/60 hover:bg-[#121212] hover:shadow-[0_18px_38px_rgba(0,0,0,0.72)]"
          : "border-white/[0.16] bg-white/[0.03] text-foreground hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.08]",
        className,
      )}
    >
      {/* chrome bezel — the visible "ring" */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.25)_50%,transparent_80%)] opacity-70"
      />
      {/* black face, inset from the bezel so the rim reads as metal */}
      <span
        aria-hidden
        className="absolute inset-px rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.13),transparent_45%)]"
        style={{
          boxShadow: isPressed
            ? "inset 0 2px 8px rgba(0,0,0,0.26)"
            : "inset 0 1px 1px rgba(255,255,255,0.16)",
          transition: "box-shadow 0.15s ease",
        }}
      />
      {/* hover shine sweep */}
      <span
        aria-hidden
        className="liquid-metal-shine absolute inset-[2px] rounded-full opacity-0 group-hover:opacity-100"
      />

      <span
        className="relative z-10 flex items-center gap-2 whitespace-nowrap text-[13px] font-medium"
      >
        {viewMode === "icon" ? (
          icon ?? <Sparkles size={16} />
        ) : (
          <>
            {label}
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </>
        )}
      </span>

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="liquid-metal-ripple pointer-events-none absolute h-5 w-5 rounded-full bg-white/40"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </button>
  );
}

export default LiquidMetalButton;
