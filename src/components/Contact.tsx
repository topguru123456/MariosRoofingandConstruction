import { Clock, Mail, Phone } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { contact, site } from '../content/siteContent'
import { Reveal } from './ui/Reveal'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const inputClass =
  'focus-ring w-full rounded-lg border border-navy/12 bg-cream/30 px-4 py-3.5 text-[16px] text-navy placeholder:text-slate-soft/60 outline-none transition-[border-color,box-shadow] focus:border-gold/50 focus:bg-white'

const phoneLines = [
  { ...site.phones.texas, region: 'Texas Gulf Coast' },
  { ...site.phones.florida, region: 'South Florida' },
] as const

function ContactSidebar() {
  return (
    <aside className="space-y-4 lg:pt-2">
      <p className="text-[15px] font-semibold text-navy">Or call us directly</p>

      {phoneLines.map((line) => (
        <a
          key={line.number}
          href={line.href}
          className="focus-ring flex items-center gap-4 rounded-xl border border-navy/10 bg-white px-5 py-4 transition-colors hover:border-gold/40 hover:bg-cream/40"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cream text-gold-deep">
            <Phone className="h-4 w-4" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-[12px] font-semibold tracking-wide text-slate-soft uppercase">
              {line.label}
            </span>
            <span className="block font-display text-[20px] font-bold text-navy">{line.number}</span>
            <span className="block text-[13px] text-slate-soft">{line.region}</span>
          </span>
        </a>
      ))}

      <div className="flex items-start gap-4 rounded-xl border border-navy/10 bg-white px-5 py-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cream text-gold-deep">
          <Clock className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <p className="text-[12px] font-semibold tracking-wide text-slate-soft uppercase">
            {contact.hours.label}
          </p>
          <p className="mt-0.5 font-display text-[17px] font-bold text-navy">
            {contact.hours.schedule}
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-soft">{contact.hours.note}</p>
        </div>
      </div>

      <a
        href={site.emailHref}
        className="focus-ring flex items-center gap-4 rounded-xl border border-navy/10 bg-white px-5 py-4 transition-colors hover:border-gold/40 hover:bg-cream/40"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cream text-gold-deep">
          <Mail className="h-4 w-4" aria-hidden />
        </span>
        <span className="min-w-0 break-all">
          <p className="text-[12px] font-semibold tracking-wide text-slate-soft uppercase">Email</p>
          <p className="mt-0.5 font-display text-[17px] font-bold text-navy">{site.email}</p>
        </span>
      </a>
    </aside>
  )
}

export function Contact() {
  const [status, setStatus] = useState<FormState>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    if (data.get('company')) return

    setStatus('submitting')

    try {
      const response = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })

      if (!response.ok) throw new Error('Form submission failed')

      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-cream py-20 sm:py-24">
      <div className="section-container">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow-light">{contact.eyebrow}</p>
            <h2 className="section-title">{contact.title}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate-soft">{contact.subtitle}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-5 lg:gap-12">
          <Reveal className="lg:col-span-3" direction="scale">
            <div className="overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-[0_20px_60px_rgba(19,32,46,0.08)]">
              <div className="h-1 bg-gold" />

              <div className="p-6 sm:p-8 lg:p-10">
                {status === 'success' ? (
                  <div className="py-10 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                      <Mail className="h-7 w-7" aria-hidden />
                    </div>
                    <p className="font-display text-[24px] font-bold text-navy">Message sent!</p>
                    <p className="mt-2 text-[16px] text-slate-soft">
                      Thanks for reaching out. We&apos;ll get back to you shortly.
                    </p>
                    <button
                      type="button"
                      className="mt-6 text-[15px] font-semibold text-gold-deep hover:underline"
                      onClick={() => setStatus('idle')}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8 border-b border-navy/8 pb-6">
                      <h3 className="font-display text-[22px] font-bold text-navy sm:text-[24px]">
                        Tell us about your project
                      </h3>
                      <p className="mt-2 text-[15px] text-slate-soft">
                        Fill out the form below — we&apos;ll follow up fast, usually the same business
                        day.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <input
                        type="text"
                        name="company"
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                        aria-hidden
                      />

                      <div>
                        <label htmlFor="name" className="mb-2 block text-[14px] font-semibold text-navy">
                          Name <span className="text-red">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          required
                          placeholder="Your full name"
                          className={inputClass}
                        />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="phone" className="mb-2 block text-[14px] font-semibold text-navy">
                            Phone <span className="text-red">*</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="(555) 555-5555"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-2 block text-[14px] font-semibold text-navy">
                            Email <span className="text-red">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="you@email.com"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="service" className="mb-2 block text-[14px] font-semibold text-navy">
                          Service needed <span className="text-red">*</span>
                        </label>
                        <select
                          id="service"
                          name="service"
                          required
                          className={inputClass}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            What can we help with?
                          </option>
                          {contact.fields.services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="mb-2 block text-[14px] font-semibold text-navy">
                          Message <span className="text-red">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          placeholder="Describe your project, timeline, or any questions..."
                          className={`${inputClass} resize-y`}
                        />
                      </div>

                      {status === 'error' ? (
                        <p className="rounded-lg bg-red/10 px-4 py-3 text-[14px] text-red">
                          Something went wrong. Please call us at {site.phones.texas.number}.
                        </p>
                      ) : null}

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={status === 'submitting'}
                          className="cta-shimmer isolate w-full overflow-hidden rounded-lg px-6 py-4 text-[16px] font-semibold tracking-wide text-navy uppercase transition-shadow hover:shadow-[0_8px_28px_rgba(242,180,10,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {status === 'submitting' ? 'Sending...' : 'Get My Free Quote'}
                        </button>
                        <p className="mt-3 text-center text-[13px] text-slate-soft">
                          Free estimate · No obligation · Your info stays private
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={0.08}>
            <ContactSidebar />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
