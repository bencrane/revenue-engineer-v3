import { ds, cx } from "@/lib/design-system";
import { BorderText } from "@/components/border-text";
import content from "@/content/new-copy.json";

export default function HomePage() {
  return (
    <main className={cx(ds.colors.background, "min-h-screen")}>
      {/* Viewport border frame with text - hidden on mobile */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none z-50">
        {/* Border */}
        <div className="absolute inset-0 border-[26px] border-black" />

        {/* Top edge */}
        <BorderText
          text="RevenueEngineer.com"
          orientation="horizontal"
          borderWidth={26}
          className="absolute top-0 left-[26px] right-[26px]"
        />

        {/* Bottom edge */}
        <BorderText
          text="RevenueEngineer.com"
          orientation="horizontal"
          borderWidth={26}
          className="absolute bottom-0 left-[26px] right-[26px]"
        />

        {/* Left edge */}
        <BorderText
          text="RevenueEngineer.com"
          orientation="vertical"
          borderWidth={26}
          rotate={180}
          className="absolute left-0 top-[26px] bottom-[26px]"
        />

        {/* Right edge */}
        <BorderText
          text="RevenueEngineer.com"
          orientation="vertical"
          borderWidth={26}
          className="absolute right-0 top-[26px] bottom-[26px]"
        />
      </div>

      <article className={cx(ds.layout.page, "sm:py-8")}>
        {/* Hero */}
        <header>
          <h1 className={cx(ds.typography.h1, ds.colors.text, "italic")}>
            {content.hero.heading}
          </h1>
        </header>

        <section className={cx(ds.spacing.afterTitle, ds.spacing.prose)}>
          {content.hero.paragraphs.map((paragraph, i) => (
            <p key={i} className={cx(ds.typography.body, ds.colors.text)}>
              {paragraph}
            </p>
          ))}
        </section>

        {/* Divider */}
        <hr className={ds.components.divider.line} />

        {/* About - I'm not a natural */}
        <section className={ds.spacing.prose}>
          <h2 className={cx(ds.typography.h2, ds.colors.text, ds.spacing.headingGap)}>
            {content.about.heading}
          </h2>

          {content.about.paragraphs.map((paragraph, i) => (
            <p key={i} className={cx(ds.typography.body, ds.colors.text)}>
              {paragraph}
            </p>
          ))}
        </section>

        {/* Divider */}
        <hr className={ds.components.divider.line} />

        {/* What I Do */}
        <section className={ds.spacing.prose}>
          <h2 className={cx(ds.typography.h2, ds.colors.text, ds.spacing.headingGap)}>
            {content.whatIDo.heading}
          </h2>

          {content.whatIDo.paragraphs.map((paragraph, i) => (
            <p key={i} className={cx(ds.typography.body, ds.colors.text)}>
              {paragraph}
            </p>
          ))}
        </section>

        {/* Divider */}
        <hr className={ds.components.divider.line} />

        {/* How I Help */}
        <section className={ds.spacing.prose}>
          <h2 className={cx(ds.typography.h2, ds.colors.text, ds.spacing.headingGap)}>
            {content.howIHelp.heading}
          </h2>

          <p className={cx(ds.typography.body, ds.colors.text)}>
            {content.howIHelp.intro}
          </p>

          <div className={ds.spacing.loose}>
            {content.howIHelp.offerings.map((offering, i) => (
              <div key={i}>
                <h3 className={cx(ds.typography.h3, ds.colors.text, "mb-2")}>
                  {offering.name}
                </h3>
                <p className={cx(ds.typography.body, ds.colors.text)}>
                  {offering.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className={ds.components.divider.line} />

        {/* CTA */}
        <section>
          <h2 className={cx(ds.typography.h2, ds.colors.text, "mb-6")}>
            {content.cta.heading}
          </h2>

          <a
            href={content.cta.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={ds.components.button.primary}
          >
            {content.cta.buttonText}
          </a>
        </section>

        {/* Footer spacing */}
        <div className="h-16" />
      </article>
    </main>
  );
}
