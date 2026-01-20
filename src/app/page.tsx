import { ds, cx } from "@/lib/design-system";
import { QuoteHighlight } from "@/components/quote-highlight";

export default function HomePage() {
  return (
    <main className={cx(ds.colors.background, "min-h-screen")}>
      {/* Viewport border frame - hidden on mobile */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none z-50 border-[18px] border-black" />

      <article className={cx(ds.layout.page, "sm:py-8")}>
        {/* Hero */}
        <header>
          <h1 className={cx(ds.typography.h1, ds.colors.text)}>
            I Am Not a Natural
          </h1>
        </header>

        {/* Who I Am */}
        <section className={cx(ds.spacing.afterTitle, ds.spacing.prose)}>
          <h2 className={cx(ds.typography.h2, ds.colors.text, ds.spacing.headingGap)}>
            Who I Am
          </h2>

          <p className={cx(ds.typography.body, ds.colors.text)}>
            I'm a revenue engineer. I build the data infrastructure and automation 
            systems that turn GTM chaos into repeatable revenue. I've built it for 
            myself and for others.{" "}
            <QuoteHighlight
              quote="Speed to Execution — you move extremely fast on your projects. Gathering information — you may be able to gather information about the current status of a situation faster than anyone I have ever worked with."
              attribution="Trey Knowles, former colleague"
            >
              And I am good at it.
            </QuoteHighlight>
          </p>

          <p className={cx(ds.typography.body, ds.colors.text)}>
            But I am by no means a natural. I don't have some God-given gift for 
            engineering. I haven't been coding since I was wearing braces, and I 
            can't tell you what Big O notation my code runs at.
          </p>

          <p className={cx(ds.typography.body, ds.colors.text)}>
            I'm a founder who taught himself to build data pipelines because the 
            businesses I was building demanded it. The only natural thing I have 
            going for me is the tenacity to keep wrangling data until it does what 
            I need.
          </p>
        </section>

        {/* Divider */}
        <hr className={ds.components.divider.line} />

        {/* What I Do */}
        <section className={ds.spacing.prose}>
          <h2 className={cx(ds.typography.h2, ds.colors.text, ds.spacing.headingGap)}>
            What I Do
          </h2>

          <p className={cx(ds.typography.body, ds.colors.text)}>
            When companies are spending $20k a month on paid and their cost per 
            meeting is through the roof — but half the leads are duplicates or 
            garbage — I build the pipeline that cleans the data so they can run 
            proper exclusions, tighten targeting, and stop paying to acquire the 
            same person twice.
          </p>

          <p className={cx(ds.typography.body, ds.colors.text)}>
            When someone from a target account hits the pricing page and no one 
            knows about it, I build the system that catches it, enriches the 
            contact, and pings the right rep in real time.
          </p>

          <p className={cx(ds.typography.body, ds.colors.text)}>
            When companies want to reach their entire market but their emails are 
            landing in spam, I build the outbound infrastructure — dedicated IPs, 
            proper warmup, domain configuration —{" "}
            <QuoteHighlight
              quote="Extremely hard-working. He singlehandedly stood up an entire system, handled hundreds of moving pieces, and didn't flinch at the manual work. He's not one to shirk grunt work even after months of long hours."
              attribution="James, former colleague"
            >
              that actually gets delivered.
            </QuoteHighlight>
          </p>
        </section>

        {/* Divider */}
        <hr className={ds.components.divider.line} />

        {/* How I Work */}
        <section className={ds.spacing.prose}>
          <h2 className={cx(ds.typography.h2, ds.colors.text, ds.spacing.headingGap)}>
            How I Work
          </h2>

          <div className={ds.spacing.loose}>
            <div>
              <h3 className={cx(ds.typography.h3, ds.colors.text, "mb-2")}>
                Expert Calls
              </h3>
              <p className={cx(ds.typography.body, ds.colors.text)}>
                One-off calls for specific questions — Clay, tooling, architecture, 
                whatever you're stuck on. You book time, we solve it.
              </p>
            </div>

            <div>
              <h3 className={cx(ds.typography.h3, ds.colors.text, "mb-2")}>
                Scoped Builds
              </h3>
              <p className={cx(ds.typography.body, ds.colors.text)}>
                A defined deliverable with a fixed price. Data pipeline, automation 
                system, outbound infrastructure. I build it, hand it off, you use it.
              </p>
            </div>

            <div>
              <h3 className={cx(ds.typography.h3, ds.colors.text, "mb-2")}>
                Ongoing Advisory
              </h3>
              <p className={cx(ds.typography.body, ds.colors.text)}>
                A retained relationship for founders who want me in their corner. 
                GTM strategy, systems architecture, what to build, what to skip, 
                who to hire. I take on a small number of these.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className={ds.components.divider.line} />

        {/* Who This Is For */}
        <section className={ds.spacing.prose}>
          <h2 className={cx(ds.typography.h2, ds.colors.text, ds.spacing.headingGap)}>
            Who This Is For
          </h2>

          <p className={cx(ds.typography.body, ds.colors.text)}>
            Series A+ founders and GTM leaders. $3M+ in revenue. At least 3 
            salespeople. Already spending $15k–$20k/month on paid acquisition. 
            Already paying for the tools — just not getting the results you 
            expected from them.
          </p>

          <p className={cx(ds.typography.body, ds.colors.text)}>
            ACV of $30k+ — so one new customer covers the engagement and then some.
          </p>
        </section>

        {/* Who This Is Not For */}
        <section className={cx(ds.spacing.prose, "mt-12")}>
          <h2 className={cx(ds.typography.h2, ds.colors.text, ds.spacing.headingGap)}>
            Who This Is Not For
          </h2>

          <p className={cx(ds.typography.body, ds.colors.text)}>
            Pre-product. Pre-revenue. Still figuring out product-market fit. If 
            that's you, this isn't the time.
          </p>

          <p className={cx(ds.typography.body, ds.colors.text)}>
            I also don't do fractional roles, retainers with vague scope, or 
            "embedded" anything. I'm not your employee.
          </p>
        </section>

        {/* Divider */}
        <hr className={ds.components.divider.line} />

        {/* CTA */}
        <section className="text-center">
          <h2 className={cx(ds.typography.h2, ds.colors.text, "mb-6")}>
            Let's Talk
          </h2>

          <p className={cx(ds.typography.body, ds.colors.text, "mb-8")}>
            If this sounds like what you need, here's my calendar.
          </p>

          <a
            href="#"
            className={ds.components.button.primary}
          >
            Book a call
          </a>
        </section>

        {/* Footer spacing */}
        <div className="h-16" />
      </article>
    </main>
  );
}
