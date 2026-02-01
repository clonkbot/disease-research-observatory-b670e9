import { useState, useEffect } from 'react'

interface Disease {
  id: number
  name: string
  category: string
  affectedGlobal: number
  annualDeaths: number
  mortalityRate: number
  researchFunding: string
  researchDirections: string[]
  keyDataPoints: string[]
  treatments: string[]
  severity: 'critical' | 'high' | 'moderate' | 'low'
  trend: 'rising' | 'stable' | 'declining'
}

const diseaseData: Disease[] = [
  {
    id: 1,
    name: "Cardiovascular Diseases",
    category: "Non-communicable",
    affectedGlobal: 523000000,
    annualDeaths: 17900000,
    mortalityRate: 3.42,
    researchFunding: "$5.2B",
    researchDirections: ["Gene therapy for atherosclerosis", "AI-driven early detection", "Regenerative cardiac tissue", "Personalized statin alternatives", "Microbiome interventions"],
    keyDataPoints: ["#1 cause of death globally", "32% of all deaths", "75% occur in low/middle income countries", "80% preventable with lifestyle changes"],
    treatments: ["Statins", "ACE inhibitors", "Beta-blockers", "Angioplasty", "CABG surgery"],
    severity: 'critical',
    trend: 'rising'
  },
  {
    id: 2,
    name: "Cancer (All Types)",
    category: "Non-communicable",
    affectedGlobal: 19300000,
    annualDeaths: 10000000,
    mortalityRate: 51.81,
    researchFunding: "$7.8B",
    researchDirections: ["CAR-T cell therapy expansion", "mRNA cancer vaccines", "Liquid biopsy screening", "Targeted immunotherapy", "Epigenetic reprogramming"],
    keyDataPoints: ["1 in 5 people develop cancer", "Most common: lung, breast, colorectal", "70% of deaths in low-income countries", "30-50% preventable"],
    treatments: ["Chemotherapy", "Radiation", "Immunotherapy", "Surgery", "Targeted therapy"],
    severity: 'critical',
    trend: 'rising'
  },
  {
    id: 3,
    name: "Diabetes Mellitus",
    category: "Metabolic",
    affectedGlobal: 537000000,
    annualDeaths: 6700000,
    mortalityRate: 1.25,
    researchFunding: "$3.1B",
    researchDirections: ["Artificial pancreas systems", "Beta cell regeneration", "GLP-1 agonist optimization", "Stem cell insulin production", "Glucose-responsive insulin"],
    keyDataPoints: ["10.5% of adults affected", "Type 2 is 90-95% of cases", "$966B annual healthcare cost", "50% undiagnosed"],
    treatments: ["Insulin", "Metformin", "GLP-1 agonists", "SGLT2 inhibitors", "Lifestyle intervention"],
    severity: 'critical',
    trend: 'rising'
  },
  {
    id: 4,
    name: "Chronic Respiratory Diseases",
    category: "Non-communicable",
    affectedGlobal: 454000000,
    annualDeaths: 4100000,
    mortalityRate: 0.90,
    researchFunding: "$1.2B",
    researchDirections: ["Bronchial thermoplasty advances", "Anti-IL biologics", "Lung regeneration therapy", "Environmental intervention", "Precision inhaler systems"],
    keyDataPoints: ["COPD is 3rd leading cause of death", "90% deaths in low/middle income", "Tobacco smoke primary cause", "Air pollution major factor"],
    treatments: ["Bronchodilators", "Corticosteroids", "Oxygen therapy", "Pulmonary rehab", "Biologics"],
    severity: 'high',
    trend: 'stable'
  },
  {
    id: 5,
    name: "Mental Health Disorders",
    category: "Neurological",
    affectedGlobal: 970000000,
    annualDeaths: 800000,
    mortalityRate: 0.08,
    researchFunding: "$2.4B",
    researchDirections: ["Psychedelic-assisted therapy", "Digital therapeutics", "Ketamine derivatives", "Neuroplasticity enhancement", "Gut-brain axis interventions"],
    keyDataPoints: ["1 in 8 people affected", "Depression leading cause of disability", "<25% receive treatment", "$1T annual productivity loss"],
    treatments: ["SSRIs/SNRIs", "Psychotherapy", "TMS", "ECT", "Ketamine infusions"],
    severity: 'high',
    trend: 'rising'
  },
  {
    id: 6,
    name: "HIV/AIDS",
    category: "Infectious",
    affectedGlobal: 39000000,
    annualDeaths: 630000,
    mortalityRate: 1.62,
    researchFunding: "$4.2B",
    researchDirections: ["Functional cure research", "Long-acting injectables", "Broadly neutralizing antibodies", "Gene editing (CCR5)", "Therapeutic vaccines"],
    keyDataPoints: ["76% know their status", "71% on antiretroviral therapy", "66% virally suppressed", "54% in sub-Saharan Africa"],
    treatments: ["ART combination therapy", "PrEP", "PEP", "Entry inhibitors", "Integrase inhibitors"],
    severity: 'high',
    trend: 'declining'
  },
  {
    id: 7,
    name: "Tuberculosis",
    category: "Infectious",
    affectedGlobal: 10600000,
    annualDeaths: 1300000,
    mortalityRate: 12.26,
    researchFunding: "$1.0B",
    researchDirections: ["Shorter treatment regimens", "Pan-TB drug development", "Host-directed therapies", "Novel vaccine candidates", "Drug-resistant TB solutions"],
    keyDataPoints: ["#2 infectious disease killer", "MDR-TB in 3.3% new cases", "85% curable with treatment", "30% of world infected (latent)"],
    treatments: ["RIPE regimen", "Bedaquiline", "Linezolid", "BCG vaccine", "Directly observed therapy"],
    severity: 'high',
    trend: 'stable'
  },
  {
    id: 8,
    name: "Alzheimer's & Dementia",
    category: "Neurological",
    affectedGlobal: 55000000,
    annualDeaths: 1800000,
    mortalityRate: 3.27,
    researchFunding: "$3.5B",
    researchDirections: ["Amyloid-targeting antibodies", "Tau protein interventions", "Neuroinflammation modulation", "Early biomarker detection", "Lifestyle prevention trials"],
    keyDataPoints: ["60-70% of dementia cases", "Doubles every 20 years", "2/3 are women", "$1.3T global cost by 2030"],
    treatments: ["Cholinesterase inhibitors", "Memantine", "Lecanemab", "Aducanumab", "Cognitive therapy"],
    severity: 'high',
    trend: 'rising'
  },
  {
    id: 9,
    name: "Malaria",
    category: "Infectious",
    affectedGlobal: 249000000,
    annualDeaths: 608000,
    mortalityRate: 0.24,
    researchFunding: "$892M",
    researchDirections: ["RTS,S vaccine rollout", "Gene drive mosquitoes", "Monoclonal antibodies", "Endectocides", "Triple ACT combinations"],
    keyDataPoints: ["95% of cases in Africa", "80% deaths in children <5", "Resistance emerging to artemisinin", "$12B annual economic burden"],
    treatments: ["Artemisinin combinations", "Primaquine", "Bed nets", "Indoor spraying", "Prophylaxis"],
    severity: 'moderate',
    trend: 'stable'
  },
  {
    id: 10,
    name: "Kidney Diseases",
    category: "Non-communicable",
    affectedGlobal: 850000000,
    annualDeaths: 1200000,
    mortalityRate: 0.14,
    researchFunding: "$780M",
    researchDirections: ["Bioartificial kidneys", "Xenotransplantation", "SGLT2 inhibitors expansion", "3D-printed organs", "Stem cell regeneration"],
    keyDataPoints: ["10% of population affected", "Often asymptomatic until late", "Diabetes #1 cause", "Dialysis costs $89K/year"],
    treatments: ["Dialysis", "Transplantation", "ACE inhibitors", "SGLT2 inhibitors", "Dietary management"],
    severity: 'moderate',
    trend: 'rising'
  },
  {
    id: 11,
    name: "Hepatitis B & C",
    category: "Infectious",
    affectedGlobal: 354000000,
    annualDeaths: 1100000,
    mortalityRate: 0.31,
    researchFunding: "$620M",
    researchDirections: ["Functional cure for HBV", "Pan-genotypic DAAs", "Therapeutic vaccines", "siRNA knockdown", "Capsid assembly modulators"],
    keyDataPoints: ["Hep C 95% curable", "Hep B vaccine 98% effective", "80% undiagnosed", "Leading cause of liver cancer"],
    treatments: ["DAAs for HCV", "Entecavir", "Tenofovir", "Interferon", "Liver transplant"],
    severity: 'moderate',
    trend: 'declining'
  },
  {
    id: 12,
    name: "Parkinson's Disease",
    category: "Neurological",
    affectedGlobal: 8500000,
    annualDeaths: 329000,
    mortalityRate: 3.87,
    researchFunding: "$450M",
    researchDirections: ["Alpha-synuclein targeting", "Gene therapy (GBA, LRRK2)", "Deep brain stimulation advances", "Neuroprotective compounds", "Stem cell dopamine neurons"],
    keyDataPoints: ["Fastest growing neurological", "Mean onset age 60", "Men 1.5x more likely", "Non-motor symptoms common"],
    treatments: ["Levodopa", "Dopamine agonists", "MAO-B inhibitors", "Deep brain stimulation", "Physical therapy"],
    severity: 'moderate',
    trend: 'rising'
  }
]

