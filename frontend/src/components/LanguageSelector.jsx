import { useEffect, useRef, useState } from "react";
import italyFlag from "../assets/italy_flag_128.png";
import japanFlag from "../assets/japan_flag_128.png";
import usaFlag from "../assets/usa_flag_128.png";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { i18n } = useTranslation();

  const activeLng = i18n.language;

  const currentLanguage = {
    lng: activeLng,
    lng_flag: activeLng === "it" ? italyFlag : activeLng === "jp" ? japanFlag : usaFlag,
  };

  function changeLanguage(lng) {
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
    return;
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on component unmount or when dropdown closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="language_selector" ref={dropdownRef}>
      <button onClick={() => setDropdownOpen(true)}>
        <h6>{currentLanguage.lng}</h6>
        <span>
          <img src={currentLanguage.lng_flag} alt="" width="32px" height="32px" />
        </span>
      </button>
      {dropdownOpen && (
        <ul className="language_selector_dropdown">
          <li>
            <button
              onClick={() => {
                changeLanguage("it");
              }}
            >
              <h6>IT</h6>
              <span>
                <img src={italyFlag} alt="" width="32px" height="32px" />
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                changeLanguage("jp");
              }}
            >
              <h6>JP</h6>
              <span>
                <img src={japanFlag} alt="" width="32px" height="32px" />
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                changeLanguage("en");
              }}
            >
              <h6>EN</h6>
              <span>
                <img src={usaFlag} alt="" width="32px" height="32px" />
              </span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
