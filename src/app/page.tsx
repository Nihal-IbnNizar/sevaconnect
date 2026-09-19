'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  PORTAL_DATABASE,
  UTILITY_TOOLS,
  CATEGORIES_DATA,
  ServicePortalItem,
  UtilityItem,
  ServiceCategory,
} from '@/lib/services';

export default function SevaConnectPage() {
  // Language State: 'en' | 'ml' (Default: 'en')
  const [lang, setLang] = useState<'en' | 'ml'>('en');

  // Theme State: 'dark' | 'light' (Default: 'dark')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSource, setActiveSource] = useState<'all' | 'state' | 'central' | 'pinned'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [pinnedIds, setPinnedIds] = useState<string[]>([
    'edistrict',
    'psc-thulasi',
    'relis-erekha',
    'uidai-aadhaar',
    'nsp-scholarships'
  ]);

  // Tools Section: Show All vs Top 4
  const [showAllTools, setShowAllTools] = useState(false);

  // Modal Detail State
  const [activeDrawerItem, setActiveDrawerItem] = useState<ServicePortalItem | null>(null);

  // Toast Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<string>('check_circle');

  // Scroll to Top State
  const [showBackToTop, setShowBackToTop] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize Language, Theme and Pinned Favorites on mount
  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem('sevaconnect_theme') as 'dark' | 'light' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    applyThemeClass(initialTheme);

    const savedLang = localStorage.getItem('sevaconnect_lang') as 'en' | 'ml' | null;
    if (savedLang) {
      setLang(savedLang);
    }

    try {
      const savedPinned = localStorage.getItem('sevaconnect_pinned');
      if (savedPinned) {
        setPinnedIds(JSON.parse(savedPinned));
      }
    } catch {
      // ignore JSON errors
    }

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to apply dark/light classes to <html>
  const applyThemeClass = (t: 'dark' | 'light') => {
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  // Language Switcher
  const toggleLanguage = (selectedLang: 'en' | 'ml') => {
    setLang(selectedLang);
    localStorage.setItem('sevaconnect_lang', selectedLang);
    triggerToast(
      selectedLang === 'ml' ? 'ഭാഷ മലയാളത്തിലേക്ക് മാറ്റി' : 'Language switched to English',
      'translate'
    );
  };

  // Theme Switcher
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('sevaconnect_theme', nextTheme);
    applyThemeClass(nextTheme);
    triggerToast(
      nextTheme === 'dark'
        ? lang === 'ml'
          ? 'ഡാർക്ക് മോഡ് സജീവമാക്കി 🌙'
          : 'Dark Mode Enabled 🌙'
        : lang === 'ml'
        ? 'ലൈറ്റ് മോഡ് സജീവമാക്കി ☀️'
        : 'Light Mode Enabled ☀️',
      nextTheme === 'dark' ? 'dark_mode' : 'light_mode'
    );
  };

  // Toast Helper
  const triggerToast = (msg: string, icon: string = 'check_circle') => {
    setToastIcon(icon);
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  // Copy URL to Clipboard
  const copyLink = (e: React.MouseEvent, item: ServicePortalItem) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.url).then(() => {
        triggerToast(
          lang === 'ml' ? `${item.titleMl} ലിങ്ക് കോപ്പി ചെയ്തു!` : `Copied ${item.title} link!`,
          'content_copy'
        );
      });
    } else {
      triggerToast(`Link: ${item.url}`, 'content_copy');
    }
  };

  // Pin Toggle
  const togglePin = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    let updated: string[];
    if (pinnedIds.includes(id)) {
      updated = pinnedIds.filter((item) => item !== id);
      triggerToast(
        lang === 'ml' ? 'പ്രിയപ്പെട്ടവയിൽ നിന്നും ഒഴിവാക്കി' : 'Removed from Pinned Favorites',
        'star_border'
      );
    } else {
      updated = [...pinnedIds, id];
      triggerToast(
        lang === 'ml' ? 'പ്രിയപ്പെട്ടവയിലേക്ക് ചേർത്തു ⭐' : 'Pinned to your Favorites ⭐',
        'star'
      );
    }
    setPinnedIds(updated);
    localStorage.setItem('sevaconnect_pinned', JSON.stringify(updated));
  };

  // Keyboard Shortcuts (⌘K, /, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

      if (e.key === 'Escape') {
        if (activeDrawerItem) {
          setActiveDrawerItem(null);
          return;
        }
        if (searchQuery) {
          setSearchQuery('');
        }
        if (isInput) {
          searchInputRef.current?.blur();
        }
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
        searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
        searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery, activeDrawerItem]);

  // Filter Portals in real-time
  const filteredPortals = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return PORTAL_DATABASE.filter((item) => {
      // Source filter
      if (activeSource === 'state' && item.source !== 'state') return false;
      if (activeSource === 'central' && item.source !== 'central') return false;
      if (activeSource === 'pinned' && !pinnedIds.includes(item.id)) return false;

      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;

      // Search query filter
      if (!query) return true;

      const titleEnMatch = item.title.toLowerCase().includes(query);
      const titleMlMatch = item.titleMl.toLowerCase().includes(query);
      const authEnMatch = item.authority.toLowerCase().includes(query);
      const authMlMatch = item.authorityMl.toLowerCase().includes(query);
      const descEnMatch = item.description.toLowerCase().includes(query);
      const descMlMatch = item.descriptionMl.toLowerCase().includes(query);
      const tagMatch = item.tags.some((t) => t.toLowerCase().includes(query));
      const srvMatch = item.services.some((s) => s.toLowerCase().includes(query));

      return (
        titleEnMatch ||
        titleMlMatch ||
        authEnMatch ||
        authMlMatch ||
        descEnMatch ||
        descMlMatch ||
        tagMatch ||
        srvMatch
      );
    });
  }, [searchQuery, activeSource, activeCategory, pinnedIds]);

  // Total Counts
  const totalCount = PORTAL_DATABASE.length;
  const stateCount = PORTAL_DATABASE.filter((p) => p.source === 'state').length;
  const centralCount = PORTAL_DATABASE.filter((p) => p.source === 'central').length;
  const pinnedCount = pinnedIds.length;

  // Search trigger helper
  const handleTagClick = (term: string) => {
    setSearchQuery(term);
    searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Reset Filters
  const resetFilters = () => {
    setActiveSource('all');
    setActiveCategory('all');
    setSearchQuery('');
  };

  // Quick Suggestion Chips (Bilingual)
  const quickSuggestions = [
    { en: 'Income Certificate', ml: 'വരുമാന സർട്ടിഫിക്കറ്റ്', query: 'income' },
    { en: 'National Scholarship (NSP)', ml: 'സ്കോളർഷിപ്പ് (NSP)', query: 'scholarship' },
    { en: 'Land Tax (reLIS)', ml: 'ഭൂനികുതി (കരം)', query: 'land tax' },
    { en: 'PSC Thulasi', ml: 'പി.എസ്.സി തുളസി', query: 'psc' },
    { en: 'Aadhaar (UIDAI)', ml: 'ആധാർ കാർഡ്', query: 'aadhaar' },
    { en: 'Driving License', ml: 'ഡ്രൈവിംഗ് ലൈസൻസ്', query: 'driving license' },
    { en: 'Pension Status', ml: 'പെൻഷൻ സ്റ്റാറ്റസ്', query: 'pension' },
    { en: 'K-Smart Tax', ml: 'കെ-സ്മാർട്ട് കെട്ടിട നികുതി', query: 'ksmart' },
  ];

  // Visible Tools (Top 4 vs All 8)
  const displayedTools = showAllTools ? UTILITY_TOOLS : UTILITY_TOOLS.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 transition-colors duration-200 antialiased selection:bg-emerald-500 selection:text-white">
      {/* ========================================================================= */}
      {/* FLOATING INTERACTION TOAST */}
      {/* ========================================================================= */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in-quick">
          <div className="bg-slate-900/95 dark:bg-slate-800/95 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/40 flex items-center gap-2.5 backdrop-blur-md">
            <span className="material-symbols-outlined text-emerald-400 text-[20px]">
              {toastIcon}
            </span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOP HEADER / APP BAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-3">
          {/* Brand Logo & Subtitle */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              resetFilters();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {lang === 'ml' ? 'സേവാ കണക്ട്' : 'SevaConnect'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/30">
                  {lang === 'ml' ? 'ഔദ്യോഗികം' : 'Official Portal Hub'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                {lang === 'ml'
                  ? 'കേരള & കേന്ദ്ര സർക്കാർ പബ്ലിക് സർവീസ് ഡയറക്ടറി'
                  : 'Kerala & Central Government Public Service Directory'}
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Live Verification Status */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {lang === 'ml'
                  ? 'ഔദ്യോഗിക സർക്കാർ ലിങ്കുകൾ സജീവം'
                  : 'Direct Govt Portals Active'}
              </span>
            </div>

            {/* Pinned Shortcut Pill */}
            {pinnedCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setActiveSource(activeSource === 'pinned' ? 'all' : 'pinned');
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                  activeSource === 'pinned'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                }`}
                title={lang === 'ml' ? 'പ്രിയപ്പെട്ടവ കാണുക' : 'View Pinned Portals'}
              >
                <span className="material-symbols-outlined text-[16px]" data-weight="fill">
                  star
                </span>
                <span className="hidden sm:inline">
                  {lang === 'ml' ? 'പ്രിയപ്പെട്ടവ' : 'Pinned'}
                </span>
                <span>({pinnedCount})</span>
              </button>
            )}

            {/* Language Switcher Button (English / മലയാളം) */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 p-0.5 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => toggleLanguage('en')}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  lang === 'en'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Switch to English"
              >
                ENG
              </button>
              <button
                type="button"
                onClick={() => toggleLanguage('ml')}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  lang === 'ml'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="മലയാളത്തിലേക്ക് മാറ്റുക"
              >
                മലയാളം
              </button>
            </div>

            {/* Dark / Light Mode Switcher (Active & Responsive) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-colors flex items-center gap-1.5 font-bold text-xs shadow-xs"
              title={
                mounted && theme === 'dark'
                  ? 'Switch to Light Mode (☀️)'
                  : 'Switch to Dark Mode (🌙)'
              }
              aria-label="Toggle dark and light theme"
            >
              {mounted && theme === 'dark' ? (
                <>
                  <span className="material-symbols-outlined text-[18px] text-amber-400">
                    light_mode
                  </span>
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px] text-indigo-600 dark:text-indigo-400">
                    dark_mode
                  </span>
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* HERO SECTION & GLOBAL SEARCH BAR */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-[#131d31] dark:via-[#0f172a] dark:to-[#0b0f19] border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 pt-9 pb-8 transition-colors">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          {/* Welcoming Headline */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {lang === 'ml'
                ? 'കേരള & കേന്ദ്ര സർക്കാർ സേവനങ്ങൾ ഇനി നിങ്ങളുടെ വിരൽത്തുമ്പിൽ'
                : 'Access Kerala & Central Public Services in Seconds'}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {lang === 'ml'
                ? 'ഇ-ഡിസ്ട്രിക്ട് സർട്ടിഫിക്കറ്റുകൾ, ദേശീയ സ്കോളർഷിപ്പ് (NSP), പി.എസ്.സി, ഭൂനികുതി, ആധാർ, ഡ്രൈവിംഗ് ലൈസൻസ്, പെൻഷൻ എന്നിവയ്ക്കുള്ള നേരിട്ടുള്ള ഔദ്യോഗിക ലിങ്കുകൾ.'
                : 'Direct, verified access to e-District certificates, National Scholarship Portal (NSP), Kerala PSC, Land Tax (reLIS), myAadhaar, and Welfare Pensions.'}
            </p>
          </div>

          {/* Global Search Bar (Large, High Contrast, Accessible) */}
          <div className="relative pt-2 max-w-3xl mx-auto">
            <div className="relative flex items-center group">
              <div className="absolute left-4 pointer-events-none text-slate-400 flex items-center">
                <span className="material-symbols-outlined text-[24px]">search</span>
              </div>

              <input
                ref={searchInputRef}
                id="global-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'ml'
                    ? 'സ്കോളർഷിപ്പ്, വരുമാന സർട്ടിഫിക്കറ്റ്, ഭൂനികുതി, ആധാർ, പി.എസ്.സി എന്നിവ തിരയുക...'
                    : 'Search scholarships, certificates, land tax, psc, aadhaar, driving license...'
                }
                className="w-full pl-13 pr-24 py-4 bg-white dark:bg-slate-900/90 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 text-base font-medium transition-all"
                aria-label="Search government services"
              />

              {/* Clear button or shortcut badge */}
              <div className="absolute right-3.5 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
                    title={lang === 'ml' ? 'തിരച്ചിൽ ക്ലിയർ ചെയ്യുക' : 'Clear search'}
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-1 rounded-md">
                    Ctrl+K
                  </kbd>
                )}
              </div>
            </div>

            {/* Quick Click Search Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-semibold mr-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-amber-500 text-[16px]">
                  bolt
                </span>
                {lang === 'ml' ? 'പ്രധാനപ്പെട്ടവ:' : 'Quick Find:'}
              </span>
              {quickSuggestions.map((item) => (
                <button
                  key={item.query}
                  type="button"
                  onClick={() => handleTagClick(item.query)}
                  className={`px-3 py-1.5 rounded-lg font-semibold border transition-all ${
                    searchQuery.toLowerCase() === item.query.toLowerCase()
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                      : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-white'
                  }`}
                >
                  {lang === 'ml' ? item.ml : item.en}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MAIN CONTAINER: CIVIC GOVERNMENT PORTALS MATRIX */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Source Segmented Tabs & Category Filter Rail */}
        <section className="bg-white dark:bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
          {/* Top Row: Authority Source Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
              <span className="material-symbols-outlined text-emerald-500 text-[20px]">
                filter_list
              </span>
              <span>{lang === 'ml' ? 'പോർട്ടലുകൾ തിരഞ്ഞെടുക്കുക:' : 'Select Portals:'}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveSource('all')}
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  activeSource === 'all'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md font-extrabold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {lang === 'ml' ? 'എല്ലാ പോർട്ടലുകളും' : 'All Portals'} ({totalCount})
              </button>

              <button
                type="button"
                onClick={() => setActiveSource('state')}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeSource === 'state'
                    ? 'bg-emerald-600 text-white shadow-md font-extrabold'
                    : 'bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-500/20'
                }`}
              >
                <span>🌴 {lang === 'ml' ? 'കേരള സർക്കാർ' : 'Kerala State'} ({stateCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSource('central')}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeSource === 'central'
                    ? 'bg-indigo-600 text-white shadow-md font-extrabold'
                    : 'bg-indigo-50 text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 hover:bg-indigo-100 dark:hover:bg-indigo-500/20'
                }`}
              >
                <span>🇮🇳 {lang === 'ml' ? 'കേന്ദ്ര സർക്കാർ' : 'Central Govt'} ({centralCount})</span>
              </button>

              {pinnedCount > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveSource('pinned')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeSource === 'pinned'
                      ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                      : 'bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 hover:bg-amber-100 dark:hover:bg-amber-500/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]" data-weight="fill">
                    star
                  </span>
                  <span>{lang === 'ml' ? 'പ്രിയപ്പെട്ടവ' : 'Pinned'} ({pinnedCount})</span>
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Category Pills Scrollable */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-slate-800 text-white dark:bg-slate-700 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {lang === 'ml' ? 'എല്ലാ വിഭാഗങ്ങളും' : 'All Categories'}
            </button>

            {CATEGORIES_DATA.map((cat) => {
              const isSelected = activeCategory === cat.key;
              const count = PORTAL_DATABASE.filter((p) => p.category === cat.key).length;

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                  <span>{lang === 'ml' ? cat.labelMl : cat.labelEn}</span>
                  <span className="text-[11px] opacity-75 font-bold">({count})</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Results Counter & Active Filter Reset Bar */}
        {(activeSource !== 'all' || activeCategory !== 'all' || searchQuery) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-emerald-50 dark:bg-slate-800/90 border border-emerald-200 dark:border-slate-700 px-4 py-3 rounded-2xl text-xs text-emerald-950 dark:text-slate-300 transition-colors">
            <div className="flex items-center gap-2 font-medium">
              <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[18px]">
                check_circle
              </span>
              <span>
                {lang === 'ml' ? 'കണ്ടെത്തിയ പോർട്ടലുകൾ:' : 'Showing'}{' '}
                <strong className="text-emerald-900 dark:text-white text-sm">
                  {filteredPortals.length}
                </strong>{' '}
                {lang === 'ml' ? 'എണ്ണം' : 'verified portals'}
                {searchQuery && (
                  <>
                    {' '}
                    ({lang === 'ml' ? 'തിരഞ്ഞ വാക്ക്:' : 'for query'} &quot;
                    <strong className="text-emerald-700 dark:text-emerald-400">{searchQuery}</strong>&quot;)
                  </>
                )}
              </span>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline underline-offset-2 self-start sm:self-auto"
            >
              {lang === 'ml' ? 'ഫിൽട്ടറുകൾ റീസെറ്റ് ചെയ്യുക' : 'Reset All Filters'}
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CARDS GRID: OFFICIAL GOVERNMENT SERVICE PORTALS */}
        {/* ========================================================================= */}
        {filteredPortals.length === 0 ? (
          /* Empty Search State */
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center space-y-4 max-w-lg mx-auto shadow-md transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">search_off</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {lang === 'ml'
                  ? `'${searchQuery}' എന്നതിന് ഫലങ്ങളൊന്നും ലഭ്യമല്ല`
                  : `No portals found for '${searchQuery}'`}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {lang === 'ml'
                  ? 'സ്കോളർഷിപ്പ്, വരുമാന സർട്ടിഫിക്കറ്റ്, ഭൂനികുതി, ആധാർ, പി.എസ്.സി, അല്ലെങ്കിൽ ഡ്രൈവിംഗ് ലൈസൻസ് എന്നിവ തിരഞ്ഞു നോക്കുക.'
                  : 'Try searching for generic terms like scholarship, income certificate, land tax, aadhaar, psc, or driving license.'}
              </p>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
            >
              {lang === 'ml' ? 'എല്ലാ പോർട്ടലുകളും കാണുക' : 'View All Portals'}
            </button>
          </div>
        ) : (
          /* Government Portals Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortals.map((item) => {
              const isPinned = pinnedIds.includes(item.id);
              const isKerala = item.source === 'state';

              return (
                <div
                  key={item.id}
                  className="group relative bg-white dark:bg-slate-900/90 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500/80 p-5 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl"
                >
                  {/* Card Header: Icon Logo + Authority Badge + Pin/Share Controls */}
                  <div className="space-y-3.5">
                    <div className="flex items-start justify-between gap-3">
                      {/* Department Logo & Title */}
                      <div className="flex items-start gap-3">
                        {/* Recognized Visual Icon Logo */}
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${item.iconBg}`}
                        >
                          <span className="material-symbols-outlined text-[24px]">
                            {item.iconName}
                          </span>
                        </div>

                        <div>
                          {/* Kerala or Central Badge */}
                          <div className="flex items-center gap-1.5 mb-1">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide ${
                                isKerala
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
                                  : 'bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30'
                              }`}
                            >
                              {isKerala
                                ? lang === 'ml'
                                  ? 'കേരള സർക്കാർ'
                                  : 'Kerala State'
                                : lang === 'ml'
                                ? 'കേന്ദ്ര സർക്കാർ'
                                : 'Central Govt'}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                            {lang === 'ml' ? item.titleMl : item.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
                            {lang === 'ml' ? item.authorityMl : item.authority}
                          </p>
                        </div>
                      </div>

                      {/* Pin & Copy Buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => togglePin(e, item.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isPinned
                              ? 'text-amber-500 bg-amber-400/10'
                              : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                          title={
                            isPinned
                              ? lang === 'ml'
                                ? 'ഒഴിവാക്കുക'
                                : 'Unpin'
                              : lang === 'ml'
                              ? 'പ്രിയപ്പെട്ടവയിലേക്ക് ചേർക്കുക'
                              : 'Pin favorite'
                          }
                        >
                          <span
                            className="material-symbols-outlined text-[18px]"
                            data-weight={isPinned ? 'fill' : undefined}
                          >
                            star
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => copyLink(e, item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title={lang === 'ml' ? 'ലിങ്ക് കോപ്പി ചെയ്യുക' : 'Copy link'}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            content_copy
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Plain Language Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {lang === 'ml' ? item.descriptionMl : item.description}
                    </p>

                    {/* Key Services Offered Preview */}
                    <div className="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-3 border border-slate-200 dark:border-slate-700/70 space-y-1.5 text-xs">
                      <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {lang === 'ml' ? 'പ്രധാന സേവനങ്ങൾ:' : 'Top Services:'}
                      </p>
                      <ul className="space-y-1 text-slate-700 dark:text-slate-200">
                        {(lang === 'ml' ? item.servicesMl : item.services)
                          .slice(0, 2)
                          .map((srv, idx) => (
                            <li key={idx} className="flex items-center gap-1.5 truncate">
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                              <span className="truncate">{srv}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    {/* Fee & SLA Badge info */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                      <span>
                        {lang === 'ml' ? 'ഫീസ്:' : 'Fee:'}{' '}
                        <strong className="text-slate-800 dark:text-slate-200">
                          {lang === 'ml' ? item.feeMl : item.fee}
                        </strong>
                      </span>
                      <span>
                        {lang === 'ml' ? 'സമയം:' : 'Time:'}{' '}
                        <strong className="text-emerald-600 dark:text-emerald-400">
                          {lang === 'ml' ? item.slaMl : item.sla}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Card Action Buttons (Big, High Visibility for Senior Users) */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    {/* Details Drawer Button */}
                    <button
                      type="button"
                      onClick={() => setActiveDrawerItem(item)}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1"
                      title={lang === 'ml' ? 'കൂടുതൽ വിവരങ്ങൾ' : 'View Requirements & Details'}
                    >
                      <span className="material-symbols-outlined text-[16px]">info</span>
                      <span>{lang === 'ml' ? 'വിവരങ്ങൾ' : 'Details'}</span>
                    </button>

                    {/* Direct Official Portal Link (Primary Action) */}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-md transition-all"
                    >
                      <span>{lang === 'ml' ? 'പോർട്ടൽ തുറക്കുക' : 'Open Official Portal'}</span>
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* HELPER SECTION: DOCUMENT & PHOTO CONVERTER TOOLS */}
        {/* (Collapsible / Expandable with "All Tools" Button) */}
        {/* ========================================================================= */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-600/20 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">
                <span className="material-symbols-outlined text-[20px]">handyman</span>
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {lang === 'ml'
                    ? 'രേഖകൾ അപ്‌ലോഡ് ചെയ്യാനുള്ള സഹായ ടൂളുകൾ'
                    : 'Helpful Tools for Document Uploads'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'ml'
                    ? 'ഫോട്ടോകൾ PDF ആക്കാനും, സർട്ടിഫിക്കറ്റ് സൈസ് ചെറുതാക്കാനും, PSC ഫോട്ടോ റീസൈസ് ചെയ്യാനുമുള്ള സൗജന്യ ടൂളുകൾ.'
                    : 'Free helper utilities to convert JPG to PDF, compress certificates, and format PSC photos.'}
                </p>
              </div>
            </div>

            {/* "All Tools" Toggle Button */}
            <button
              type="button"
              onClick={() => setShowAllTools(!showAllTools)}
              className="self-start sm:self-auto px-4 py-2 rounded-xl border border-purple-300 dark:border-purple-800/80 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 font-bold text-xs transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <span>
                {showAllTools
                  ? lang === 'ml'
                    ? 'കുറച്ചു കാണിക്കുക (Top 4) ↑'
                    : 'Show Less (Top 4) ↑'
                  : lang === 'ml'
                  ? `എല്ലാ ടൂളുകളും കാണുക (${UTILITY_TOOLS.length}) ↓`
                  : `View All Tools (${UTILITY_TOOLS.length}) ↓`}
              </span>
            </button>
          </div>

          {/* Grid of Tools (Top 4 or All 8 based on state) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in-quick">
            {displayedTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all flex flex-col justify-between h-36 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30">
                      {lang === 'ml' ? tool.badgeMl : tool.badge}
                    </span>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 text-[18px]">
                      open_in_new
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                    {lang === 'ml' ? tool.titleMl : tool.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {lang === 'ml' ? tool.descriptionMl : tool.description}
                  </p>
                </div>

                <div className="text-[11px] text-purple-600 dark:text-purple-400 font-bold flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>{lang === 'ml' ? 'ടൂൾ ഉപയോഗിക്കുക' : 'Open Free Tool'}</span>
                  <span>→</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* SLIDE-OVER DETAIL MODAL / REQUIREMENTS DRAWER */}
      {/* ========================================================================= */}
      {activeDrawerItem && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in-quick">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveDrawerItem(null)}
          />

          {/* Drawer Panel */}
          <div className="relative max-w-xl w-full bg-white dark:bg-[#0f172a] border-l border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl text-slate-900 dark:text-white transition-colors">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        activeDrawerItem.source === 'state'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
                          : 'bg-indigo-50 text-indigo-800 border border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30'
                      }`}
                    >
                      {activeDrawerItem.source === 'state'
                        ? lang === 'ml'
                          ? 'കേരള സർക്കാർ'
                          : 'Kerala State Portal'
                        : lang === 'ml'
                        ? 'കേന്ദ്ര സർക്കാർ'
                        : 'Central Govt Portal'}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                      <span className="material-symbols-outlined text-[16px]">
                        verified
                      </span>
                      {lang === 'ml' ? 'പരിശോധിച്ചുറപ്പിച്ചത്' : 'Official Verified'}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    {lang === 'ml' ? activeDrawerItem.titleMl : activeDrawerItem.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {lang === 'ml' ? activeDrawerItem.authorityMl : activeDrawerItem.authority}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveDrawerItem(null)}
                  className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
                  title="Close (Esc)"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Direct Link Endpoint Box */}
              <div className="bg-slate-50 dark:bg-slate-800/90 rounded-xl p-3 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 overflow-hidden text-xs">
                  <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[18px]">
                    lock
                  </span>
                  <span className="font-mono text-slate-700 dark:text-slate-300 truncate">
                    {activeDrawerItem.url}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => copyLink(e, activeDrawerItem)}
                  className="px-2.5 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-lg text-xs font-bold transition-colors flex-shrink-0"
                >
                  {lang === 'ml' ? 'കോപ്പി' : 'Copy'}
                </button>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {lang === 'ml' ? 'വിവരണം:' : 'About this Portal:'}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {lang === 'ml'
                    ? activeDrawerItem.descriptionMl
                    : activeDrawerItem.description}
                </p>
              </div>

              {/* Services Offered List */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {lang === 'ml' ? 'ലഭ്യമായ പ്രധാന സേവനങ്ങൾ:' : 'Services Offered:'}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  {(lang === 'ml' ? activeDrawerItem.servicesMl : activeDrawerItem.services).map(
                    (srv, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">›</span>
                        <span>{srv}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Required Documents Checklist */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {lang === 'ml'
                    ? 'ആവശ്യമായ പ്രധാന രേഖകൾ (Checklist):'
                    : 'Required Documents (Checklist):'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(lang === 'ml' ? activeDrawerItem.docsMl : activeDrawerItem.docs).map(
                    (doc, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-medium"
                      >
                        ✓ {doc}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Fee & Processing SLA Info Box */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block mb-0.5">
                    {lang === 'ml' ? 'സർക്കാർ ഫീസ്:' : 'Govt Fee:'}
                  </span>
                  <strong className="text-sm text-emerald-700 dark:text-emerald-400">
                    {lang === 'ml' ? activeDrawerItem.feeMl : activeDrawerItem.fee}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block mb-0.5">
                    {lang === 'ml' ? 'ലഭിക്കുന്ന സമയം:' : 'Processing SLA:'}
                  </span>
                  <strong className="text-sm text-slate-900 dark:text-white">
                    {lang === 'ml' ? activeDrawerItem.slaMl : activeDrawerItem.sla}
                  </strong>
                </div>
              </div>
            </div>

            {/* Modal Bottom Launcher */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <a
                href={activeDrawerItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>
                  {lang === 'ml'
                    ? 'ഔദ്യോഗിക പോർട്ടലിലേക്ക് പ്രവേശിക്കുക'
                    : 'Open Official Government Portal'}
                </span>
                <span className="material-symbols-outlined text-[20px]">open_in_new</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FLOATING BACK TO TOP BUTTON */}
      {/* ========================================================================= */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-700 shadow-xl transition-all hover:scale-110"
          title={lang === 'ml' ? 'മുകളിലേക്ക് പോകുക' : 'Back to top'}
        >
          <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
        </button>
      )}

      {/* ========================================================================= */}
      {/* FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-white dark:bg-[#0f172a] border-t border-slate-200 dark:border-slate-800 mt-20 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 text-center">
          {/* Verification Badge Specified in Requirements */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-xs sm:text-sm text-emerald-800 dark:text-emerald-400 font-bold">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>
              {lang === 'ml'
                ? '100% നേരിട്ടുള്ള ഔദ്യോഗിക സർക്കാർ പോർട്ടലുകൾ • ഇടനിലക്കാരില്ല • സുരക്ഷിതം'
                : '100% Direct Official Govt Portals • No Intermediaries • Safe & Secure'}
            </span>
          </div>

          <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
            <p className="font-bold text-slate-800 dark:text-slate-300">
              SevaConnect • Kerala &amp; Central Citizen Services Directory
            </p>
            <p>
              {lang === 'ml'
                ? 'സൗജന്യ പൊതുജന സേവന ഡയറക്ടറി. പൊതുജനങ്ങൾക്ക് ഔദ്യോഗിക സർക്കാർ സൈറ്റുകളിലേക്ക് നേരിട്ട് പ്രവേശിക്കാൻ സഹായിക്കുന്നു.'
                : 'Public service index designed for citizens. Connects directly to authenticated government servers.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
