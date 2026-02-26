'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FaqItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

function FaqItem({ question, answer, isOpen, onClick }: FaqItemProps) {
    return (
        <div className={`border rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 ${isOpen ? 'bg-primary-900/60 border-accent-500/30 shadow-[0_0_15px_rgba(230,126,34,0.1)]' : 'bg-primary-900/30 border-white/10 hover:bg-primary-900/50 hover:border-white/20'}`}>
            <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={onClick}
            >
                <h3 className={`text-lg transition-colors duration-300 pr-4 ${isOpen ? 'font-bold text-white' : 'font-semibold text-gray-200'}`}>
                    {question}
                </h3>
                <motion.div
                    initial={false}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={`flex-shrink-0 transition-colors duration-300 ${isOpen ? 'text-accent-500' : 'text-gray-400'}`}
                >
                    <ChevronDown className="h-5 w-5" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 pt-0 text-gray-300 leading-relaxed">
                            <div className="pt-4 border-t border-white/5">
                                {answer}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FaqAccordion({ faqs }: { faqs: { question: string, answer: string }[] }) {
    // Default the first question to be open (index 0)
    const [openIndex, setOpenIndex] = useState<number>(0);

    return (
        <div className="space-y-4 w-full">
            {faqs.map((faq, index) => (
                <FaqItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={index === openIndex}
                    onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                />
            ))}
        </div>
    );
}
