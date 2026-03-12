import { useState } from "react";
import { motion, cubicBezier } from "framer-motion";
import { FiTwitter, FiLinkedin, FiGithub } from "react-icons/fi";
import { FaMediumM } from "react-icons/fa";
import ExpandLine from "../../../components/ExpandLine";
import { site } from "../../../config/site";

const ease = cubicBezier(0.16, 1, 0.3, 1);

const services = ["Website", "Mobile App", "Dashboard", "Branding", "Other"];
const budgets = ["< $5K", "$5K — $15K", "$15K — $50K", "$50K+"];

export default function ContactForm() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-[#DFDFDF] py-[clamp(60px,8vw,120px)] px-[clamp(24px,5vw,80px)]">
      <div className="grid grid-cols-[1.2fr_0.8fr] gap-[clamp(40px,8vw,160px)] max-w-[1400px] mx-auto max-lg:grid-cols-1">
        {/* Left — Form */}
        <div>
          <motion.div
            className="flex items-center gap-4 mb-[clamp(2rem,4vw,3.5rem)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
          >
            <ExpandLine className="bg-gray w-12" />
            <p className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-gray">
              Send a Message
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              className="py-20"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease }}
            >
              <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold tracking-[-0.02em] uppercase text-black mb-4">
                Thank You
              </h3>
              <p className="text-[0.9375rem] leading-[1.8] text-gray-dark max-w-[400px]">
                Your message has been received. I'll get back to you within 24
                hours.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-10"
            >
              {[
                {
                  label: "Your Name",
                  type: "text",
                  name: "name",
                  placeholder: "John Doe",
                },
                {
                  label: "Email Address",
                  type: "email",
                  name: "email",
                  placeholder: "john@example.com",
                },
              ].map((field, i) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease }}
                >
                  <label className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-gray block mb-3">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    placeholder={field.placeholder}
                    className="w-full bg-transparent text-[clamp(1rem,1.5vw,1.25rem)] font-medium text-black border-b border-gray-light pb-4 outline-none transition-colors duration-300 focus:border-black placeholder:text-[#ccc]"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
              >
                <label className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-gray block mb-4">
                  What do you need?
                </label>
                <div className="flex flex-wrap gap-3">
                  {services.map((service, i) => (
                    <motion.button
                      key={service}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className={`text-[0.75rem] font-medium tracking-[0.05em] py-2.5 px-5 border transition-all duration-300 cursor-pointer ${
                        selectedService === service
                          ? "bg-black text-off-white border-black"
                          : "bg-transparent text-gray-dark border-gray-light hover:border-black hover:text-black"
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + i * 0.05,
                        ease,
                      }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {service}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: 0.3, ease }}
              >
                <label className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-gray block mb-4">
                  Budget Range
                </label>
                <div className="flex flex-wrap gap-3">
                  {budgets.map((budget, i) => (
                    <motion.button
                      key={budget}
                      type="button"
                      onClick={() => setSelectedBudget(budget)}
                      className={`text-[0.75rem] font-medium tracking-[0.05em] py-2.5 px-5 border transition-all duration-300 cursor-pointer ${
                        selectedBudget === budget
                          ? 'bg-black text-off-white border-black'
                          : 'bg-transparent text-gray-dark border-gray-light hover:border-black hover:text-black'
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.05, ease }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {budget}
                    </motion.button>
                  ))}
                </div>
              </motion.div> */}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: 0.4, ease }}
              >
                <label className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-gray block mb-3">
                  Project Details
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me about your project, timeline, and goals..."
                  className="w-full bg-transparent text-[clamp(1rem,1.5vw,1.25rem)] font-medium text-black border-b border-gray-light pb-4 outline-none transition-colors duration-300 focus:border-black placeholder:text-[#ccc] resize-none"
                />
              </motion.div>

              <motion.button
                type="submit"
                className="self-start bg-black text-off-white text-[0.75rem] font-semibold tracking-[0.15em] uppercase py-5 px-14 transition-all duration-300 hover:bg-[#222] cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Send Message
              </motion.button>
            </form>
          )}
        </div>

        {/* Right — Contact Details */}
        <motion.div
          className="max-lg:border-t max-lg:border-gray-light max-lg:pt-[clamp(2rem,4vw,3.5rem)]"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.2, ease }}
        >
          <motion.div
            className="flex items-center gap-4 mb-[clamp(2rem,4vw,3.5rem)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
          >
            <ExpandLine className="bg-gray w-12" delay={0.3} />
            <p className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-gray">
              Contact Details
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-x-[clamp(1.5rem,2vw,2.5rem)] mb-[clamp(2.5rem,4vw,3.5rem)]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
            >
              <p className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-gray mb-4">
                Email
              </p>
              <a
                href={`mailto:${site.contact.email}`}
                className="text-[clamp(0.9375rem,1.4vw,1.25rem)] font-semibold tracking-[-0.01em] text-black transition-colors duration-200 hover:text-gray-dark"
              >
                {site.contact.email}
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
            >
              <p className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-gray mb-4">
                Phone
              </p>
              <a
                href={`tel:${site.contact.phone}`}
                className="text-[clamp(0.9375rem,1.4vw,1.25rem)] font-semibold tracking-[-0.01em] text-black transition-colors duration-200 hover:text-gray-dark"
              >
                {site.contact.phone.replace(
                  /^(\+?\d{3})(\d{3})(\d{3})(\d{3})$/,
                  "$1 $2 $3 $4",
                ) || site.contact.phone}
              </a>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-x-[clamp(1.5rem,2vw,2.5rem)] gap-y-[clamp(2rem,3vw,2.5rem)] mb-[clamp(2.5rem,4vw,3.5rem)]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6, ease }}
            >
              <p className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-gray mb-4">
                Social
              </p>
              <div className="flex gap-4">
                {[
                  {
                    icon: FiTwitter,
                    label: "Twitter",
                    href: site.social.twitter || site.social.x || "#",
                  },
                  {
                    icon: FiLinkedin,
                    label: "LinkedIn",
                    href: site.social.linkedin || "#",
                  },
                  {
                    icon: FiGithub,
                    label: "GitHub",
                    href: site.social.github || "#",
                  },
                  {
                    icon: FaMediumM,
                    label: "Medium",
                    href: site.social.medium || "#",
                  },
                ].map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={
                      social.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-gray-dark transition-colors duration-200 hover:text-black"
                    aria-label={social.label}
                    whileHover={{ y: -3, scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.06 }}
                  >
                    <div className="border border-solid border-gray p-2 rounded-sm">
                      <social.icon size={16} />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
            >
              <p className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-gray mb-4">
                Location
              </p>
              <p className="text-sm font-normal text-gray-dark mb-1.5">
                Based in Lagos, Nigeria
              </p>
              <p className="text-sm font-normal text-gray-dark">
                Available worldwide
              </p>
            </motion.div>
          </div>

          <ExpandLine className="bg-gray-light" delay={0.8} />
          <motion.div
            className="pt-[clamp(1.5rem,2vw,2rem)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
          >
            <p className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-gray mb-4">
              Availability
            </p>
            <p className="flex items-center gap-2 text-sm font-normal text-gray-dark">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] shrink-0 animate-pulse" />
              Open for projects
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
