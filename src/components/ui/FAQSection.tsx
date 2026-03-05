'use client'
import { useState } from 'react'

interface FAQItem {
    question: string
    answer: string
}

export default function FAQSection({ faqs, title = "Frequently Asked Questions" }: { faqs: FAQItem[], title?: string }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-navy mb-8">{title}</h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full text-left p-5 flex justify-between items-center hover:bg-gray-50 transition"
                                aria-expanded={openIndex === i}
                            >
                                <h3 className="text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                                <span className="text-gold text-2xl flex-shrink-0">{openIndex === i ? '−' : '+'}</span>
                            </button>
                            {openIndex === i && (
                                <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
