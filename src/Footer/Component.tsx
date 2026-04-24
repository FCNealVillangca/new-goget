import Link from 'next/link'
import React from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const {
    brandName,
    logo,
    description,
    phone,
    email,
    ctaTitle,
    ctaDescription,
    ctaButtonText,
    ctaLink,
    copyright,
    navItems,
    legalLinks,
  } = footerData || {}

  return (
    <footer className="bg-white border-t border-slate-200 pt-20 pb-10 px-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src="/assets/logo.png" alt={brandName || 'Logo'} className="h-10 w-auto" />
            </div>
            <p className="text-slate-500 leading-relaxed max-w-xs">{description}</p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-800 hover:text-white transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </a>
              <a
                href="mailto:info@gogetfrench.com"
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-800 hover:text-white transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
              Navigation
            </h4>
            <ul className="space-y-4 font-medium text-slate-600">
              {navItems?.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.link?.url || '#'}
                    className="hover:text-blue-800 transition-colors"
                  >
                    {item.link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-blue-800 mt-1 shrink-0"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="font-bold text-slate-900">{phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-blue-800 mt-1 shrink-0"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span className="font-bold text-slate-900">{email}</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-slate-900 p-8 rounded-3xl text-white">
            <h4 className="text-lg font-bold mb-4">{ctaTitle}</h4>
            <p className="text-white/60 text-sm mb-6">{ctaDescription}</p>
            <a
              href={ctaLink?.url || '#'}
              className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors text-sm block text-center"
            >
              {ctaLink?.label || ctaButtonText}
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{copyright}</p>
          <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-tighter">
            {legalLinks?.map((item, i) => (
              <a key={i} href={item.url || '#'} className="hover:text-blue-800 transition-colors">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
