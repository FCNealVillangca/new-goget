import { config } from 'dotenv'
import path from 'path'

config({ path: path.resolve(process.cwd(), '.env') })

import { getPayload } from 'payload'

// Import config after env is loaded
const configPromise = (await import('../payload.config.js')).default

async function seed() {
  const payload = await getPayload({ config: configPromise })

  // Seed FAQs
  const faqs = [
    {
      question: 'How does it work?',
      answer:
        'It starts with a free 30-minute assessment to understand your current level and exam goals. From there, we create a structured plan and schedule weekly lessons at a time that works for you.',
      featured: true,
    },
    {
      question: 'Is it online or in person?',
      answer:
        'Lessons are primarily online via high-quality video conferencing, which allows for maximum flexibility. However, for students based in Chelmsford, in-person sessions can also be arranged.',
      featured: false,
    },
    {
      question: 'What level do you accept?',
      answer:
        'We specialise in GCSE and A-Level French support for all major exam boards. We also work with adult learners and beginners who want a structured, results-oriented approach to learning French.',
      featured: false,
    },
    {
      question: 'How quickly can we start?',
      answer:
        "Very quickly. Once we've had our initial assessment and agreed on a schedule, we can usually start your first full lesson within the same week.",
      featured: false,
    },
  ]

  for (const faq of faqs) {
    await payload.create({
      collection: 'faqs',
      data: {
        ...faq,
        _status: 'published',
        publishedAt: new Date().toISOString(),
      },
    })
  }

  // Seed Struggles
  const struggles = [
    {
      title: 'Falling behind in French',
      description:
        "Lessons move fast. They're losing confidence and feeling overwhelmed by the pace.",
    },
    {
      title: 'Afraid to speak in class',
      description: 'They freeze when asked to speak, fearing mistakes in front of their peers.',
    },
    {
      title: 'Unprepared for exams',
      description: "Hours of revision aren't translating into the grades and results they deserve.",
    },
    {
      title: 'Working hard, not improving',
      description:
        "Effort alone isn't leading to improvement without the right strategic approach.",
    },
  ]

  for (const struggle of struggles) {
    await payload.create({
      collection: 'struggles',
      data: {
        ...struggle,
        _status: 'published',
        publishedAt: new Date().toISOString(),
      },
    })
  }

  // Seed Testimonials
  const testimonials = [
    {
      quote:
        'The structured approach transformed my confidence in speaking exams. I went from freezing up to delivering clear, confident answers.',
      name: 'Sarah Chen',
      role: 'A-Level Student',
      featured: true,
    },
    {
      quote:
        'French used to be my weakest subject, but with this method, I achieved a Grade 8. The techniques work for real exam conditions.',
      name: 'Marcus Thompson',
      role: 'GCSE Student',
      featured: false,
    },
    {
      quote:
        'The speaking practice sessions were game-changing. I finally understood how to structure my answers for maximum marks.',
      name: 'Emma Rodriguez',
      role: 'AQA Student',
      featured: false,
    },
  ]

  for (const testimonial of testimonials) {
    await payload.create({
      collection: 'testimonials',
      data: {
        ...testimonial,
        _status: 'published',
        publishedAt: new Date().toISOString(),
      },
    })
  }

  console.log('Seeding completed!')
}

seed().catch(console.error)
