'use client'

import React, { useState, useMemo } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { Faq } from '@/payload-types'

interface FaqListItem {
  id?: string
  question: string
  answer: string
}

interface FaqListProps {
  faqs: FaqListItem[]
  showContact: boolean
}

export const FaqList: React.FC<FaqListProps> = ({ faqs, showContact }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredFaqs = useMemo(() => {
    if (!searchQuery) return faqs
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [faqs, searchQuery])

  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedFaqs = filteredFaqs.slice(startIndex, startIndex + itemsPerPage)

  return (
    <>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setCurrentPage(1) // Reset to first page on search
          }}
          className="max-w-md"
        />
      </div>

      <Accordion type="single" collapsible className="w-full">
        {paginatedFaqs.map((faq, idx) => (
          <AccordionItem key={faq.id || `faq-${idx}`} value={`item-${faq.id || idx}`}>
            <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filteredFaqs.length === 0 && searchQuery && (
        <p className="text-slate-500 mt-4">No FAQs found matching your search.</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {showContact && (
        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
          <div className="text-sm">
            <p className="font-semibold">Still have questions?</p>
            <p className="text-slate-500">We're here to help.</p>
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
            Contact Support
          </button>
        </div>
      )}
    </>
  )
}
