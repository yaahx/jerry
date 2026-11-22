import { Track, Product, NewsPost, Activity, Metrics, GuestMessage, SiteSettings, CartItem } from './types';

export const initialTracks: Track[] = [
  {
    id: 'trk-1',
    title: 'Neon Doberman',
    artist: 'uglydogsarecute',
    genre: 'Burnt Beats',
    duration: '3:24',
    art: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    audioUrl: '',
    description: 'Heavy 808 sub-bass accompanied by warm analog synths and crisp percussion.',
    plays: 142,
  },
  {
    id: 'trk-2',
    title: 'Midnight Bark',
    artist: 'uglydogsarecute',
    genre: 'Lo-Fi Chill',
    duration: '2:48',
    art: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    audioUrl: '',
    description: 'Warm vinyl crackle, mellow electric piano chords, and nighttime ambience.',
    plays: 98,
  },
  {
    id: 'trk-3',
    title: 'Amber Resonance',
    artist: 'uglydogsarecute',
    genre: 'Experimental',
    duration: '3:52',
    art: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    audioUrl: '',
    description: 'Glitch vocal chops layered across syncopated hi-hats and deep reverberated pads.',
    plays: 87,
  },
  {
    id: 'trk-4',
    title: 'Underground Frequency',
    artist: 'uglydogsarecute',
    genre: 'Ambient',
    duration: '4:10',
    art: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    audioUrl: '',
    description: 'Deep modular drone with subtle rhythmic industrial pulses and analog warmth.',
    plays: 64,
  },
];

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    title: 'Limited Edition 12" Burnt Wax Vinyl LP',
    category: 'Vinyl & CD',
    price: 35.0,
    img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80',
    badge: 'Vinyl Exclusive',
    desc: 'Pressed on 180g translucent burnt orange wax with foil embossed gatefold jacket. Includes bonus track & digital download.',
    inStock: true,
  },
  {
    id: 'prod-2',
    title: 'Ugly Dogs Burnt Orange Heavyweight Hoodie',
    category: 'Apparel',
    price: 65.0,
    img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
    badge: 'Bestseller',
    desc: '100% heavyweight French terry cotton in vintage burnt orange. Screen printed with high density graphics front and back.',
    inStock: true,
  },
  {
    id: 'prod-3',
    title: 'Studio Tour Tee - Charcoal & Amber',
    category: 'Apparel',
    price: 32.0,
    img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    badge: 'New',
    desc: 'Vintage boxy fit cotton tee with copper foil chest logo and tour dates printed on reverse.',
    inStock: true,
  },
  {
    id: 'prod-4',
    title: 'Subterranean Beat Pack Vol. 1',
    category: 'Digital / Beats',
    price: 25.0,
    img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80',
    badge: 'Instant Download',
    desc: '30 Royalty-free WAV loops, 808 bass presets, drum one-shots, and MIDI stems used in recent tracks.',
    inStock: true,
  },
];

export const initialNews: NewsPost[] = [
  {
    id: 'news-1',
    title: 'Debut Full-Length Album "BURNT HORIZON" Dropping Soon',
    tag: 'Announcement',
    date: 'Nov 22, 2026',
    content: 'After 8 months locked in the subterranean studio, the master tapes have been sent to press! Featuring 12 unreleased tracks, analog synthesis, and custom sound design.\n\nPre-orders for the limited burnt-wax vinyl pressing will unlock next Friday right here on the website.',
  },
  {
    id: 'news-2',
    title: 'Warehouse Live Set & Pop-Up Shop in London',
    tag: 'Live Event',
    date: 'Nov 12, 2026',
    content: 'Performing a 90-minute live hybrid set next month. Bringing along exclusive physical merch, test pressings, and custom apparel available only in person. RSVP via the contact form for secret coordinates.',
  },
];

export const initialSettings: SiteSettings = {
  artistName: 'uglydogsarecute',
  tagline: 'Underground Electronic & Hip-Hop Beats | Independent Music & Merch',
  bio: 'Creating genre-defying soundscapes, heavy basslines, and warm analog textures from the subterranean studio. Everything here is handcrafted, independent, and distributed directly from artist to listener.',
  currency: '$',
  bookingEmail: 'contact@uglydogsarecute.com',
  instagram: '@uglydogsarecute',
  spotify: 'uglydogsarecute',
};

