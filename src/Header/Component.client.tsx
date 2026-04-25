'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'

import type { Header } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const { brandName, navItems, ctaText, ctaLink, logo } = data || {}

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close drawer on resize
  useEffect(() => {
    const handleResize = () => {
      setDrawerOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header
      id="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-white py-4'
      }`}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <img src="/assets/logo.png" alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8 items-center text-sm font-medium">
            {navItems?.map((item, i) => {
              let href = '#'
              if (item.link?.type === 'custom' && item.link.url) {
                href = item.link.url
              } else if (item.link?.type === 'reference' && item.link.reference) {
                const ref = item.link.reference
                if (
                  ref.relationTo === 'pages' &&
                  typeof ref.value === 'object' &&
                  ref.value &&
                  'slug' in ref.value
                ) {
                  href = `/${ref.value.slug}`
                } else if (
                  ref.relationTo === 'posts' &&
                  typeof ref.value === 'object' &&
                  ref.value &&
                  'slug' in ref.value
                ) {
                  href = `/posts/${ref.value.slug}`
                }
              }
              return (
                <Link
                  key={i}
                  href={href}
                  className="text-lg font-medium hover:text-blue-800 transition-colors"
                  onClick={() => setDrawerOpen(false)}
                >
                  {item.link?.label}
                </Link>
              )
            })}
          </div>
          <a
            href="#"
            className="bg-blue-800 text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-colors"
          >
            Book Now
          </a>
        </div>

        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="left">
          <DrawerTrigger asChild>
            <button className="md:hidden text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
            <DrawerDescription className="sr-only">Mobile navigation menu</DrawerDescription>
            <div className="flex flex-col gap-4 p-4">
              {navItems?.map((item, i) => {
                let href = '#'
                if (item.link?.type === 'custom' && item.link.url) {
                  href = item.link.url
                } else if (item.link?.type === 'reference' && item.link.reference) {
                  const ref = item.link.reference
                  if (
                    ref.relationTo === 'pages' &&
                    typeof ref.value === 'object' &&
                    ref.value &&
                    'slug' in ref.value
                  ) {
                    href = `/${ref.value.slug}`
                  } else if (
                    ref.relationTo === 'posts' &&
                    typeof ref.value === 'object' &&
                    ref.value &&
                    'slug' in ref.value
                  ) {
                    href = `/posts/${ref.value.slug}`
                  }
                }
                return (
                  <Link key={i} href={href} className="hover:text-blue-800 transition-colors">
                    {item.link?.label}
                  </Link>
                )
              })}
              {ctaLink?.url && (
                <a
                  href={ctaLink.url}
                  className="bg-blue-800 text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-colors text-center"
                  onClick={() => setDrawerOpen(false)}
                >
                  {ctaText}
                </a>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  )
}
