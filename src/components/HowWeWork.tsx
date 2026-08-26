import { MessageSquare, FileText, ClipboardCheck, Truck } from "lucide-react";

const steps = [
  { code: "01", icon: MessageSquare, title: "Inquiry", description: "Tell us the component, spec, or application you need." },
  { code: "02", icon: FileText, title: "Quote", description: "We confirm availability and pricing, backed by the authorized channel." },
  { code: "03", icon: ClipboardCheck, title: "Order", description: "Purchase order confirmed, genuine stock sourced or arranged." },
  { code: "04", icon: Truck, title: "Delivery", description: "Delivered to your plant, with technical support if you need it." },
];

/** Simple 4-step process strip shown on the homepage between About and the pressure gauge. */
const HowWeWork = () => {
  return (
    <section className="py-14 md:py-28 bg-background grid-paper">
      <div className="container mx-auto px-4">
        <div className="mono-label text-[11px] text-primary/70 mb-4 text-center">Process</div>
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-14 text-center">
          How we work
        </h2>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Connecting dimension line — desktop only */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-border" />

          {steps.map((step) => (
            <div key={step.code} className="relative plate p-6 card-shadow bg-card">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <span className="mono-label text-[10px] text-muted-foreground/60">Step {step.code}</span>
              </div>
              <h3 className="text-base font-display font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
