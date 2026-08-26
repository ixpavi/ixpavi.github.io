import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const fieldClass =
  "rounded-none border-0 border-b-2 border-border bg-transparent px-0 py-3 focus-visible:ring-0 focus-visible:border-primary transition-colors";

const ContactSection = () => {
  return (
    <section id="contact" className="py-14 md:py-28 bg-background grid-paper section-animate">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div>
            <div className="mono-label text-[11px] text-primary/70 mb-4">Get in Touch</div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-5">
              Let's discuss your requirements
            </h2>
            <p className="text-muted-foreground mb-12 leading-relaxed">
              Whether you need a single component or a complete system solution, our team
              is ready to help. Contact us for product inquiries, technical support, or
              to request a quote.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h4 className="mono-label text-[11px] text-muted-foreground mb-2">Phone</h4>
                  <div className="flex flex-col -my-2">
                    <a href="tel:+919414180022" className="text-foreground hover:text-primary transition-colors py-2 inline-block">
                      +91 94141 80022{" "}
                      <span className="text-muted-foreground text-xs">— Rajiv Kumar Sharma</span>
                    </a>
                    <a href="tel:+917442480036" className="text-foreground hover:text-primary transition-colors py-2 inline-block">
                      +91 0744 2480036
                    </a>
                    <a href="tel:+917442480037" className="text-foreground hover:text-primary transition-colors py-2 inline-block">
                      +91 0744 2480037
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h4 className="mono-label text-[11px] text-muted-foreground mb-2">Email</h4>
                  <a href="mailto:sales@yatiindia.com" className="text-foreground hover:text-primary transition-colors py-2 -my-2 inline-block">
                    sales@yatiindia.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="min-w-0">
                  <h4 className="mono-label text-[11px] text-muted-foreground mb-2">Address</h4>
                  <a
                    href="https://maps.app.goo.gl/tYYBegppskLdkDgn6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors leading-relaxed block"
                  >
                    Shop No. S30-S31, Chambal Industrial Area, DCM Road, Opposite Multimetals Ltd, Kota – 324003 (Raj), India
                  </a>
                  <a
                    href="https://maps.app.goo.gl/tYYBegppskLdkDgn6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-64 h-44 mt-3 border border-border overflow-hidden hover:border-primary transition-colors"
                  >
                    <iframe
                      title="Yati International Inc. — Kota, Rajasthan location"
                      src="https://www.google.com/maps?q=Shop+No.+S30-S31,+Chambal+Industrial+Area,+DCM+Road,+Kota,+Rajasthan+324003&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0, pointerEvents: "none" }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form — styled as a work order */}
          <div className="relative bg-card p-8 md:p-10 border border-border">
            <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-border">
              <h3 className="text-xl font-display font-semibold text-foreground">Request a Quote</h3>
              <span className="mono-label text-[10px] text-muted-foreground">Work Order</span>
            </div>
            <form
              action="https://formsubmit.co/sales@yatiindia.com"
              method="POST"
              className="space-y-7"
            >
              <input type="hidden" name="_subject" value="New Quote Request - Yati International" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="mono-label text-[10px] text-muted-foreground block mb-2">
                    First Name
                  </label>
                  <Input name="First Name" placeholder="John" required className={fieldClass} />
                </div>
                <div>
                  <label className="mono-label text-[10px] text-muted-foreground block mb-2">
                    Last Name
                  </label>
                  <Input name="Last Name" placeholder="Doe" required className={fieldClass} />
                </div>
              </div>

              <div>
                <label className="mono-label text-[10px] text-muted-foreground block mb-2">
                  Email
                </label>
                <Input type="email" name="Email" placeholder="john@company.com" required className={fieldClass} />
              </div>

              <div>
                <label className="mono-label text-[10px] text-muted-foreground block mb-2">
                  Company
                </label>
                <Input name="Company" placeholder="Your Company Name" className={fieldClass} />
              </div>

              <div>
                <label className="mono-label text-[10px] text-muted-foreground block mb-2">
                  Message
                </label>
                <Textarea
                  name="Message"
                  placeholder="Tell us about your requirements..."
                  className={`min-h-[100px] ${fieldClass}`}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full rounded-none mono-label text-xs"
              >
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
