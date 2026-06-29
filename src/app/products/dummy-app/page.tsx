import { CheckCircle2, Download, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Dummy App | mitaa.dev",
  description: "Een krachtige applicatie voor ontwikkelaars.",
};

export default function ProductPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 sm:py-32">
      {/* Hero Sectie */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 mb-6">
            Nieuwe release v2.0
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            DevBoost Pro
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            De ultieme tool om je ontwikkelingsworkflow te versnellen. Krijg meer gedaan in minder tijd met slimme automatiseringen en ingebouwde templates.
          </p>
          
          {/* Features lijstje */}
          <ul className="space-y-3 mb-8">
            {[
              "Onbeperkte projecten aanmaken",
              "Levenslange licentie (Lifetime deal)",
              "Inclusief 1 jaar gratis updates",
              "Beschikbaar voor macOS en Windows"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing / Koop Card */}
        <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-8 flex flex-col items-center text-center">
          <div className="mb-4">
            <h3 className="text-2xl font-bold">Lifetime Licentie</h3>
            <p className="text-muted-foreground text-sm mt-2">Eenmalige betaling, voor altijd van jou.</p>
          </div>
          
          <div className="my-6">
            <span className="text-5xl font-extrabold">€49</span>
            <span className="text-muted-foreground">,00</span>
            <p className="text-xs text-muted-foreground mt-2">Exclusief BTW (berekend bij afrekenen)</p>
          </div>

          {/* DUMMY LEMON SQUEEZY LINK */}
          <Link 
            href="#" 
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 mb-4"
          >
            Koop Nu veilig
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" />
            Veilige betaling via Lemon Squeezy
          </p>
        </div>
      </div>

      {/* Extra informatie / Screenshots sectie */}
      <div className="mt-32">
        <h2 className="text-3xl font-bold mb-8 text-center">Waarom DevBoost Pro?</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg">Bliksemsnel</h3>
            <p className="text-sm text-muted-foreground">Geschreven in Rust voor maximale prestaties zonder zwaar geheugengebruik.</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
              <Download className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg">Directe Download</h3>
            <p className="text-sm text-muted-foreground">Na betaling ontvang je direct je licentiesleutel en downloadlink in je mail.</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg">Ingebouwde Validatie</h3>
            <p className="text-sm text-muted-foreground">Je persoonlijke licentie bewijst dat jij de legitieme eigenaar bent.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
