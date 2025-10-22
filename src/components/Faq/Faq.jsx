import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQSection = () => {
    const faqs = [
        {
            question: "How do I add new food items?",
            answer:
                "Go to the 'Add Food' section, fill in the details like name, quantity, category, and expiry date, and click submit to save the item.",
        },
        {
            question: "Can I track multiple fridges?",
            answer:
                "Yes! You can categorize your food items by location or fridge name while adding them to manage multiple storage areas.",
        },
        {
            question: "Will I get notifications for expiring items?",
            answer:
                "Currently, the system highlights items that are expiring soon and expired, helping you take timely action.",
        },
        {
            question: "Is my data private?",
            answer:
                "Absolutely. Your food item data is only accessible to you and securely stored in our database.",
        },
        {
            question: "Can I delete or edit a food item?",
            answer:
                "Yes! You can edit or delete any food item from your 'My Items' section whenever needed.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="max-w-8xl mx-auto px-4 py-10 bg-gray-50 rounded-2xl sm:md:3 md:mt-10 border-2 border-gray-100">
            <h2 className="text-3xl font-bold text-red-600 mb-10">
                Frequently Asked Questions
            </h2>

            <div className="space-y-4 max-w-8xl mx-auto">
                {faqs.map((faq, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-md border border-gray-200"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                        >
                            <span className="font-medium text-gray-800">{faq.question}</span>
                            <span className="text-green-600 text-xl">
                                {openIndex === index ? "−" : "+"}
                            </span>
                        </button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-6 pb-4 text-gray-700"
                                >
                                    {faq.answer}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FAQSection;
