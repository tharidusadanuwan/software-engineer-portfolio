"use client";

import {
  useState,
} from "react";

import {
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { api } from "@/lib/api";

/* ============================================================
   CONTACT PAGE
============================================================ */

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  /* ==========================================================
     INPUT CHANGE
  ========================================================== */

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /* ==========================================================
     SUBMIT
  ========================================================== */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setSending(true);
    setSuccess("");
    setError("");

    try {
      await api.post(
        "/public/messages",
        form,
      );

      setSuccess(
        "Your message has been sent successfully. I will get back to you as soon as possible.",
      );

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      console.error(
        "Contact form error:",
        error,
      );

      setError(
        error?.response?.data?.message ||
          "Unable to send your message. Please try again.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f8ff] text-slate-900">

      {/* ======================================================
          NAVBAR
      ====================================================== */}

      <Navbar />

      {/* ======================================================
          HERO
      ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#07111f]
          px-6
          pb-20
          pt-32
          sm:px-8
          lg:px-14
          xl:px-20
        "
      >

        {/* Background glow */}

        <div
          className="
            pointer-events-none
            absolute
            -left-40
            top-10
            h-[400px]
            w-[400px]
            rounded-full
            bg-blue-600/20
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[-120px]
            top-20
            h-[400px]
            w-[400px]
            rounded-full
            bg-cyan-400/10
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-180px]
            left-1/2
            h-[400px]
            w-[600px]
            -translate-x-1/2
            rounded-full
            bg-purple-500/10
            blur-[120px]
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-7xl
            text-center
          "
        >

          {/* Badge */}

          <div
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-400/20
              bg-blue-400/10
              px-4
              py-2
            "
          >
            <MessageCircle
              className="
                h-4
                w-4
                text-blue-400
              "
            />

            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-blue-300
              "
            >
              Get In Touch
            </span>
          </div>

          {/* Heading */}

          <h1
            className="
              text-4xl
              font-black
              tracking-tight
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            Let&apos;s Work{" "}
            <span
              className="
                bg-gradient-to-r
                from-blue-400
                via-cyan-400
                to-purple-400
                bg-clip-text
                text-transparent
              "
            >
              Together
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-slate-400
              sm:text-base
            "
          >
            Have a project in mind or want to
            discuss an opportunity? Feel free to
            reach out. I&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* ======================================================
          CONTACT SECTION
      ====================================================== */}

      <section
        className="
          relative
          px-5
          py-16
          sm:px-8
          sm:py-20
          lg:px-14
          lg:py-24
          xl:px-20
        "
      >

        {/* Decorative background */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-20
            h-80
            w-80
            rounded-full
            bg-blue-100/70
            blur-[100px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-20
            right-0
            h-80
            w-80
            rounded-full
            bg-purple-100/60
            blur-[100px]
          "
        />

        <div
          className="
            relative
            mx-auto
            grid
            max-w-7xl
            gap-8
            lg:grid-cols-[1fr_1.15fr]
          "
        >

          {/* ==================================================
              CONTACT INFORMATION
          ================================================== */}

          <div
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-7
              shadow-[0_10px_40px_rgba(15,23,42,0.05)]
              sm:p-9
              lg:p-10
            "
          >

            {/* Heading */}

            <div>
              <div
                className="
                  mb-3
                  h-1
                  w-8
                  rounded-full
                  bg-blue-500
                "
              />

              <h2
                className="
                  text-2xl
                  font-black
                  text-slate-900
                  sm:text-3xl
                "
              >
                Contact Information
              </h2>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Feel free to contact me directly
                through any of the following
                channels.
              </p>
            </div>

            {/* ==================================================
                CONTACT ITEMS
            ================================================== */}

            <div className="mt-8 space-y-4">

              {/* Email */}

              <a
                href="mailto:tharidusadanuwan100@gmail.com"
                className="
                  group
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-blue-100
                  bg-blue-50/60
                  p-4
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:bg-blue-50
                  hover:shadow-md
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-500
                    text-white
                    shadow-lg
                    shadow-blue-500/20
                  "
                >
                  <Mail className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-blue-500
                    "
                  >
                    Email
                  </p>

                  <p
                    className="
                      mt-1
                      break-all
                      text-sm
                      font-bold
                      text-slate-800
                    "
                  >
                    tharidusadanuwan100@gmail.com
                  </p>
                </div>
              </a>

              {/* WhatsApp */}

              <a
                href="https://wa.me/94704437626"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-emerald-100
                  bg-emerald-50/60
                  p-4
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-emerald-200
                  hover:bg-emerald-50
                  hover:shadow-md
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-500
                    text-white
                    shadow-lg
                    shadow-emerald-500/20
                  "
                >
                  <MessageCircle className="h-5 w-5" />
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-emerald-600
                    "
                  >
                    WhatsApp
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-bold
                      text-slate-800
                    "
                  >
                    +94 704 437 626
                  </p>
                </div>
              </a>

              {/* Mobile */}

              <a
                href="tel:+94763790196"
                className="
                  group
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-purple-100
                  bg-purple-50/60
                  p-4
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-purple-200
                  hover:bg-purple-50
                  hover:shadow-md
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-purple-500
                    text-white
                    shadow-lg
                    shadow-purple-500/20
                  "
                >
                  <Phone className="h-5 w-5" />
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-purple-600
                    "
                  >
                    Mobile
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-bold
                      text-slate-800
                    "
                  >
                    076 379 0196
                  </p>
                </div>
              </a>

              {/* Location */}

              <div
                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-orange-100
                  bg-orange-50/60
                  p-4
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-orange-500
                    text-white
                    shadow-lg
                    shadow-orange-500/20
                  "
                >
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-orange-600
                    "
                  >
                    Location
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-bold
                      text-slate-800
                    "
                  >
                    Colombo, Sri Lanka
                  </p>
                </div>
              </div>
            </div>

            {/* ==================================================
                SOCIAL LINKS
            ================================================== */}

            <div
              className="
                mt-8
                border-t
                border-slate-100
                pt-7
              "
            >
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-slate-400
                "
              >
                Connect With Me
              </p>

              <div
                className="
                  mt-4
                  flex
                  gap-3
                "
              >

                {/* GitHub */}

                <a
                  href="https://github.com/tharidusadanuwan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-900
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-slate-700
                  "
                >
                  <FaGithub className="h-5 w-5" />
                </a>

                {/* LinkedIn */}

                <a
                  href="https://www.linkedin.com/in/tharidu-sadanuwan-78b5a9299/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-600
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-blue-500
                  "
                >
                  <FaLinkedinIn className="h-5 w-5" />
                </a>

                {/* Email */}

                <a
                  href="mailto:tharidusadanuwan100@gmail.com"
                  aria-label="Email"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-purple-600
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-purple-500
                  "
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* ==================================================
              CONTACT FORM
          ================================================== */}

          <div
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-7
              shadow-[0_10px_40px_rgba(15,23,42,0.05)]
              sm:p-9
              lg:p-10
            "
          >

            {/* Form Heading */}

            <div>
              <div
                className="
                  mb-3
                  h-1
                  w-8
                  rounded-full
                  bg-gradient-to-r
                  from-blue-500
                  to-cyan-400
                "
              />

              <h2
                className="
                  text-2xl
                  font-black
                  text-slate-900
                  sm:text-3xl
                "
              >
                Send Me a Message
              </h2>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Have an idea, project, or
                opportunity? Send me a message and
                I&apos;ll get back to you.
              </p>
            </div>

            {/* ==================================================
                SUCCESS
            ================================================== */}

            {success && (
              <div
                className="
                  mt-6
                  flex
                  gap-3
                  rounded-2xl
                  border
                  border-emerald-200
                  bg-emerald-50
                  p-4
                "
              >
                <CheckCircle2
                  className="
                    mt-0.5
                    h-5
                    w-5
                    flex-shrink-0
                    text-emerald-600
                  "
                />

                <p
                  className="
                    text-sm
                    leading-6
                    text-emerald-700
                  "
                >
                  {success}
                </p>
              </div>
            )}

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
              <div
                className="
                  mt-6
                  rounded-2xl
                  border
                  border-red-200
                  bg-red-50
                  p-4
                "
              >
                <p
                  className="
                    text-sm
                    leading-6
                    text-red-700
                  "
                >
                  {error}
                </p>
              </div>
            )}

            {/* ==================================================
                FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >

              {/* Name + Email */}

              <div
                className="
                  grid
                  gap-5
                  sm:grid-cols-2
                "
              >

                {/* Name */}

                <div>
                  <label
                    htmlFor="name"
                    className="
                      mb-2
                      block
                      text-xs
                      font-bold
                      text-slate-700
                    "
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    maxLength={100}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      py-3.5
                      text-sm
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                    "
                  />
                </div>

                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="
                      mb-2
                      block
                      text-xs
                      font-bold
                      text-slate-700
                    "
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    maxLength={150}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      py-3.5
                      text-sm
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                    "
                  />
                </div>
              </div>

              {/* Subject */}

              <div>
                <label
                  htmlFor="subject"
                  className="
                    mb-2
                    block
                    text-xs
                    font-bold
                    text-slate-700
                  "
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                  maxLength={200}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3.5
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>

              {/* Message */}

              <div>
                <label
                  htmlFor="message"
                  className="
                    mb-2
                    block
                    text-xs
                    font-bold
                    text-slate-700
                  "
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  maxLength={5000}
                  rows={7}
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3.5
                    text-sm
                    leading-6
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={sending}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-500
                  px-6
                  py-4
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-blue-500/20
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  hover:shadow-blue-500/30
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {sending ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />

                    Sending...
                  </>
                ) : (
                  <>
                    Send Message

                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer />
    </main>
  );
}