const values = [
  {
    code: "01",
    title: "Authorized Supply",
    description: "Genuine Parker Hannifin and Demech products, sourced only through official channels.",
  },
  {
    code: "02",
    title: "Critical-Environment Experience",
    description: "Trusted by nuclear, thermal power, and fertilizer plants where reliability isn't optional.",
  },
  {
    code: "03",
    title: "Long-Term Relationships",
    description: "Many customer relationships span well over a decade, built on consistent, dependable supply.",
  },
  {
    code: "04",
    title: "Regional Reach",
    description: "Serving industrial plants across Rajasthan, Madhya Pradesh, Uttar Pradesh, and Gujarat.",
  },
];

/** Company values laid out as a spec-sheet table (ref / attribute / detail rows) instead of a card grid. */
const ValuesSpecSheet = () => {
  return (
    <div className="border border-border bg-card card-shadow">
      <div className="flex items-center justify-between gap-4 px-5 py-3 border-b-2 border-foreground mono-label text-[10px] text-muted-foreground">
        <span>Spec Sheet — What You Get</span>
        <span>Ref. Yati/2004</span>
      </div>
      <dl>
        {values.map((value) => (
          <div
            key={value.code}
            className="grid grid-cols-[2rem_1fr] sm:grid-cols-[2rem_10rem_1fr] gap-x-4 gap-y-1 px-5 py-5 border-b border-border last:border-b-0 hover:bg-secondary transition-colors"
          >
            <span className="mono-label text-[11px] text-primary/60 pt-0.5">{value.code}</span>
            <dt className="font-display font-semibold text-foreground text-sm leading-snug">{value.title}</dt>
            <dd className="col-start-2 sm:col-start-3 text-muted-foreground text-sm leading-relaxed">
              {value.description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ValuesSpecSheet;
