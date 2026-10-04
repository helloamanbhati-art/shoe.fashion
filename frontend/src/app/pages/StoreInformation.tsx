import { Link, useLocation } from 'react-router';
import { ExternalLink, Instagram, MapPin, MessageCircle, Phone, Ruler, Truck } from 'lucide-react';
import { STORE } from '../config/store';

const pages = {
  '/about-us': {
    eyebrow: 'Our store', title: 'About Shoe Style', intro: STORE.tagline,
    body: 'Shoe Style is a women-focused footwear and accessories store in Sarojini Nagar, New Delhi. Discover heels, office chappals, boots, designer juttis, and bags in store or enquire online.',
  },
  '/contact-us': {
    eyebrow: 'We are here to help', title: 'Contact Shoe Style',
    intro: 'Questions about a product, colour, size, or order? Call, WhatsApp, DM us on Instagram, or visit the store.',
    body: 'Keep your product screenshot or order number ready so the team can help quickly. Opening hours and support email have not yet been confirmed.',
  },
  '/size-guide': {
    eyebrow: 'Find your fit', title: 'Footwear Size Guide',
    intro: 'Choose the size shown on each product page and ask the store if you are unsure about the fit.',
    body: 'Stand on a sheet of paper and measure from the back of your heel to the tip of your longest toe. Measure both feet and use the larger measurement. Product-specific fit notes take priority.',
  },
  '/shipping-delivery': {
    eyebrow: 'Order information', title: 'Shipping & Delivery',
    intro: 'Delivery availability, charges, and timelines must be confirmed for each destination.',
    body: 'Contact Shoe Style on WhatsApp before ordering if you need confirmation about delivery coverage, dispatch time, charges, COD, exchanges, or returns. These policies are not yet verified for publication.',
  },
} as const;

export function StoreInformation() {
  const { pathname } = useLocation();
  const page = pages[pathname as keyof typeof pages] ?? pages['/about-us'];

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{page.eyebrow}</p>
      <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">{page.title}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/75">{page.intro}</p>
      <div className="mt-10 border-y border-border py-8">
        <p className="max-w-3xl leading-7 text-foreground/70">{page.body}</p>

        {pathname === '/about-us' && (
          <section className="mt-8" aria-labelledby="store-details-heading">
            <h2 id="store-details-heading" className="text-xl font-semibold">Store details</h2>
            <dl className="mt-5 grid gap-px overflow-hidden border bg-border sm:grid-cols-2">
              <div className="flex gap-3 bg-background p-5"><Instagram className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" /><div><dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Instagram</dt><dd className="mt-1"><a href={STORE.instagramUrl} target="_blank" rel="noreferrer" className="font-medium hover:underline">{STORE.instagramHandle}</a></dd></div></div>
              <div className="flex gap-3 bg-background p-5"><Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" /><div><dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Call or WhatsApp</dt><dd className="mt-1 space-x-3"><a href={`tel:+91${STORE.primaryPhone}`} className="font-medium hover:underline">{STORE.primaryPhone}</a><a href={`tel:+91${STORE.secondaryPhone}`} className="font-medium hover:underline">{STORE.secondaryPhone}</a></dd></div></div>
              <div className="flex gap-3 bg-background p-5 sm:col-span-2"><MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" /><div><dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Store address</dt><dd className="mt-1 max-w-2xl leading-6">{STORE.address}</dd><dd className="mt-2 text-xs text-muted-foreground">{STORE.addressNote}</dd></div></div>
            </dl>
            <h2 className="mt-8 text-xl font-semibold">Featured collections</h2>
            <div className="mt-4 flex flex-wrap gap-2">{STORE.collections.map((collection) => <Link key={collection} to={`/?category=${encodeURIComponent(collection)}`} className="border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">{collection}</Link>)}</div>
          </section>
        )}

        {pathname === '/contact-us' && (
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <a href={STORE.whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 border p-4 hover:bg-accent"><MessageCircle className="size-5" /><span className="text-sm">WhatsApp</span></a>
            <a href={`tel:+91${STORE.primaryPhone}`} className="flex items-center gap-3 border p-4 hover:bg-accent"><Phone className="size-5" /><span className="text-sm">Call {STORE.primaryPhone}</span></a>
            <a href={STORE.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 border p-4 hover:bg-accent"><Instagram className="size-5" /><span className="text-sm">Instagram DM</span></a>
            <div className="flex items-center gap-3 border p-4"><MapPin className="size-5" /><span className="text-sm">Visit Sarojini Nagar</span></div>
          </div>
        )}

        {pathname === '/size-guide' && <div className="mt-8 flex items-start gap-4 bg-muted/50 p-5"><Ruler className="mt-0.5 size-5 shrink-0" /><p className="text-sm leading-6">Send a photo or product link on WhatsApp with your usual shoe size for product-specific guidance.</p></div>}
        {pathname === '/shipping-delivery' && <div className="mt-8 flex items-start gap-4 bg-muted/50 p-5"><Truck className="mt-0.5 size-5 shrink-0" /><p className="text-sm leading-6">Serviceable locations, delivery charges, COD, and return or exchange terms require store confirmation.</p></div>}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/?view=all" className="inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground">Shop all products</Link>
        <a href={STORE.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 border px-5 text-sm font-semibold"><MessageCircle className="size-4" />Ask on WhatsApp<ExternalLink className="size-3" /></a>
      </div>
    </main>
  );
}
