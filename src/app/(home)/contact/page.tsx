"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// FAQ data
const FAQ_ITEMS = [
  {
    question: "How can I contribute an article to CodeBlog?",
    answer:
      "We welcome guest contributions from experienced developers. Please send us a brief outline of your proposed article through our contact form, including your background and expertise. Our editorial team will review your proposal and get back to you within 5-7 business days.",
  },
  {
    question: "Do you offer advertising or sponsorship opportunities?",
    answer:
      "Yes, we offer various advertising and sponsorship options for relevant tech products and services. Please contact our partnerships team through the form on this page with details about your company and goals, and we'll share our media kit and options.",
  },
  {
    question: "How can I report an error in an article?",
    answer:
      "We strive for accuracy in all our content. If you spot an error, please use our contact form to let us know the article title, the specific error, and the correction if possible. Our team will review and update the article as needed.",
  },
  {
    question: "Can I request a topic for a future article?",
    answer:
      "We value reader input on topics. Submit your suggestion through our contact form, and our editorial team will consider it for future content. While we can't guarantee we'll cover every requested topic, we do prioritize frequently requested subjects.",
  },
  {
    question: "How often do you publish new articles?",
    answer:
      "We publish new articles 3-4 times per week, typically on Monday, Wednesday, and Friday. For major technology releases or events, we may publish additional articles. Subscribe to our newsletter to get notified when new content is available.",
  },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formState.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formState.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formState.message.length < 20) {
      newErrors.message = "Message must be at least 20 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center space-x-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">Contact</span>
          </nav>

          <div className="mb-8 space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Get in Touch</h1>
            <p className="text-muted-foreground">
              Have a question, suggestion, or want to work with us? We would love to hear from you.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact information */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Reach out to us through any of these channels.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-sm text-muted-foreground">
                          <a href="mailto:info@codeblog.com" className="hover:underline">
                            info@codeblog.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-sm text-muted-foreground">
                          123 Tech Street
                          <br />
                          San Francisco, CA 94107
                          <br />
                          United States
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-sm text-muted-foreground">
                          <a href="tel:+14155552671" className="hover:underline">
                            +1 (415) 555-2671
                          </a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Office Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM PST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 AM - 2:00 PM PST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we will get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                      <h3 className="mb-2 font-medium text-green-800 dark:text-green-300">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        Thank you for reaching out. We will respond to your message as soon as possible.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className={errors.name ? "border-red-500" : ""}
                          />
                          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="Your email address"
                            className={errors.email ? "border-red-500" : ""}
                          />
                          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          placeholder="What is this regarding?"
                          className={errors.subject ? "border-red-500" : ""}
                        />
                        {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="Your message"
                          rows={6}
                          className={errors.message ? "border-red-500" : ""}
                        />
                        {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ section */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
  )
}

