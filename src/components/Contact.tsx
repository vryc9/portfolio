import { useState, type ChangeEvent, type FormEvent } from "react";
import type { FormData } from "../types";
import "./Contact.css";
import SectionHeader from "./SectionHeader";

const INITIAL_FORM_DATA: FormData = {
  name: "",
  email: "",
  message: "",
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;
    const key = name as keyof FormData;

    setFormData((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    alert("Message envoyé !");
    setFormData(INITIAL_FORM_DATA);
  };

  return (
    <section id="contact">
      <SectionHeader eyebrow="On se contacte ?" title="Contactez-moi" />
      <div className="form-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">nom</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Votre nom"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Votre message..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="cta-button">
            git push origin contact
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
