"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, CalendarClock, CarFront, Check, ChevronDown,
  ClipboardCheck, ExternalLink, Flame, House, List, MapPinned, Menu,
  MessageCircle, Moon, Phone, Route, ShieldAlert, Sparkles, Sun, ThermometerSun,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type Question = { ask: string; why: string };
type Property = {
  id: string; order: number; address: string; short: string; timing: string; access: string;
  price: string; facts: string[]; hoa: string; garage: string; laundry: string; stairs: string;
  photo: string; listing: string; directions: string; fit: string; friction: string; quickRead: string;
  questions: Question[]; inspect: string[]; neighborhood: string[]; confidence: "planned" | "possible";
};

const properties: Property[] = [
  {
    id: "belleview", order: 1, address: "8524 E Belleview Street, Scottsdale, AZ 85257", short: "8524 E Belleview",
    timing: "Appointment first · exact time TBD", access: "Likely the one requiring notice", price: "$319,000",
    facts: ["2 bd", "1.5 ba*", "950 sq ft", "1984"], hoa: "$382/mo", garage: "Attached 1-car", laundry: "Full-size room", stairs: "Two levels",
    photo: "/photos/8524-e-belleview.jpg", listing: "https://www.zillow.com/homedetails/8524-E-Belleview-St-Scottsdale-AZ-85257/7578096_zpid/",
    directions: "https://www.google.com/maps/dir/?api=1&destination=8524%20E%20Belleview%20St%2C%20Scottsdale%2C%20AZ%2085257",
    fit: "Real garage, full-size laundry, gated courtyard and a familiar Scottsdale pocket.",
    friction: "Highest HOA of the four and a bath-count conflict: Kathy’s email says 2; live details show 1.5.",
    quickRead: "Best test of whether the garage + laundry package is worth two stories and the higher monthly dues.",
    questions: [
      { ask: "Why is this HOA $382 when 1204 N 85th is about $348 in the same pocket?", why: "You want the exact coverage, reserve strength and assessment risk—not just the sticker price." },
      { ask: "Is it 1.5 baths or 2, and is every improvement permitted?", why: "The email and live listing disagree; the official record affects value and underwriting." },
      { ask: "What is the owner-occupancy and rental concentration here? Any short-term rentals?", why: "This can change noise, financing eligibility, resale and the day-to-day feel." },
      { ask: "How do packages, guests and emergency access work with the back-patio entry?", why: "The unusual entry pattern may be fine—or a recurring hassle." },
      { ask: "What exactly did the seller improve after buying in 2023?", why: "Ask for receipts, permits and warranties before paying for an ‘updated’ label." },
    ],
    inspect: ["Measure garage door/parking depth and look for usable storage", "Run full-size laundry and verify vent route, pan and shutoff", "Test upstairs cooling; compare temperature with first floor", "Check courtyard gate gaps, shade and hot surfaces for the dog"],
    neighborhood: ["Known-positive 84th–85th Place pocket", "Walk the delivery path from street to patio", "Pause outside for aircraft, traffic and neighbor noise", "Likely a manageable commute; verify afternoon traffic toward McClintock"],
    confidence: "planned",
  },
  {
    id: "85th", order: 2, address: "1204 N 85th Place, Scottsdale, AZ 85257", short: "1204 N 85th Place",
    timing: "After Belleview · likely vacant", access: "Direct garage + rear patio entry", price: "$318,999",
    facts: ["2 bd", "1.5 ba*", "950 sq ft", "1984"], hoa: "$348/mo", garage: "Attached 1-car", laundry: "Inside / upstairs*", stairs: "Two levels",
    photo: "/photos/1204-n-85th-place.jpg", listing: "https://www.zillow.com/homedetails/1204-N-85th-Pl-Scottsdale-AZ-85257/2056230192_zpid/",
    directions: "https://www.google.com/maps/dir/?api=1&destination=1204%20N%2085th%20Pl%2C%20Scottsdale%2C%20AZ%2085257",
    fit: "The strongest feature stack: closing garage, inside laundry and extensive 2024 updates near $319k.",
    friction: "Two stories, upstairs carpet/laundry uncertainty and roughly 171 days on market need explanation.",
    quickRead: "The likely front-runner on paper. Focus on whether the stairs, entry path and HOA health weaken the garage advantage.",
    questions: [
      { ask: "What explains the long market time—financing, HOA, prior inspections or seller expectations?", why: "A long listing period can create leverage, but it can also signal a hidden blocker." },
      { ask: "Can we see receipts, permits and transferable warranties for the 2024 HVAC, windows and plumbing work?", why: "Recent work is valuable only if it is documented and durable." },
      { ask: "Where exactly is the washer/dryer, and can full-size units fit and vent correctly?", why: "Upstairs placement could help convenience but add leak, noise and service concerns." },
      { ask: "Is the garage deeded to this unit, and what are its interior dimensions, outlets and storage rules?", why: "The garage is your top differentiator; verify it functions like one." },
      { ask: "Any special assessment, insurance change, reserve concern or rental cap discussion?", why: "These are the condo facts most likely to affect monthly cost and loan approval." },
    ],
    inspect: ["Open/close garage and test direct unit access", "Walk a package from curb/gate to the actual front door", "Check stair width, carpet condition and laundry carrying route", "Touch west-facing glass/walls and compare upstairs HVAC output"],
    neighborhood: ["Same familiar Scottsdale community, newer section", "Compare privacy directly with Belleview", "Check evening parking and guest-space availability", "Evaluate dog-walk shade and pavement temperature"],
    confidence: "planned",
  },
  {
    id: "1041", order: 3, address: "1041 N Granite Reef Road, Scottsdale, AZ 85257", short: "1041 N Granite Reef",
    timing: "Next · likely vacant", access: "Single-level alternative", price: "$314,900",
    facts: ["3 bd", "2 ba", "1,107 sq ft", "Single level"], hoa: "$345/mo", garage: "Assigned carport", laundry: "Hall conversion", stairs: "None",
    photo: "/photos/1041-n-granite-reef.jpg", listing: "https://www.zillow.com/homedetails/1041-N-Granite-Reef-Rd-Scottsdale-AZ-85257/7577566_zpid/",
    directions: "https://www.google.com/maps/dir/?api=1&destination=1041%20N%20Granite%20Reef%20Rd%2C%20Scottsdale%2C%20AZ%2085257",
    fit: "Three bedrooms, two true baths and no stairs for less than the garage units.",
    friction: "No garage. The new hall laundry conversion and lower-than-2021 ask deserve careful diligence.",
    quickRead: "Best space and accessibility value. Decide whether a third bedroom and single level can beat the missing garage.",
    questions: [
      { ask: "Was the hall laundry conversion permitted, and is it correctly powered, drained and vented?", why: "A poor retrofit can create fire, moisture and insurance problems." },
      { ask: "Why is the ask below the 2021 purchase price despite the remodel?", why: "This is a direct way to surface condition, HOA or seller-motivation issues." },
      { ask: "What does the $345 HOA cover, and who owns the roof, pipes and exterior?", why: "Responsibility lines determine your real risk and insurance needs." },
      { ask: "Is the carport deeded or assigned, and is locked storage allowed?", why: "You need to know whether the parking tradeoff is merely cosmetic or practical." },
      { ask: "What are the pet, patio and gate rules?", why: "The dog/private-yard fit needs written confirmation, not an assumption." },
    ],
    inspect: ["Photograph laundry hookups, labels and vent termination", "Check patio gate/security and dog escape gaps", "Inspect ceilings/baseboards for old moisture", "Stand in the quietest room with HVAC off for two minutes"],
    neighborhood: ["Granite Reef corridor is convenient but busier", "Check unit orientation relative to the road", "Walk from carport to unit with groceries in mind", "Compare privacy and landscaping with the 85th Place units"],
    confidence: "planned",
  },
  {
    id: "1001", order: 4, address: "1001 N Granite Reef Road, Scottsdale, AZ 85257", short: "1001 N Granite Reef",
    timing: "Possible add-on · confirm with Cathy", access: "Include if access/time allow", price: "$325,000",
    facts: ["3 bd", "2 ba", "1,107 sq ft", "Single level"], hoa: "$300/mo", garage: "Carport + open", laundry: "Primary closet retrofit", stairs: "None",
    photo: "/photos/1001-n-granite-reef.jpg", listing: "https://www.zillow.com/homedetails/1001-N-Granite-Reef-Rd-Scottsdale-AZ-85257/7577586_zpid/",
    directions: "https://www.google.com/maps/dir/?api=1&destination=1001%20N%20Granite%20Reef%20Rd%2C%20Scottsdale%2C%20AZ%2085257",
    fit: "Single-level 3/2, the lowest HOA and fresh electrical/laundry upgrades.",
    friction: "No garage; corner exposure near Granite Reef/Roosevelt; laundry was inserted into the primary closet.",
    quickRead: "Useful comparator for 1041. The decision turns on road exposure, the laundry retrofit and why the HOA is lower.",
    questions: [
      { ask: "Was the primary-closet laundry permitted, vented outside and protected by a drain pan/shutoff?", why: "Heat, vibration and leaks inside a bedroom closet are materially different from a hall laundry." },
      { ask: "Can we pause during rush-hour traffic to judge Granite Reef/Roosevelt noise and headlights?", why: "Corner exposure cannot be fixed later and may affect sleep and resale." },
      { ask: "Why is this HOA $300 versus $345 nearby—what coverage or reserve difference explains it?", why: "Lower dues help only if they are not deferring maintenance." },
      { ask: "What remodel/electrical work was permitted, and is the panel upgrade documented?", why: "Receipts and permits turn an improvement claim into usable value." },
      { ask: "How are carport, guest spaces and exterior storage assigned?", why: "Parking security and daily convenience are key substitutes for a garage." },
    ],
    inspect: ["Listen from bedrooms and patio for road noise", "Check closet heat, dryer vent, clearances and storage lost", "Verify electrical panel label/date and HVAC draw", "Look for headlights into living/bedroom windows"],
    neighborhood: ["Corner exposure is the biggest location variable", "Check left turns and driveway access at traffic volume", "Compare walkability/shade to 1041", "Note late-day road noise in a voice memo"],
    confidence: "possible",
  },
];

