import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Phone, ArrowUpRight, Loader2 } from "lucide-react";
import { useTranslation } from "next-i18next";
import userData from "@constants/data";

export default function Contact() {
  const { t } = useTranslation("common");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sending = useRef(false);
  async function sendEmail(event) {
    event.preventDefault();
    if (sending.current) return;
    const data = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()]),
    );
    if (Object.values(data).some((value) => !value)) {
      setStatus("formRequired");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setStatus("formInvalidEmail");
      return;
    }
    sending.current = true;
    setIsLoading(true);
    setStatus("");
    try {
      await emailjs.send("service_50wgfvj", "template_zhoexop", data, {
        publicKey: "-Hccfm_2DUuYXUEoN",
      });
      setStatus("formSuccess");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("formError");
    } finally {
      sending.current = false;
      setIsLoading(false);
    }
  }
  return (
    <section className="page-shell">
      <h1 className="page-title">{t("contact")}</h1>
      <div className="contact-grid">
        <div className="contact-intro">
          <h2>{t("contact1")}</h2>
          <p>{t("contact2")}</p>
          <address className="contact-details">
            <a href={"tel:" + userData.phone.replace(/\s/g, "")}>
              <Phone size={20} aria-hidden="true" />
              {userData.phone}
            </a>
            <a href={"mailto:" + userData.email}>
              <Mail size={20} aria-hidden="true" />
              <span>{userData.email}</span>
            </a>
            <span>
              <MapPin size={20} aria-hidden="true" />
              {t("contactAddress")}
            </span>
          </address>
          <div className="social-links">
            {["linkedin", "github", "facebook", "instagram"].map((name) => (
              <a
                key={name}
                href={userData.socialLinks[name]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <form
          onSubmit={sendEmail}
          className="contact-form"
          aria-busy={isLoading}
        >
          {[
            ["name", "formName"],
            ["email", "formEmail"],
            ["message", "formMessage"],
          ].map(([name, label]) => (
            <div className="form-field" key={name}>
              <label htmlFor={name}>{t(label)}</label>
              {name === "message" ? (
                <textarea
                  id={name}
                  name={name}
                  rows={6}
                  required
                  maxLength={5000}
                  placeholder={t("messagePlaceholder")}
                  value={formData[name]}
                  disabled={isLoading}
                  onChange={(event) =>
                    setFormData({ ...formData, [name]: event.target.value })
                  }
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type={name === "email" ? "email" : "text"}
                  autoComplete={name}
                  required
                  maxLength={name === "email" ? 254 : 100}
                  placeholder={t(name + "Placeholder")}
                  value={formData[name]}
                  disabled={isLoading}
                  onChange={(event) =>
                    setFormData({ ...formData, [name]: event.target.value })
                  }
                />
              )}
            </div>
          ))}
          <button className="button-primary" type="submit" disabled={isLoading}>
            {isLoading && (
              <Loader2 className="animate-spin" size={18} aria-hidden="true" />
            )}
            {t(isLoading ? "formSending" : "formSubmit")}
          </button>
          <p
            className={
              "form-status " + (status === "formSuccess" ? "success" : "")
            }
            role="status"
            aria-live="polite"
          >
            {status ? t(status) : ""}
          </p>
        </form>
      </div>
    </section>
  );
}
