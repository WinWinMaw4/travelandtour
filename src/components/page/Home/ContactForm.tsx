/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

const ContactForm: React.FC = () => {
    const { t } = useTranslation();
    const formRef = useRef<HTMLFormElement>(null);
    const [isSending, setIsSending] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    const sendEmail = async (e: React.FormEvent) => {

        e.preventDefault();
        if (!formRef.current) return;

        setIsSending(true);
        setStatusMessage("");

        try {
            const result = await emailjs.sendForm(
                "service_5rhtx7i", // 🔹 Replace with your EmailJS service ID
                "template_xwyz7zs", // 🔹 Replace with your EmailJS template ID
                formRef.current,
                "hKa4bsmaGzw4qx7tf" // 🔹 Replace with your EmailJS public key
            );
            console.log(result.text);
            setStatusMessage("✅ Your message has been sent successfully!");
            formRef.current.reset();
        } catch (error: any) {
            console.error(error.text);
            setStatusMessage("❌ Something went wrong. Please try again later.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <form
            ref={formRef}
            onSubmit={sendEmail}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md space-y-4 border border-gray-100"
        >
            <h3 className="text-2xl font-semibold mb-4 text-emerald-700">
                {t("contact.form.title")}
            </h3>
            <p className="text-gray-600 text-sm mb-6">
                {t("contact.form.subtitle")}
            </p>

            <input
                type="text"
                name="name"
                placeholder={t("contact.form.fields.name")}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
            />
            <input
                type="email"
                name="email"
                placeholder={t("contact.form.fields.email")}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
            />
            <textarea
                name="message"
                placeholder={t("contact.form.fields.message")}
                rows={5}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
            ></textarea>

            <button
                type="submit"
                disabled={isSending}
                className={`w-full bg-emerald-700 text-white py-3 rounded-xl transition font-medium ${isSending ? "opacity-70 cursor-not-allowed" : "hover:bg-emerald-800"
                    }`}
            >
                {isSending ? "Sending..." : "Send Message"}
            </button>

            {statusMessage && (
                <p
                    className={`text-center text-sm mt-3 ${statusMessage.startsWith("✅")
                        ? "text-emerald-600"
                        : "text-red-500"
                        }`}
                >
                    {statusMessage}
                </p>
            )}
        </form>
    );
};

export default ContactForm;