function formatNumber(num: number): string {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B'
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

function App() {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null)
  const [sortBy, setSortBy] = useState<'affected' | 'deaths' | 'mortality'>('affected')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const categories = ['all', ...Array.from(new Set(diseaseData.map(d => d.category)))]

  const sortedAndFilteredDiseases = diseaseData
    .filter(d => filterCategory === 'all' || d.category === filterCategory)
    .filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'affected') return b.affectedGlobal - a.affectedGlobal
      if (sortBy === 'deaths') return b.annualDeaths - a.annualDeaths
      return b.mortalityRate - a.mortalityRate
    })

  const totalAffected = diseaseData.reduce((sum, d) => sum + d.affectedGlobal, 0)
  const totalDeaths = diseaseData.reduce((sum, d) => sum + d.annualDeaths, 0)

  return (
    <div className="min-h-screen bg-void text-white font-sans relative overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      <div className="fixed inset-0 grid-pattern pointer-events-none opacity-50" />
      
      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="scan-line w-full h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-cyan/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 ${mounted ? 'fade-in-up' : 'opacity-0'}`}>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan/20 to-emerald/20 flex items-center justify-center border border-cyan/30 glow-cyan">
                  <svg className="w-8 h-8 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald rounded-full animate-pulse-glow" />
              </div>
              <div>
                <h1 className="font-serif text-3xl lg:text-4xl text-white glow-text">Disease Research Observatory</h1>
                <p className="text-cyan/60 text-sm mt-1 tracking-wide">GLOBAL HEALTH RESEARCH PRIORITIZATION SYSTEM</p>
              </div>
            </div>
            
            {/* Global Stats */}
            <div className="flex gap-6 lg:gap-10">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-serif text-cyan glow-text">{formatNumber(totalAffected)}</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">Total Affected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-serif text-amber glow-text">{formatNumber(totalDeaths)}</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">Annual Deaths</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-serif text-emerald glow-text">{diseaseData.length}</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">Tracked</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-8 ${mounted ? 'fade-in-up stagger-1' : 'opacity-0'}`}>
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search diseases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-cyan/20 rounded-lg px-4 py-3 pl-12 text-white placeholder-white/30 focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30 transition-all"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'affected' | 'deaths' | 'mortality')}
            className="bg-surface border border-cyan/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan/50 cursor-pointer appearance-none bg-no-repeat bg-right pr-10"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2322d3ee'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundSize: '1.5rem', backgroundPosition: 'right 0.5rem center' }}
          >
            <option value="affected">Sort: People Affected</option>
            <option value="deaths">Sort: Annual Deaths</option>
            <option value="mortality">Sort: Mortality Rate</option>
          </select>

          {/* Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-surface border border-cyan/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan/50 cursor-pointer appearance-none bg-no-repeat bg-right pr-10"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2322d3ee'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundSize: '1.5rem', backgroundPosition: 'right 0.5rem center' }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>

        {/* Disease Grid */}
        <div className="grid gap-4">
          {sortedAndFilteredDiseases.map((disease, index) => (
            <div
              key={disease.id}
              onClick={() => setSelectedDisease(selectedDisease?.id === disease.id ? null : disease)}
              className={`bg-surface/80 backdrop-blur border-l-4 border border-cyan/10 rounded-lg p-5 cursor-pointer card-hover ${mounted ? 'fade-in-up' : 'opacity-0'} severity-${disease.severity}`}
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Rank & Name */}
                <div className="flex items-center gap-4 lg:w-1/3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-surface-light flex items-center justify-center border border-cyan/10">
                    <span className="text-xl font-serif text-cyan/80">#{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-white">{disease.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-cyan/10 text-cyan/70">{disease.category}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        disease.trend === 'rising' ? 'bg-rose/10 text-rose' :
                        disease.trend === 'declining' ? 'bg-emerald/10 text-emerald' :
                        'bg-amber/10 text-amber'
                      }`}>
                        {disease.trend === 'rising' ? '↑' : disease.trend === 'declining' ? '↓' : '→'} {disease.trend}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 lg:gap-8 lg:flex-1">
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Affected</div>
                    <div className="text-lg font-medium text-cyan">{formatNumber(disease.affectedGlobal)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Deaths/Year</div>
                    <div className="text-lg font-medium text-amber">{formatNumber(disease.annualDeaths)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Mortality</div>
                    <div className="text-lg font-medium text-rose">{disease.mortalityRate.toFixed(2)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Research Funding</div>
                    <div className="text-lg font-medium text-emerald">{disease.researchFunding}</div>
                  </div>
                </div>

                {/* Expand indicator */}
                <div className="lg:flex-shrink-0">
                  <svg className={`w-6 h-6 text-cyan/50 transition-transform ${selectedDisease?.id === disease.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedDisease?.id === disease.id && (
                <div className="mt-6 pt-6 border-t border-cyan/10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Research Directions */}
                  <div>
                    <h4 className="font-serif text-lg text-cyan mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Research Directions
                    </h4>
                    <ul className="space-y-2">
                      {disease.researchDirections.map((dir, i) => (
                        <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                          <span className="text-cyan/50 mt-1">›</span>
                          {dir}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Data Points */}
                  <div>
                    <h4 className="font-serif text-lg text-amber mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Key Data Points
                    </h4>
                    <ul className="space-y-2">
                      {disease.keyDataPoints.map((point, i) => (
                        <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                          <span className="text-amber/50 mt-1">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Current Treatments */}
                  <div>
                    <h4 className="font-serif text-lg text-emerald mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      Current Treatments
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {disease.treatments.map((treatment, i) => (
                        <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-emerald/10 text-emerald/80 border border-emerald/20">
                          {treatment}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Severity Assessment */}
                  <div>
                    <h4 className="font-serif text-lg text-rose mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Severity Assessment
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/50">Global Burden</span>
                          <span className="text-white/70">{Math.min(100, (disease.affectedGlobal / 1000000000 * 100)).toFixed(0)}%</span>
                        </div>
                        <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-cyan to-cyan/50 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min(100, (disease.affectedGlobal / 1000000000 * 100))}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/50">Lethality Index</span>
                          <span className="text-white/70">{Math.min(100, disease.mortalityRate * 2).toFixed(0)}%</span>
                        </div>
                        <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-rose to-rose/50 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min(100, disease.mortalityRate * 2)}%` }}
                          />
                        </div>
                      </div>
                      <div className="pt-2">
                        <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full ${
                          disease.severity === 'critical' ? 'bg-rose/20 text-rose' :
                          disease.severity === 'high' ? 'bg-amber/20 text-amber' :
                          disease.severity === 'moderate' ? 'bg-cyan/20 text-cyan' :
                          'bg-emerald/20 text-emerald'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            disease.severity === 'critical' ? 'bg-rose animate-pulse' :
                            disease.severity === 'high' ? 'bg-amber animate-pulse' :
                            disease.severity === 'moderate' ? 'bg-cyan' :
                            'bg-emerald'
                          }`} />
                          {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedAndFilteredDiseases.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-surface flex items-center justify-center border border-cyan/20">
              <svg className="w-10 h-10 text-cyan/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-white/60">No diseases found</h3>
            <p className="text-white/40 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Mission Statement */}
        <div className={`mt-12 p-8 bg-gradient-to-br from-surface to-surface-light rounded-2xl border border-cyan/10 glow-cyan ${mounted ? 'fade-in-up stagger-5' : 'opacity-0'}`}>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-2/3">
              <h2 className="font-serif text-2xl lg:text-3xl text-white mb-4">
                Systematic Research for Global Health Impact
              </h2>
              <p className="text-white/60 leading-relaxed">
                This observatory ranks diseases by their global burden—prioritizing research where it can save the most lives. 
                By examining every data point, research direction, and treatment option, we aim to accelerate breakthroughs 
                for the conditions that affect humanity most. Start at the top, work your way down, and help us solve 
                the unsolvable.
              </p>
            </div>
            <div className="lg:w-1/3 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-cyan/30 flex items-center justify-center animate-float">
                  <div className="w-24 h-24 rounded-full border-2 border-cyan/50 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan/30 to-emerald/30 flex items-center justify-center">
                      <svg className="w-8 h-8 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald rounded-full animate-pulse flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-16 border-t border-cyan/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-white/30 text-xs tracking-wide">
            Requested by <span className="text-white/50">@T1000_V2</span> · Built by <span className="text-white/50">@clonkbot</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App