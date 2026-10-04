import { recordVisitorSession, updateSessionDuration, VisitorSessionRecord } from './neonDb';
import { notifyNewVisitor } from './notificationService';

// Detect Device, Browser & OS
function getClientMeta() {
  const ua = navigator.userAgent;
  let deviceType = 'Desktop';
  if (/mobile/i.test(ua)) deviceType = 'Mobile';
  else if (/tablet|ipad/i.test(ua)) deviceType = 'Tablet';

  let os = 'Unknown OS';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';

  let browser = 'Unknown Browser';
  if (/chrome|crios/i.test(ua) && !/edge|opr\//i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/edg/i.test(ua)) browser = 'Edge';
  else if (/opr\//i.test(ua)) browser = 'Opera';

  return { deviceType, os, browser };
}

// Generate or retrieve session ID
function getOrCreateSessionId(): string {
  let sid = sessionStorage.getItem('ram_portfolio_sid');
  if (!sid) {
    sid = 'sid_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    sessionStorage.setItem('ram_portfolio_sid', sid);
  }
  return sid;
}

export class AnalyticsTracker {
  private static instance: AnalyticsTracker;
  private sessionId: string = '';
  private startTime: number = Date.now();
  private durationSeconds: number = 0;
  private sectionsViewed: Set<string> = new Set(['hero']);
  private geoData: { country?: string; city?: string; ip?: string } = {};
  private timer: NodeJS.Timeout | null = null;
  private isInitialized: boolean = false;

  private constructor() {}

  public static getInstance(): AnalyticsTracker {
    if (!AnalyticsTracker.instance) {
      AnalyticsTracker.instance = new AnalyticsTracker();
    }
    return AnalyticsTracker.instance;
  }

  public async init() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    this.sessionId = getOrCreateSessionId();
    this.startTime = Date.now();

    const meta = getClientMeta();
    const referrer = document.referrer ? new URL(document.referrer).hostname : 'Direct';

    // Fetch GeoIP info safely
    try {
      const res = await fetch('https://ipwho.is/', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success) {
          this.geoData = {
            country: data.country,
            city: data.city,
            ip: data.ip,
          };
        }
      }
    } catch {
      // Ad blocker or network restriction fallback
      this.geoData = { country: 'International', city: 'Online' };
    }

    const sessionPayload: VisitorSessionRecord = {
      sessionId: this.sessionId,
      ip: this.geoData.ip || 'Anonymous',
      country: this.geoData.country || 'Unknown',
      city: this.geoData.city || 'Unknown',
      deviceType: meta.deviceType,
      browser: meta.browser,
      os: meta.os,
      referrer,
      durationSeconds: 0,
      sectionsViewed: Array.from(this.sectionsViewed),
    };

    // 1. Record session in Neon DB
    await recordVisitorSession(sessionPayload);

    // 2. Dispatch real-time alert (Telegram / Discord)
    await notifyNewVisitor({
      country: sessionPayload.country,
      city: sessionPayload.city,
      deviceType: sessionPayload.deviceType,
      browser: sessionPayload.browser,
      os: sessionPayload.os,
      referrer: sessionPayload.referrer,
    });

    // 3. Start Section Observer
    this.observeSections();

    // 4. Start Heartbeat Timer (Sync every 15s)
    this.startHeartbeat();

    // 5. Visibility / Unload Handler
    this.setupLifecycleListeners();
  }

  public getGeoLocation() {
    return this.geoData;
  }

  private observeSections() {
    const sectionIds = ['hero', 'about', 'services', 'skills', 'projects', 'contact'];
    
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            this.sectionsViewed.add(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  private startHeartbeat() {
    this.timer = setInterval(() => {
      this.syncSession();
    }, 15000); // every 15 seconds
  }

  private syncSession() {
    this.durationSeconds = Math.floor((Date.now() - this.startTime) / 1000);
    updateSessionDuration(
      this.sessionId,
      this.durationSeconds,
      Array.from(this.sectionsViewed)
    );
  }

  private setupLifecycleListeners() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.syncSession();
      }
    });

    window.addEventListener('beforeunload', () => {
      this.syncSession();
    });
  }
}

export const analytics = AnalyticsTracker.getInstance();
