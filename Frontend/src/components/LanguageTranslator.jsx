import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", label: "EN", name: "English" },
  { code: "mr", label: "मराठी", name: "Marathi" },
  { code: "hi", label: "हिंदी", name: "Hindi" }
];

const LanguageTranslator = () => {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    // Read current language from cookie if set
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/i);
    if (match && match[1]) {
      setCurrentLang(match[1].toLowerCase());
    }

    // Function to initialize Google Translate element inside container
    const initTranslate = () => {
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        const elem = document.getElementById("google_translate_element");
        if (elem && elem.children.length === 0) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,mr,hi",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            },
            "google_translate_element"
          );
        }
      }
    };

    if (!window.google || !window.google.translate) {
      window.googleTranslateElementInit = initTranslate;
      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }
    } else {
      initTranslate();
    }
  }, []);

  const changeLanguage = (langCode) => {
    setCurrentLang(langCode);

    // Set Google Translate cookie across path and domain
    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${domain};`;

    const selectElem = document.querySelector(".goog-te-combo");
    if (selectElem) {
      selectElem.value = langCode;
      
      // Trigger legacy onchange callback if attached directly by Google script
      if (typeof selectElem.onchange === "function") {
        selectElem.onchange();
      }
      
      // Dispatch standard DOM change event
      selectElem.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      // Soft fallback if element wasn't in DOM
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center gap-1.5 bg-green-950/90 border border-yellow-400/50 p-1 rounded-full text-xs shadow-md transition-all">
      <div className="flex items-center pl-1 text-yellow-300">
        <Globe size={15} />
      </div>

      {/* Custom Clean Language Buttons */}
      <div className="flex items-center gap-1">
        {languages.map((lang) => {
          const isActive = currentLang === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => changeLanguage(lang.code)}
              className={`px-2 py-0.5 rounded-full font-bold cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-yellow-400 text-green-950 shadow-md scale-105"
                  : "text-gray-200 hover:text-white hover:bg-white/10"
              }`}
              title={lang.name}
            >
              {lang.label}
            </button>
          );
        })}
      </div>

      {/* Target element for Google Translate script (hidden offscreen) */}
      <div
        id="google_translate_element"
        className="opacity-0 absolute pointer-events-none w-0 h-0 overflow-hidden"
      ></div>
    </div>
  );
};

export default LanguageTranslator;
