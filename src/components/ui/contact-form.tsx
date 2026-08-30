"use client";

import emailjs from "@emailjs/browser";
import { LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import { LiquidMetalButton } from "@/app/components/liquid-metal-button";

type FormStatus = "idle" | "sending" | "success" | "error" | "unconfigured";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || !formRef.current) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
      formRef.current.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={sendMessage} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 font-mono-tag text-[10px] uppercase tracking-[0.18em] text-muted">
          Name
          <input required name="user_name" autoComplete="name" placeholder="Your name" className="h-11 rounded-lg border border-white/[0.12] bg-black/50 px-3 font-body text-sm normal-case tracking-normal text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-white/50" />
        </label>
        <label className="grid gap-2 font-mono-tag text-[10px] uppercase tracking-[0.18em] text-muted">
          Email
          <input required type="email" name="user_email" autoComplete="email" placeholder="you@company.com" className="h-11 rounded-lg border border-white/[0.12] bg-black/50 px-3 font-body text-sm normal-case tracking-normal text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-white/50" />
        </label>
      </div>
      <label className="grid gap-2 font-mono-tag text-[10px] uppercase tracking-[0.18em] text-muted">
        Project brief
        <textarea required name="message" rows={4} placeholder="Tell me a little about the project..." className="resize-none rounded-lg border border-white/[0.12] bg-black/50 p-3 font-body text-sm normal-case tracking-normal text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-white/50" />
      </label>
      <div className="mt-1 flex flex-wrap items-center gap-4">
        <LiquidMetalButton label={status === "sending" ? "Sending..." : "Send message"} onClick={() => undefined} type="submit" disabled={status === "sending"} />
        {status === "sending" && <LoaderCircle className="h-4 w-4 animate-spin text-muted" />}
        {status === "success" && <p className="font-mono-tag text-xs text-emerald-300">Message sent. Thank you.</p>}
        {status === "error" && <p className="font-mono-tag text-xs text-red-300">Could not send the message. Please try again.</p>}
        {status === "unconfigured" && <p className="font-mono-tag text-xs text-amber-200">EmailJS keys still need to be configured.</p>}
      </div>
      <input type="hidden" name="source" value="portfolio-contact-form" />
    </form>
  );
}
