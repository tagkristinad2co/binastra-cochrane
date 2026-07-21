import React, { useState, useEffect } from "react";
import SalesPage from "./components/SalesPage";
import Questionnaire from "./components/Questionnaire";
import { Answer, UtmParams, AnalyticsEvent } from "./types";
import { Terminal, Check, BarChart2, Eye, Play, Sparkles, ClipboardCheck, Cloud, CloudLightning, ShieldCheck, RefreshCw, LogOut, Database, ExternalLink, HelpCircle, FileSpreadsheet } from "lucide-react";
import { initAuth, googleSignIn, appendLeadRow, createLeadSpreadsheet, logout, setAccessToken } from "./lib/firebase";
import { User } from "firebase/auth";

const getUtmParams = (): UtmParams => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term")
  };
};

export default function App() {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [savedAnswers, setSavedAnswers] = useState<Answer[]>([]);
  const [ctaSource, setCtaSource] = useState<string>("hero_learn_more");
  const [selectedUnitFromCta, setSelectedUnitFromCta] = useState<string | null>(null);
  const [utmParams, setUtmParams] = useState<UtmParams>({
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
    utm_term: null
  });

  // Track event logs in-memory for the on-screen analytics dashboard
  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>([]);
  const [isAnalyticsPanelExpanded, setIsAnalyticsPanelExpanded] = useState(false);
  const [hasNewEvent, setHasNewEvent] = useState(false);

  // Google Drive & Sheets Integration State
  const [leads, setLeads] = useState<Array<{
    name: string;
    email: string;
    phone: string;
    recommendedUnitId?: string;
    recommendedUnitName?: string;
    ctaSource?: string;
    timestamp: string;
    synced: boolean;
  }>>(() => {
    const stored = localStorage.getItem("cochrane_leads");
    return stored ? JSON.parse(stored) : [];
  });

  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(() => {
    return localStorage.getItem("cochrane_spreadsheet_id");
  });

  const [ownerUser, setOwnerUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'linking' | 'syncing' | 'synced' | 'error'>('idle');
  const [syncError, setSyncError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'logs' | 'sync'>('logs');

  useEffect(() => {
    localStorage.setItem("cochrane_leads", JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    if (spreadsheetId) {
      localStorage.setItem("cochrane_spreadsheet_id", spreadsheetId);
    } else {
      localStorage.removeItem("cochrane_spreadsheet_id");
    }
  }, [spreadsheetId]);

  useEffect(() => {
    initAuth(
      (user, token) => {
        setOwnerUser(user);
        setAccessTokenState(token);
        setAccessToken(token);
      },
      () => {
        setOwnerUser(null);
        setAccessTokenState(null);
        setAccessToken(null);
      }
    );
  }, []);

  const handleGoogleConnect = async () => {
    setSyncStatus('linking');
    setSyncError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setOwnerUser(result.user);
        setAccessTokenState(result.accessToken);
        setAccessToken(result.accessToken);
        
        let currentSpreadsheetId = spreadsheetId;
        if (!currentSpreadsheetId) {
          currentSpreadsheetId = await createLeadSpreadsheet(result.accessToken);
          setSpreadsheetId(currentSpreadsheetId);
        }
        setSyncStatus('synced');
        // Automatically sync any local unsynced leads!
        await syncAllLeads(result.accessToken, currentSpreadsheetId);
      }
    } catch (error: any) {
      console.error("Connection failed:", error);
      setSyncStatus('error');
      setSyncError(error.message || "Authentication failed");
    }
  };

  const syncAllLeads = async (tokenToUse?: string, sheetIdToUse?: string) => {
    const token = tokenToUse || accessToken;
    const sheetId = sheetIdToUse || spreadsheetId;
    
    if (!token || !sheetId) {
      setSyncError("Please connect your Google Drive first.");
      return;
    }

    const unsyncedLeads = leads.filter(l => !l.synced);
    if (unsyncedLeads.length === 0) return;

    setSyncStatus('syncing');
    setSyncError(null);

    try {
      for (const lead of unsyncedLeads) {
        await appendLeadRow(token, sheetId, [
          lead.timestamp,
          lead.name,
          lead.email,
          lead.phone,
          lead.recommendedUnitName || "N/A",
          lead.ctaSource || "N/A"
        ]);
        
        // Update synced status of this lead
        setLeads(prev => prev.map(l => l.timestamp === lead.timestamp ? { ...l, synced: true } : l));
      }
      setSyncStatus('synced');
    } catch (err: any) {
      console.error("Bulk sync error:", err);
      setSyncStatus('error');
      setSyncError(err.message || "Failed to sync some leads");
    }
  };

  const handleDisconnect = async () => {
    try {
      await logout();
      setOwnerUser(null);
      setAccessTokenState(null);
      setAccessToken(null);
      setSyncStatus('idle');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // 1. Initialize UTM and hash routing on mount
  useEffect(() => {
    // Extract UTM
    const utms = getUtmParams();
    setUtmParams(utms);

    // Initial routing state check
    const handleHashChange = () => {
      if (window.location.hash === "#assessment" || window.location.hash === "#/assessment") {
        setIsQuestionnaireOpen(true);
      } else {
        setIsQuestionnaireOpen(false);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Run on mount

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // 2. Event Tracking Helper
  const trackEvent = (event: string, data: Record<string, any>) => {
    const newEvent: AnalyticsEvent = {
      event,
      timestamp: new Date().toISOString(),
      data
    };

    // Console logging for developer tooling
    console.log(`[ANALYTICS EVENT]: ${event}`, data);

    setAnalyticsEvents(prev => [newEvent, ...prev]);
    setHasNewEvent(true);

    if (event === "generate_lead") {
      const timestamp = data.timestamp || new Date().toISOString();
      const leadData = {
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        recommendedUnitId: data.recommendedUnitId || "",
        recommendedUnitName: data.recommendedUnitName || "",
        ctaSource: data.ctaSource || "",
        timestamp,
        synced: false
      };

      // Add to leads list
      setLeads(prev => [leadData, ...prev]);

      // Attempt live auto-syncing if authorized
      if (accessToken && spreadsheetId) {
        appendLeadRow(accessToken, spreadsheetId, [
          timestamp,
          leadData.name,
          leadData.email,
          leadData.phone,
          leadData.recommendedUnitName,
          leadData.ctaSource
        ]).then(() => {
          // Update synced status
          setLeads(prev => prev.map(l => l.timestamp === timestamp ? { ...l, synced: true } : l));
        }).catch((err) => {
          console.error("Auto-sync error on registration:", err);
        });
      }
    }
  };

  // 3. Learn More CTA Handlers
  const handleLearnMoreClick = (source: string, selectedUnit?: string) => {
    setCtaSource(source);
    setSelectedUnitFromCta(selectedUnit || null);

    // Track the learn_more_click event exactly as requested
    trackEvent("learn_more_click", {
      ctaSource: source,
      selectedUnit: selectedUnit || null,
      pageUrl: window.location.href,
      utmParams,
      timestamp: new Date().toISOString()
    });

    // Change hash to open the assessment funnel
    window.location.hash = "assessment";
  };

  // 4. Close Questionnaire Handler
  const handleCloseQuestionnaire = () => {
    // Clear hash which automatically triggers state update to close questionnaire
    window.location.hash = "";
  };

  // Close animation indicator after opening panel
  useEffect(() => {
    if (isAnalyticsPanelExpanded) {
      setHasNewEvent(false);
    }
  }, [isAnalyticsPanelExpanded]);

  return (
    <div className="relative min-h-screen bg-[#faf7f2]">
      
      {/* Main Sales Page Component */}
      <SalesPage onLearnMore={handleLearnMoreClick} />

      {/* Questionnaire Funnel Step as Full-Screen Overlay */}
      {isQuestionnaireOpen && (
        <Questionnaire
          utmParams={utmParams}
          ctaSource={ctaSource}
          selectedUnitFromCta={selectedUnitFromCta}
          onClose={handleCloseQuestionnaire}
          onTrackEvent={trackEvent}
          savedAnswers={savedAnswers}
          onSaveAnswers={setSavedAnswers}
        />
      )}

      {/* PERSISTENT DEMO ANALYTICS MONITOR BADGE/PANEL */}
      <div className="fixed bottom-16 md:bottom-6 right-6 z-50">
        <div className={`bg-neutral-900 border border-neutral-700/60 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 max-w-sm sm:max-w-md ${
          isAnalyticsPanelExpanded ? "w-96 sm:w-[450px] h-[480px]" : "w-52 h-12"
        }`}>
          {/* Header */}
          <div 
            onClick={() => setIsAnalyticsPanelExpanded(!isAnalyticsPanelExpanded)}
            className="px-4 py-3 bg-[#1d1d1f] hover:bg-neutral-800 flex justify-between items-center cursor-pointer transition-colors border-b border-neutral-800"
          >
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Terminal className="w-4 h-4 text-[#c5a059]" />
                {hasNewEvent && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                )}
              </div>
              <span className="text-white text-xs font-bold font-mono tracking-wider">
                Analytics Monitor
              </span>
            </div>
            <div className="flex items-center space-x-1.5">
              {analyticsEvents.length > 0 && (
                <span className="bg-[#581226] text-white text-[9px] font-mono px-1.5 py-0.2 rounded">
                  {analyticsEvents.length} events
                </span>
              )}
              <span className="text-neutral-400 text-xs">
                {isAnalyticsPanelExpanded ? "▼" : "▲"}
              </span>
            </div>
          </div>

          {/* Expanded Monitor Tabs & Panels */}
          {isAnalyticsPanelExpanded && (
            <div className="flex flex-col h-[436px]">
              {/* Tab Navigation */}
              <div className="flex border-b border-neutral-800 bg-[#161617] text-xs font-mono">
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveTab('logs'); }}
                  className={`flex-1 py-2 text-center font-bold tracking-wider transition-colors ${
                    activeTab === 'logs' ? 'text-white border-b-2 border-[#c5a059] bg-neutral-900/40' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Event Logs
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveTab('sync'); }}
                  className={`flex-1 py-2 text-center font-bold tracking-wider transition-colors flex items-center justify-center space-x-1.5 ${
                    activeTab === 'sync' ? 'text-white border-b-2 border-emerald-500 bg-neutral-900/40' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Cloud className="w-3.5 h-3.5" />
                  <span>Google Drive Sync</span>
                </button>
              </div>

              {/* Tab Content Panels */}
              {activeTab === 'logs' ? (
                <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-neutral-950 font-mono text-xxs text-neutral-300">
                  {analyticsEvents.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-neutral-500 text-center space-y-2 p-6">
                      <BarChart2 className="w-8 h-8 text-neutral-600 animate-pulse" />
                      <p>No events logged yet.</p>
                      <p className="text-[10px]">Click any "Learn More" button to initiate events tracking.</p>
                    </div>
                  ) : (
                    analyticsEvents.map((evt, idx) => (
                      <div key={idx} className="border-b border-neutral-800 pb-2.5 last:border-0">
                        <div className="flex justify-between items-start text-emerald-400 font-bold mb-1">
                          <span className="break-all flex items-center space-x-1">
                            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span>{evt.event}</span>
                          </span>
                          <span className="text-neutral-600 text-[9px] flex-shrink-0">
                            {new Date(evt.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        
                        {/* Event payload data breakdown */}
                        <pre className="bg-neutral-900/60 p-2 rounded text-neutral-400 leading-normal overflow-x-auto whitespace-pre-wrap max-h-24">
                          {JSON.stringify(evt.data, null, 2)}
                        </pre>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="p-4 flex-1 overflow-y-auto space-y-4 bg-neutral-950 text-xs text-neutral-300">
                  {/* Connection Card */}
                  {!ownerUser ? (
                    <div className="bg-neutral-900 border border-neutral-800/80 rounded-xl p-5 text-center space-y-4">
                      <div className="mx-auto w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                        <Database className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-white text-sm font-semibold">Connect your Google Drive</h4>
                        <p className="text-neutral-400 text-[10px] leading-relaxed">
                          Link your Google account to automatically transfer client lead assessments to a Google Sheet in your Google Drive.
                        </p>
                      </div>
                      
                      {/* Sign in with Google Button */}
                      <button 
                        onClick={handleGoogleConnect}
                        disabled={syncStatus === 'linking'}
                        className="w-full flex items-center justify-center bg-white hover:bg-neutral-50 border border-neutral-300 rounded-lg py-2.5 px-4 cursor-pointer text-sm font-semibold text-neutral-800 transition-colors disabled:opacity-50"
                      >
                        <div className="flex items-center space-x-2">
                          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                          </svg>
                          <span>{syncStatus === 'linking' ? 'Connecting...' : 'Sign in with Google'}</span>
                        </div>
                      </button>
                      
                      {syncError && (
                        <p className="text-red-500 text-[10px] font-mono">{syncError}</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Active Session Status */}
                      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-2">
                            {ownerUser.photoURL ? (
                              <img src={ownerUser.photoURL} alt="User Avatar" className="w-7 h-7 rounded-full" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-white text-xs">
                                {ownerUser.displayName?.charAt(0) || "U"}
                              </div>
                            )}
                            <div>
                              <p className="text-white text-xs font-semibold leading-tight">{ownerUser.displayName || "Google User"}</p>
                              <p className="text-neutral-400 text-[9px]">{ownerUser.email}</p>
                            </div>
                          </div>
                          <button 
                            onClick={handleDisconnect}
                            className="text-neutral-400 hover:text-red-400 p-1 rounded-lg transition-colors"
                            title="Disconnect Google Account"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="border-t border-neutral-800/60 pt-3 flex flex-col gap-2">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-neutral-400 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-400" />
                              Real-time Sync status:
                            </span>
                            <span className="text-emerald-400 font-bold uppercase tracking-wider">Active</span>
                          </div>
                          
                          {spreadsheetId ? (
                            <div className="bg-neutral-950/80 p-2.5 rounded-lg border border-neutral-800 space-y-1.5">
                              <div className="flex items-center justify-between text-neutral-300 font-mono text-[9px]">
                                <span className="flex items-center gap-1 font-sans font-semibold text-neutral-200">
                                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
                                  Target Sheet:
                                </span>
                                <span className="text-neutral-500 truncate max-w-[130px]" title={spreadsheetId}>{spreadsheetId}</span>
                              </div>
                              <a 
                                href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center space-x-1.5 w-full mt-1 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 py-1.5 px-3 rounded-lg text-xs font-semibold border border-emerald-500/20 transition-all cursor-pointer"
                              >
                                <span>Open Google Sheet</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          ) : (
                            <button
                              onClick={async () => {
                                setSyncStatus('linking');
                                try {
                                  const sid = await createLeadSpreadsheet(accessToken!);
                                  setSpreadsheetId(sid);
                                  setSyncStatus('synced');
                                } catch (e: any) {
                                  setSyncStatus('error');
                                  setSyncError(e.message);
                                }
                              }}
                              className="w-full text-center py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all"
                            >
                              Initialize Lead Spreadsheet
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Leads List and Bulk Sync controls */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                          <h5 className="text-neutral-200 font-bold tracking-wide uppercase text-[9px]">Accumulated Leads ({leads.length})</h5>
                          
                          {leads.some(l => !l.synced) && (
                            <button 
                              onClick={() => syncAllLeads()}
                              disabled={syncStatus === 'syncing'}
                              className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 font-semibold cursor-pointer disabled:opacity-50"
                            >
                              <RefreshCw className={`w-3 h-3 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                              <span>Sync Unsynced</span>
                            </button>
                          )}
                        </div>

                        {leads.length === 0 ? (
                          <div className="p-4 border border-neutral-800 border-dashed rounded-xl text-center text-neutral-500 text-[10px] space-y-1">
                            <p>No registration leads captured yet.</p>
                            <p className="text-[9px] text-neutral-600">Submit a lead in the Questionnaire assessment to see syncing live.</p>
                          </div>
                        ) : (
                          <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1 text-left">
                            {leads.map((lead, idx) => (
                              <div key={idx} className="bg-[#141415] border border-neutral-800/80 rounded-lg p-2 flex items-center justify-between gap-2 text-[10px]">
                                <div className="space-y-0.5 min-w-0">
                                  <p className="text-white font-semibold truncate text-xs">{lead.name}</p>
                                  <p className="text-neutral-400 font-mono text-[9px] truncate">{lead.email}</p>
                                  <p className="text-neutral-500 text-[9px] font-mono">{lead.phone}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                  {lead.synced ? (
                                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                                      <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                                      Synced
                                    </span>
                                  ) : (
                                    <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[8px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                                      <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse"></span>
                                      Pending Sync
                                    </span>
                                  )}
                                  <span className="text-[8px] text-neutral-600 font-mono">
                                    {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
