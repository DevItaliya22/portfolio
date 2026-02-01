import { socialLinks } from '@/lib/info';
import LiveTime from '@/components/ui/LiveTime';
import PageViews from '@/components/ui/PageViews';

export default function PortfolioFooter() {
  const footerLinks = socialLinks.filter((link) =>
    ['Github', 'Twitter', 'Linkedin', 'Email'].includes(link.label)
  );

  return (
    <footer className="mt-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {footerLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={
                  link.href.startsWith('mailto:')
                    ? undefined
                    : 'noopener noreferrer'
                }
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <IconComponent className="h-5 w-5" />
              </a>
            );
          })}
          <a
            href="https://www.papermark.com/view/cml3f50u00004l404rrrtcvs5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            resume{' '}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <LiveTime />
          <span
            className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600 shrink-0"
            aria-hidden
          />
          <PageViews />
        </div>
      </div>
    </footer>
  );
}
