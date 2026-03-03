import { useState, ChangeEvent, FormEvent } from 'react'
import type { FormData } from '../types'
import './Contact.css'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    // Ici, vous pouvez ajouter votre logique d'envoi de formulaire
    alert('Message envoyé ! (Démo)')
    console.log('Form data:', formData)
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    })
  }

  return (
    <section id="contact">
      <h2 className="section-title">Contactez-moi</h2>
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
    </section>
  )
}

export default Contact
