import { dictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { t, type Locale } from "@/lib/i18n";

export const Footer = ({ locale }: { locale: Locale }) => (
  <footer data-site-footer className="border-t border-rule">
    <div className="shell flex flex-col gap-3 py-10 sm:flex-row sm:items-baseline sm:justify-between">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
        © {new Date().getFullYear()} {profile.name}. {t(dictionary.footer.rights, locale)}
      </p>
      <p className="font-mono text-xs tracking-[0.06em] text-ink-muted">
        {t(dictionary.footer.builtWith, locale)}
      </p>
    </div>
  </footer>
);