const fieldChecklist = [
  "HVAC: compare upstairs/downstairs temperature and airflow",
  "Garage/carport: ownership, depth, outlet, storage and security",
  "Laundry: hookups, fit, vent, pan, shutoff and permits",
  "Dog fit: written pet rules, shade, gate gaps and hot surfaces",
  "Noise/privacy: pause with HVAC off; check windows and sightlines",
  "Water: run taps, flush, check pressure, cabinets and ceilings",
  "HOA: reserves, assessments, minutes, insurance and litigation",
  "Before leaving: 30-second voice note—best, concern, price feeling",
];

const comparison = [
  ["8524 Belleview", "$319k", "$382", "Garage", "Full-size", "2 levels"],
  ["1204 N 85th", "$319k", "$348", "Garage", "Inside*", "2 levels"],
  ["1041 Granite", "$314.9k", "$345", "Carport", "Hall retrofit", "None"],
  ["1001 Granite", "$325k", "$300", "Carport", "Closet retrofit", "None"],
];

function ThemeButton() {
  const [dark, setDark] = useState(false);
  useEffect(() => queueMicrotask(() => setDark(document.documentElement.classList.contains("dark"))), []);
  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("pvb-theme", next ? "dark" : "light");
    setDark(next);
  }
  return <Button variant="outline" size="icon" onClick={toggle} aria-label="Toggle light or dark mode">{dark ? <Sun className="size-5" /> : <Moon className="size-5" />}</Button>;
}

