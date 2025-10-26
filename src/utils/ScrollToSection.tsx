// utils/ScrollToSection.tsx
export const scrollToSection = (id: string) => {
    setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 200); // Delay ensures navigation finished
};