// Safe LocalStorage helpers
export const storage = {
  getGuestId: (): string => {
    if (typeof window === 'undefined') return 'Guest #1001';
    let id = localStorage.getItem('uglydogs_guest_id');
    if (!id) {
      const randNum = Math.floor(1000 + Math.random() * 9000);
      id = `Guest #${randNum}`;
      localStorage.setItem('uglydogs_guest_id', id);
    }
    return id;
  },

  getTracks: (): Track[] => {
    if (typeof window === 'undefined') return initialTracks;
    try {
      const saved = localStorage.getItem('uglydogs_tracks');
      return saved ? JSON.parse(saved) : initialTracks;
    } catch {
      return initialTracks;
    }
  },

  saveTracks: (tracks: Track[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('uglydogs_tracks', JSON.stringify(tracks));
  },

  getProducts: (): Product[] => {
    if (typeof window === 'undefined') return initialProducts;
    try {
      const saved = localStorage.getItem('uglydogs_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  },

  saveProducts: (prods: Product[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('uglydogs_products', JSON.stringify(prods));
  },

  getNews: (): NewsPost[] => {
    if (typeof window === 'undefined') return initialNews;
    try {
      const saved = localStorage.getItem('uglydogs_news');
      return saved ? JSON.parse(saved) : initialNews;
    } catch {
      return initialNews;
    }
  },

  saveNews: (news: NewsPost[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('uglydogs_news', JSON.stringify(news));
  },

  getSettings: (): SiteSettings => {
    if (typeof window === 'undefined') return initialSettings;
    try {
      const saved = localStorage.getItem('uglydogs_site_settings');
      return saved ? JSON.parse(saved) : initialSettings;
    } catch {
      return initialSettings;
    }
  },

  saveSettings: (settings: SiteSettings) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('uglydogs_site_settings', JSON.stringify(settings));
  },

  getCart: (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('uglydogs_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  saveCart: (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('uglydogs_cart', JSON.stringify(cart));
  },

  getMetrics: (): Metrics => {
    const defaultMetrics: Metrics = {
      totalVisitors: 48,
      pageViews: 182,
      trackPlays: 94,
      productViews: 53,
      cartInquiries: 7,
      messagesReceived: 4,
    };
    if (typeof window === 'undefined') return defaultMetrics;
    try {
      const saved = localStorage.getItem('uglydogs_metrics');
      return saved ? { ...defaultMetrics, ...JSON.parse(saved) } : defaultMetrics;
    } catch {
      return defaultMetrics;
    }
  },

  saveMetrics: (metrics: Metrics) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('uglydogs_metrics', JSON.stringify(metrics));
  },

  getActivities: (): Activity[] => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('uglydogs_activity_log');
      if (saved) return JSON.parse(saved);
    } catch {}

    const now = Date.now();
    const demo: Activity[] = [
      { id: 'act-1', type: 'play', guest: 'Guest #4192', detail: 'Played track "Neon Doberman"', timestamp: new Date(now - 1000 * 60 * 3).toISOString() },
      { id: 'act-2', type: 'shop', guest: 'Guest #8812', detail: 'Added "Burnt Orange Hoodie" to cart', timestamp: new Date(now - 1000 * 60 * 12).toISOString() },
      { id: 'act-3', type: 'visit', guest: 'Guest #6021', detail: 'Viewed Music Catalog', timestamp: new Date(now - 1000 * 60 * 25).toISOString() },
      { id: 'act-4', type: 'inquiry', guest: 'Guest #8812', detail: 'Submitted order inquiry for 2 items ($120.00)', timestamp: new Date(now - 1000 * 60 * 38).toISOString() },
      { id: 'act-5', type: 'play', guest: 'Guest #3210', detail: 'Played track "Midnight Bark"', timestamp: new Date(now - 1000 * 60 * 65).toISOString() },
      { id: 'act-6', type: 'visit', guest: 'Guest #7741', detail: 'Read news update "Studio Album Announcement"', timestamp: new Date(now - 1000 * 60 * 110).toISOString() },
    ];
    if (typeof window !== 'undefined') {
      localStorage.setItem('uglydogs_activity_log', JSON.stringify(demo));
    }
    return demo;
  },

  saveActivities: (activities: Activity[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('uglydogs_activity_log', JSON.stringify(activities));
  },

  logActivity: (type: Activity['type'], detail: string): Activity => {
    const guest = storage.getGuestId();
    const activities = storage.getActivities();
    const newAct: Activity = {
      id: 'act-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      type,
      guest,
      detail,
      timestamp: new Date().toISOString(),
    };
    activities.unshift(newAct);
    if (activities.length > 500) activities.pop();
    if (typeof window !== 'undefined') {
      localStorage.setItem('uglydogs_activity_log', JSON.stringify(activities));
      const m = storage.getMetrics();
      m.pageViews = (m.pageViews || 0) + 1;
      if (type === 'play') m.trackPlays = (m.trackPlays || 0) + 1;
      if (type === 'shop') m.productViews = (m.productViews || 0) + 1;
      if (type === 'inquiry') m.cartInquiries = (m.cartInquiries || 0) + 1;
      storage.saveMetrics(m);
    }
    return newAct;
  },

  getPIN: (): string => {
    if (typeof window === 'undefined') return '1234';
    return localStorage.getItem('uglydogs_admin_pin') || '1234';
  },

  setPIN: (pin: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('uglydogs_admin_pin', pin);
  },

  getMessages: (): GuestMessage[] => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('uglydogs_guest_messages');
      if (saved) return JSON.parse(saved);
    } catch {}
    const demo: GuestMessage[] = [
      {
        id: 'msg-1',
        name: 'Jordan K.',
        email: 'jordan.music@example.com',
        type: 'Booking / Feature',
        message: 'Hey! Loved the new tracks. Are you available for a festival set in Berlin this summer?',
        date: new Date(Date.now() - 1000 * 60 * 240).toLocaleString(),
      },
    ];
    return demo;
  },

  saveMessage: (msg: Omit<GuestMessage, 'id' | 'date'>) => {
    if (typeof window === 'undefined') return;
    const messages = storage.getMessages();
    const newMsg: GuestMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      date: new Date().toLocaleString(),
    };
    messages.unshift(newMsg);
    localStorage.setItem('uglydogs_guest_messages', JSON.stringify(messages));

    const m = storage.getMetrics();
    m.messagesReceived = (m.messagesReceived || 0) + 1;
    storage.saveMetrics(m);
    storage.logActivity('inquiry', `New guest message from ${msg.name} (${msg.type})`);
  },

  deleteMessage: (id: string) => {
    if (typeof window === 'undefined') return;
    let messages = storage.getMessages();
    messages = messages.filter((m) => m.id !== id);
    localStorage.setItem('uglydogs_guest_messages', JSON.stringify(messages));
  },
};