function ModeToggle({ mode, setMode }: { mode: "focus" | "all"; setMode: (mode: "focus" | "all") => void }) {
  return <div className="grid grid-cols-2 rounded-xl bg-muted p-1" aria-label="Viewing mode">
    <button className={cn("min-h-10 rounded-lg px-3 text-sm font-semibold", mode === "focus" && "bg-background shadow-sm")} onClick={() => setMode("focus")}><House className="mr-1.5 inline size-4" />Single</button>
    <button className={cn("min-h-10 rounded-lg px-3 text-sm font-semibold", mode === "all" && "bg-background shadow-sm")} onClick={() => setMode("all")}><List className="mr-1.5 inline size-4" />Scroll</button>
  </div>;
}

function PropertyCard({ property, compact = false }: { property: Property; compact?: boolean }) {
  return <article id={property.id} className="scroll-mt-24"><Card className="overflow-hidden">
    <div className={cn("relative overflow-hidden bg-muted", compact ? "aspect-[16/9]" : "aspect-[4/3]")}>
      <Image src={property.photo} alt={`Listing exterior for ${property.address}`} fill priority={property.order === 1} sizes="(max-width: 720px) 100vw, 680px" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/10" />
      <div className="absolute left-3 top-3 flex gap-2"><Badge variant={property.confidence === "planned" ? "success" : "warning"}>{property.confidence === "planned" ? `Stop ${property.order}` : "Possible add-on"}</Badge><Badge className="bg-black/55 text-white">Active*</Badge></div>
      <div className="absolute inset-x-0 bottom-0 p-4 text-white"><p className="text-xs font-bold uppercase tracking-[.13em] text-white/70">{property.timing}</p><h2 className="mt-1 text-[1.45rem] font-bold leading-tight tracking-tight">{property.short}</h2><p className="mt-1 text-sm text-white/75">Scottsdale · {property.price}</p></div>
    </div>
    <CardContent className="space-y-4 pt-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-muted/70 p-3"><p className="text-xs text-muted-foreground">Parking</p><p className="mt-1 text-[15px] font-bold leading-5">{property.garage}</p></div>
        <div className="rounded-xl bg-muted/70 p-3"><p className="text-xs text-muted-foreground">HOA</p><p className="mt-1 text-[15px] font-bold leading-5">{property.hoa}</p></div>
        <div className="rounded-xl bg-muted/70 p-3"><p className="text-xs text-muted-foreground">Laundry</p><p className="mt-1 text-[15px] font-bold leading-5">{property.laundry}</p></div>
        <div className="rounded-xl bg-muted/70 p-3"><p className="text-xs text-muted-foreground">Stairs</p><p className="mt-1 text-[15px] font-bold leading-5">{property.stairs}</p></div>
      </div>
      <div className="flex flex-wrap gap-1.5">{property.facts.map((fact) => <Badge key={fact}>{fact}</Badge>)}</div>
      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[.07] p-3.5"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-blue-700 dark:text-blue-300"><Sparkles className="size-4" />60-second read</p><p className="mt-2 text-[15px] leading-6">{property.quickRead}</p></div>
      <div className="grid gap-2.5 text-[15px] leading-6"><p><strong className="text-emerald-700 dark:text-emerald-300">Why it fits:</strong> {property.fit}</p><p><strong className="text-amber-700 dark:text-amber-300">Friction:</strong> {property.friction}</p></div>
      <section><p className="text-xs font-bold uppercase tracking-[.13em] text-muted-foreground">Ask these first</p><div className="mt-2 space-y-2">
        {property.questions.slice(0, 3).map((question, index) => <div key={question.ask} className="rounded-2xl border border-border p-3.5"><div className="flex gap-2.5"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{index + 1}</span><p className="text-[15px] font-semibold leading-5">{question.ask}</p></div><p className="mt-2 pl-8 text-sm leading-5 text-muted-foreground">Why: {question.why}</p></div>)}
      </div></section>
      <details className="group rounded-2xl border border-border"><summary className="flex min-h-12 cursor-pointer items-center justify-between px-4 text-sm font-semibold">More questions + what to inspect<ChevronDown className="size-4 transition group-open:rotate-180" /></summary><div className="space-y-4 border-t border-border p-4">
        {property.questions.slice(3).map((question) => <div key={question.ask}><p className="text-[15px] font-semibold leading-5">{question.ask}</p><p className="mt-1 text-sm leading-5 text-muted-foreground">Why: {question.why}</p></div>)}
        <div><p className="text-xs font-bold uppercase tracking-[.12em] text-muted-foreground">Inspect on site</p><ul className="mt-2 space-y-2 text-[15px] leading-5">{property.inspect.map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}</ul></div>
      </div></details>
      <details className="group rounded-2xl border border-border"><summary className="flex min-h-12 cursor-pointer items-center justify-between px-4 text-sm font-semibold">Neighborhood quick check<ChevronDown className="size-4 transition group-open:rotate-180" /></summary><ul className="space-y-2 border-t border-border p-4 text-[15px] leading-5">{property.neighborhood.map((item) => <li key={item} className="flex gap-2"><MapPinned className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}</ul></details>
      <div className="grid grid-cols-2 gap-2"><Button asChild><a href={property.directions} target="_blank" rel="noreferrer"><MapPinned className="size-4" />Directions</a></Button><Button variant="outline" asChild><a href={property.listing} target="_blank" rel="noreferrer">Listing<ExternalLink className="size-4" /></a></Button></div>
      <p className="text-[11px] leading-4 text-muted-foreground">*Live data checked Aug 25. Verify price, status, bath count, access and HOA with Cathy.</p>
    </CardContent>
  </Card></article>;
}

export default function Home() {
  const [mode, setMode] = useState<"focus" | "all">("focus");
  const [active, setActive] = useState(0);
  const [section, setSection] = useState<"tour" | "compare" | "check">("tour");
  const [checked, setChecked] = useState<string[]>([]);
  useEffect(() => { const saved = localStorage.getItem("pvb-aug25-checklist"); if (saved) queueMicrotask(() => setChecked(JSON.parse(saved))); }, []);
  const progress = useMemo(() => Math.round((checked.length / fieldChecklist.length) * 100), [checked]);
  function toggleCheck(item: string) { setChecked((current) => { const next = current.includes(item) ? current.filter((value) => value !== item) : [...current, item]; localStorage.setItem("pvb-aug25-checklist", JSON.stringify(next)); return next; }); }
  function chooseProperty(index: number) { setActive(index); setMode("focus"); setSection("tour"); window.scrollTo({ top: 0, behavior: "smooth" }); }

  return <main className="min-h-screen pb-[calc(6.5rem+env(safe-area-inset-bottom))]">
    <header className="sticky top-0 z-40 border-b border-border bg-background/88 pt-[env(safe-area-inset-top)] backdrop-blur-xl"><div className="mx-auto flex max-w-2xl items-center gap-2 px-3 py-2">
      <Sheet><SheetTrigger asChild><Button variant="outline" size="icon" aria-label="Open tour navigation"><Menu className="size-5" /></Button></SheetTrigger><SheetContent>
        <div className="px-4 pb-4 pt-[calc(1.2rem+env(safe-area-inset-top))]"><SheetTitle className="text-xl font-bold">Today’s route</SheetTitle><SheetDescription className="mt-1 text-sm text-muted-foreground">Tuesday afternoon · exact start pending</SheetDescription></div>
        <div className="flex-1 overflow-y-auto px-3 pb-6"><div className="mb-3 rounded-2xl bg-amber-500/[.12] p-3 text-sm"><p className="font-bold">Cathy is coordinating access</p><p className="mt-1 text-xs text-muted-foreground">Belleview is likely appointment-dependent. Start there if confirmed.</p><Button asChild variant="heat" className="mt-3 w-full"><a href="tel:+16026152773"><Phone className="size-4" />Call Cathy · 602-615-2773</a></Button></div>
          <nav className="space-y-1" aria-label="Property stops">{properties.map((property, index) => <SheetClose asChild key={property.id}><button onClick={() => chooseProperty(index)} className={cn("flex min-h-16 w-full items-center gap-3 rounded-2xl p-3 text-left", active === index ? "bg-primary text-primary-foreground" : "hover:bg-muted")}><span className={cn("flex size-8 shrink-0 items-center justify-center rounded-xl text-sm font-bold", active === index ? "bg-white/18" : "bg-muted")}>{property.order}</span><span className="min-w-0"><span className="block truncate text-sm font-semibold">{property.short}</span><span className={cn("block truncate text-xs", active === index ? "text-white/70" : "text-muted-foreground")}>{property.timing}</span></span></button></SheetClose>)}</nav>
          <div className="mt-5 border-t border-border pt-4 text-xs leading-5 text-muted-foreground"><p><strong className="text-foreground">Heat:</strong> Extreme Heat Warning; 109–110°F this afternoon.</p><p className="mt-2"><strong className="text-foreground">Sunset:</strong> 7:02 PM · civil dusk 7:28 PM.</p></div>
        </div>
      </SheetContent></Sheet>
      <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">Scottsdale tour</p><p className="truncate text-xs text-muted-foreground">Tue, Aug 25 · afternoon</p></div><ThemeButton />
    </div></header>

    <div className="mx-auto max-w-2xl px-3">
      <section className="py-4"><div className="flex flex-wrap gap-2"><Badge variant="warning">Start time awaiting Cathy</Badge><Badge variant="blue">3 planned + 1 possible</Badge></div><h1 className="mt-3 text-[2rem] font-bold leading-[1.04] tracking-[-.04em]">Garage vs. single-level—decide it in the field.</h1><p className="mt-2 text-sm leading-5 text-muted-foreground">Fast briefing first. Property-specific questions and deeper checks are one tap away.</p></section>
      <Card className="mb-3 border-amber-500/35 bg-amber-500/[.09]"><CardContent className="pt-4 text-center"><p className="flex items-center justify-center gap-2 font-bold"><CalendarClock className="size-5 text-amber-700 dark:text-amber-300" />Tuesday afternoon · exact time not in email</p><p className="mx-auto mt-1 max-w-lg text-[15px] leading-5 text-muted-foreground">Cathy: 2 vacant, 1 appointment. Put Belleview first if that is the scheduled home.</p><div className="mx-auto mt-4 grid max-w-sm grid-cols-2 gap-2"><Button className="min-h-12 w-full rounded-2xl" variant="heat" asChild><a href="tel:+16026152773"><Phone className="size-4" />Call Cathy</a></Button><Button className="min-h-12 w-full rounded-2xl" variant="outline" asChild><a href="sms:+16026152773"><MessageCircle className="size-4" />Text Cathy</a></Button></div></CardContent></Card>
      <Card className="mb-4 bg-muted/65"><CardContent className="grid grid-cols-3 gap-2 p-2 text-center"><div className="rounded-2xl bg-background/75 px-2 py-3"><ThermometerSun className="mx-auto size-5 text-amber-600 dark:text-amber-400" /><p className="mt-1 text-base font-bold">109–110°</p><p className="text-[11px] text-muted-foreground">Extreme heat</p></div><div className="rounded-2xl bg-background/75 px-2 py-3"><Route className="mx-auto size-5 text-blue-600 dark:text-blue-400" /><p className="mt-1 text-base font-bold">Tight cluster</p><p className="text-[11px] text-muted-foreground">~2–4 min legs</p></div><div className="rounded-2xl bg-background/75 px-2 py-3"><Sun className="mx-auto size-5 text-amber-600 dark:text-amber-400" /><p className="mt-1 text-base font-bold">7:02 PM</p><p className="text-[11px] text-muted-foreground">Sunset</p></div></CardContent></Card>
      <div className="sticky top-[calc(4rem+env(safe-area-inset-top))] z-30 mb-4 rounded-2xl border border-border bg-background/92 p-1.5 shadow-lg shadow-black/5 backdrop-blur-xl"><div className="grid grid-cols-3 gap-1">{(["tour", "compare", "check"] as const).map((item) => <button key={item} onClick={() => setSection(item)} className={cn("flex min-h-11 items-center justify-center gap-2 rounded-xl px-2 text-sm font-semibold capitalize", section === item ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>{item === "tour" ? <House className="size-4" /> : item === "compare" ? <CarFront className="size-4" /> : <ClipboardCheck className="size-4" />}{item === "check" ? "Check" : item}</button>)}</div></div>

      {section === "tour" && <div><ModeToggle mode={mode} setMode={setMode} />{mode === "focus" ? <div className="mt-3"><div className="mb-3 flex items-center justify-between gap-2"><Button variant="outline" size="icon" onClick={() => setActive((active - 1 + properties.length) % properties.length)} aria-label="Previous property"><ArrowLeft className="size-5" /></Button><div className="flex gap-1.5">{properties.map((property, index) => <button key={property.id} onClick={() => setActive(index)} aria-label={`Go to ${property.short}`} className={cn("h-2.5 rounded-full transition-all", index === active ? "w-7 bg-primary" : "w-2.5 bg-border")} />)}</div><Button variant="outline" size="icon" onClick={() => setActive((active + 1) % properties.length)} aria-label="Next property"><ArrowRight className="size-5" /></Button></div><PropertyCard property={properties[active]} /></div> : <div className="mt-3 space-y-4">{properties.map((property) => <PropertyCard key={property.id} property={property} compact />)}</div>}</div>}

      {section === "compare" && <div className="space-y-3"><Card><CardHeader><p className="text-xs font-bold uppercase tracking-[.13em] text-muted-foreground">Decision lens</p><h2 className="mt-1 text-xl font-bold">What each option is buying you</h2></CardHeader><CardContent className="space-y-2 text-[15px] leading-6"><div className="rounded-2xl bg-blue-500/[.08] p-3.5"><strong>Garage pair:</strong> Belleview and 1204 trade stairs + higher HOA for secure parking and simpler laundry.</div><div className="rounded-2xl bg-emerald-500/[.08] p-3.5"><strong>Single-level pair:</strong> 1041 and 1001 trade the garage for 3 bedrooms, 2 baths and no stairs.</div><div className="rounded-2xl bg-amber-500/[.08] p-3.5"><strong>Best separator:</strong> Ask whether you would pay roughly $20–80 more monthly HOA for the garage, then test the stairs in 110°F heat.</div></CardContent></Card>
        <Card className="overflow-hidden"><div className="overflow-x-auto"><table className="w-full min-w-[560px] text-left text-xs"><thead className="bg-muted"><tr>{["Home", "Price", "HOA", "Parking", "Laundry", "Stairs"].map((head) => <th key={head} className="px-3 py-3 font-bold">{head}</th>)}</tr></thead><tbody>{comparison.map((row) => <tr key={row[0]} className="border-t border-border">{row.map((cell, index) => <td key={cell} className={cn("px-3 py-3", index === 0 && "font-semibold")}>{cell}</td>)}</tr>)}</tbody></table></div><p className="p-3 text-[11px] text-muted-foreground">*Confirm laundry location and 1.5 vs 2 bath discrepancies with the agent.</p></Card>
        <Card><CardHeader><p className="text-xs font-bold uppercase tracking-[.13em] text-muted-foreground">Before an offer</p><h2 className="mt-1 text-xl font-bold">The condo packet matters as much as the kitchen</h2></CardHeader><CardContent className="space-y-3 text-sm text-muted-foreground"><p><strong className="text-foreground">Monthly fit:</strong> Ask the lender for a property-specific payment including HOA, tax, insurance and reserves; keep it inside the $2,500 all-in ceiling.</p><p><strong className="text-foreground">Warrantability:</strong> Verify master insurance, reserves, owner occupancy, rental mix, litigation and special assessments.</p><p><strong className="text-foreground">Negotiation:</strong> 1204’s long market time and 1041’s below-prior-sale ask are reasons to ask for the story before discussing price.</p></CardContent></Card></div>}

      {section === "check" && <div className="space-y-3"><Card><CardHeader><div className="flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.13em] text-muted-foreground">Use at every stop</p><h2 className="mt-1 text-xl font-bold">Field checklist</h2></div><span className="text-sm font-bold">{checked.length}/{fieldChecklist.length}</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div></CardHeader><CardContent className="space-y-2">{fieldChecklist.map((item) => { const done = checked.includes(item); return <button key={item} onClick={() => toggleCheck(item)} className={cn("flex min-h-14 w-full items-start gap-3 rounded-2xl border p-3.5 text-left text-[15px] leading-5", done ? "border-emerald-500/25 bg-emerald-500/[.08] text-muted-foreground" : "border-border")}><span className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border", done && "border-emerald-600 bg-emerald-600 text-white")}>{done && <Check className="size-3" />}</span><span className={cn(done && "line-through")}>{item}</span></button>; })}</CardContent></Card>
        <Card className="border-amber-500/25"><CardContent className="pt-4"><p className="flex items-center gap-2 font-bold"><Flame className="size-5 text-amber-600" />Hot-weather reminder</p><p className="mt-2 text-sm leading-5 text-muted-foreground">Pre-cool the car, carry water, minimize curb time, and use the heat to pressure-test HVAC, west-facing glass, patio shade, turf and garage temperature.</p></CardContent></Card>
        <Card><CardContent className="space-y-3 pt-4 text-sm"><p className="flex items-center gap-2 font-bold"><ShieldAlert className="size-5 text-primary" />Three non-negotiables</p><p>1. Written confirmation the 35 lb dog is allowed.</p><p>2. No unresolved HOA/insurance/warrantability problem.</p><p>3. Property-specific payment stays inside the all-in ceiling.</p></CardContent></Card></div>}

      <footer className="mt-6 space-y-3 border-t border-border py-5 text-xs leading-5 text-muted-foreground"><p><strong className="text-foreground">Sources:</strong> Kathy O’Malley’s “a few more to see” email (Aug 24), the current Drive purchase memory, current Zillow/broker listing details, and Scottsdale weather. Email controls the intended tour list; Cathy controls final access and timing.</p><div className="flex flex-wrap gap-x-4 gap-y-2"><a className="underline underline-offset-4" href="https://mail.google.com/mail/u/0/#inbox/1a0359162cc1221f" target="_blank" rel="noreferrer">Source email</a><a className="underline underline-offset-4" href="https://drive.google.com/file/d/1CqKFvoZZZKArfBg8pcX8Rt05rnYSEoy9/view?usp=drivesdk" target="_blank" rel="noreferrer">Purchase context</a></div></footer>
    </div>

    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl" aria-label="Primary"><div className="mx-auto grid max-w-2xl grid-cols-3 px-3 py-1.5"><button onClick={() => setSection("tour")} className={cn("flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold", section === "tour" ? "text-primary" : "text-muted-foreground")}><House className="size-5" />Tour</button><button onClick={() => setSection("compare")} className={cn("flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold", section === "compare" ? "text-primary" : "text-muted-foreground")}><CarFront className="size-5" />Compare</button><button onClick={() => setSection("check")} className={cn("flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold", section === "check" ? "text-primary" : "text-muted-foreground")}><ClipboardCheck className="size-5" />Checklist</button></div></nav>
  </main>;
}
