export default function SiteHeader({ back }: { back?: boolean }) {
  return (
    <header className="site-header">
      <a href="#/" className="wordmark" aria-label="Agent Army 图鉴, home">
        {back ? (
          <span className="wordmark__back" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 3.5L5.5 8l4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ) : (
          <span className="seal" aria-hidden="true">
            鉴
          </span>
        )}
        <span className="wordmark__text">
          Agent Army <span className="cjk">图鉴</span>
        </span>
      </a>
      <a
        href="https://github.com/serenakeyitan/agent-org-chart"
        target="_blank"
        rel="noopener noreferrer"
        className="site-header__link"
      >
        Source
      </a>
    </header>
  )
}
