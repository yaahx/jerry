'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { AdminRibbon } from '@/components/AdminRibbon';
import { Hero } from '@/components/Hero';
import { MusicSection } from '@/components/MusicSection';
import { StoreSection } from '@/components/StoreSection';
import { NewsSection } from '@/components/NewsSection';
import { AboutSection } from '@/components/AboutSection';
import { AudioPlayerBar } from '@/components/AudioPlayerBar';
import { CartDrawer } from '@/components/CartDrawer';
import { AdminLoginModal } from '@/components/AdminLoginModal';
import { AdminDashboardModal } from '@/components/AdminDashboardModal';
import { TrackModal } from '@/components/TrackModal';
import { ProductModal } from '@/components/ProductModal';
import { NewsModal } from '@/components/NewsModal';
import { OrderInquiryModal } from '@/components/OrderInquiryModal';

import {
  Track,
  Product,
  NewsPost,
  CartItem,
  Activity,
  Metrics,
  GuestMessage,
  SiteSettings,
} from '@/lib/types';
import {
  storage,
  initialTracks,
  initialProducts,
  initialNews,
  initialSettings,
} from '@/lib/storage';

export default function Home() {
  // Data states
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [news, setNews] = useState<NewsPost[]>(initialNews);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({
    totalVisitors: 48,
    pageViews: 182,
    trackPlays: 94,
    productViews: 53,
    cartInquiries: 7,
    messagesReceived: 4,
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [messages, setMessages] = useState<GuestMessage[]>([]);

  // Authentication state
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Audio Player states
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(180);
  const [volume, setVolume] = useState<number>(0.85);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isSynthPlayingRef = useRef<boolean>(false);

  // Modal open states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [trackToEdit, setTrackToEdit] = useState<Track | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [newsToEdit, setNewsToEdit] = useState<NewsPost | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Toast notifications
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((cur) => (cur === msg ? null : cur));
    }, 3200);
  };

  // Initialize from LocalStorage safely on client mount
  useEffect(() => {
    const loadedTracks = storage.getTracks();
    const loadedProducts = storage.getProducts();
    const loadedNews = storage.getNews();
    const loadedSettings = storage.getSettings();
    const loadedCart = storage.getCart();
    const loadedMetrics = storage.getMetrics();
    const loadedActivities = storage.getActivities();
    const loadedMessages = storage.getMessages();

    setTracks(loadedTracks);
    setProducts(loadedProducts);
    setNews(loadedNews);
    setSettings(loadedSettings);
    setCart(loadedCart);
    setMetrics(loadedMetrics);
    setActivities(loadedActivities);
    setMessages(loadedMessages);

    // Check session admin
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('uglydogs_admin_auth');
      if (auth === 'true') setIsAdmin(true);
    }

    storage.logActivity('visit', 'Guest opened website');
    setActivities(storage.getActivities());
    setMetrics(storage.getMetrics());

    // Create audio element
    audioRef.current = new Audio();
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio && audio.duration) {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      handleNextTrack();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      stopSynthAudio();
    };
  }, []);

  // Synthesizer Audio Generator (for instant music playback)
  const startSynthAudio = () => {
    try {
      if (!synthCtxRef.current) {
        const AudioContextClass =
          window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        synthCtxRef.current = new AudioContextClass();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const notes = [130.81, 146.83, 164.81, 196.0, 220.0, 261.63, 293.66];
      let step = 0;

      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);

      let synthTime = 0;
      const totalSeconds = 180;
      setDuration(totalSeconds);

      synthIntervalRef.current = setInterval(() => {
        synthTime += 0.3;
        setCurrentTime(synthTime % totalSeconds);

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = step % 4 === 0 ? 'sawtooth' : 'sine';
        const note = notes[(step * 3) % notes.length];
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(750 + Math.sin(step) * 350, ctx.currentTime);

        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.exponentialRampToValueAtTime(0.18 * volume, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.3);

        step++;
      }, 300);

      isSynthPlayingRef.current = true;
    } catch (e) {
      console.error('Synth playback error:', e);
    }
  };

  const stopSynthAudio = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    isSynthPlayingRef.current = false;
  };

  const playTrackAtIndex = (index: number) => {
    if (index < 0 || index >= tracks.length) return;
    const track = tracks[index];
    setCurrentTrackIndex(index);

    // Log in tracker
    storage.logActivity('play', `Played track "${track.title}"`);
    setActivities(storage.getActivities());

    // Increment play count
    const updated = [...tracks];
    updated[index].plays += 1;
    setTracks(updated);
    storage.saveTracks(updated);

    // Stop current
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    stopSynthAudio();

    if (track.audioUrl && track.audioUrl.trim() !== '') {
      if (audioRef.current) {
        audioRef.current.src = track.audioUrl;
        audioRef.current.volume = volume;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            isSynthPlayingRef.current = false;
          })
          .catch(() => {
            startSynthAudio();
            setIsPlaying(true);
          });
      }
    } else {
      startSynthAudio();
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (isSynthPlayingRef.current) {
        stopSynthAudio();
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      playTrackAtIndex(currentTrackIndex);
    }
  };

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    playTrackAtIndex(nextIdx);
  };

  const handlePrevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrackAtIndex(prevIdx);
  };

  const handleSeek = (pos: number) => {
    if (duration > 0) {
      const targetTime = pos * duration;
      setCurrentTime(targetTime);
      if (audioRef.current && !isSynthPlayingRef.current) {
        audioRef.current.currentTime = targetTime;
      }
    }
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    const newCart = [...cart];
    const existing = newCart.find((i) => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      newCart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        img: product.img,
        qty: 1,
      });
    }
    setCart(newCart);
    storage.saveCart(newCart);
    storage.logActivity('shop', `Added "${product.title}" to cart`);
    setActivities(storage.getActivities());
    setMetrics(storage.getMetrics());
    showToast(`Added "${product.title}" to cart!`);
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    let newCart = [...cart];
    const item = newCart.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      newCart = newCart.filter((i) => i.id !== id);
    }
    setCart(newCart);
    storage.saveCart(newCart);
  };

  // Admin Auth
  const handleAdminLogin = (pinInput: string): boolean => {
    if (pinInput === storage.getPIN()) {
      setIsAdmin(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('uglydogs_admin_auth', 'true');
      }
      storage.logActivity('admin', 'Admin logged into Control Center');
      setActivities(storage.getActivities());
      showToast('Welcome back, Admin!');
      setIsAdminDashboardOpen(true);
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('uglydogs_admin_auth');
    }
    showToast('Admin mode deactivated');
  };

  // Track CRUD
  const handleSaveTrack = (trackData: Partial<Track>) => {
    let updated: Track[];
    if (trackData.id) {
      updated = tracks.map((t) => (t.id === trackData.id ? { ...t, ...trackData } as Track : t));
      showToast(`Track "${trackData.title}" updated!`);
    } else {
      const newTrk: Track = {
        id: 'trk-' + Date.now(),
        title: trackData.title || 'Untitled Track',
        artist: settings.artistName,
        genre: trackData.genre || 'Burnt Beats',
        duration: trackData.duration || '3:30',
        art: trackData.art || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
        audioUrl: trackData.audioUrl || '',
        description: trackData.description || '',
        plays: 0,
      };
      updated = [...tracks, newTrk];
      storage.logActivity('admin', `Uploaded new track "${newTrk.title}"`);
      showToast(`Track "${newTrk.title}" added!`);
    }
    setTracks(updated);
    storage.saveTracks(updated);
    setActivities(storage.getActivities());
  };

  const handleDeleteTrack = (id: string) => {
    if (!confirm('Are you sure you want to delete this track?')) return;
    const trk = tracks.find((t) => t.id === id);
    const updated = tracks.filter((t) => t.id !== id);
    setTracks(updated);
    storage.saveTracks(updated);
    storage.logActivity('admin', `Deleted track "${trk?.title || id}"`);
    setActivities(storage.getActivities());
    showToast(`Track "${trk?.title}" removed`);
  };

  // Product CRUD
  const handleSaveProduct = (prodData: Partial<Product>) => {
    let updated: Product[];
    if (prodData.id) {
      updated = products.map((p) => (p.id === prodData.id ? { ...p, ...prodData } as Product : p));
      showToast(`Item "${prodData.title}" updated!`);
    } else {
      const newProd: Product = {
        id: 'prod-' + Date.now(),
        title: prodData.title || 'New Item',
        category: prodData.category || 'Apparel',
        price: prodData.price || 25,
        badge: prodData.badge || '',
        img: prodData.img || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600',
        desc: prodData.desc || '',
        inStock: true,
      };
      updated = [...products, newProd];
      storage.logActivity('admin', `Added merch item "${newProd.title}"`);
      showToast(`Item "${newProd.title}" added to store!`);
    }
    setProducts(updated);
    storage.saveProducts(updated);
    setActivities(storage.getActivities());
  };

  const handleDeleteProduct = (id: string) => {
    if (!confirm('Are you sure you want to remove this merchandise item?')) return;
    const prod = products.find((p) => p.id === id);
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    storage.saveProducts(updated);
    storage.logActivity('admin', `Deleted merch item "${prod?.title || id}"`);
    setActivities(storage.getActivities());
    showToast(`Item "${prod?.title}" removed`);
  };

  // News CRUD
  const handleSaveNews = (newsData: Partial<NewsPost>) => {
    let updated: NewsPost[];
    if (newsData.id) {
      updated = news.map((n) => (n.id === newsData.id ? { ...n, ...newsData } as NewsPost : n));
      showToast('Post updated!');
    } else {
      const newPost: NewsPost = {
        id: 'news-' + Date.now(),
        title: newsData.title || 'Announcement',
        tag: newsData.tag || 'News',
        date:
          newsData.date ||
          new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        content: newsData.content || '',
      };
      updated = [newPost, ...news];
      storage.logActivity('admin', `Published announcement "${newPost.title}"`);
      showToast('New update posted!');
    }
    setNews(updated);
    storage.saveNews(updated);
    setActivities(storage.getActivities());
  };

  const handleDeleteNews = (id: string) => {
    if (!confirm('Are you sure you want to remove this update?')) return;
    const updated = news.filter((n) => n.id !== id);
    setNews(updated);
    storage.saveNews(updated);
    showToast('Update removed');
  };

  // Messages & Orders
  const handleSendMessage = (msgData: { name: string; email: string; type: string; message: string }) => {
    storage.saveMessage(msgData);
    setMessages(storage.getMessages());
    setMetrics(storage.getMetrics());
    setActivities(storage.getActivities());
  };

  const handleSubmitOrder = (orderData: { name: string; email: string; address: string; summary: string }) => {
    storage.saveMessage({
      name: orderData.name,
      email: orderData.email,
      type: 'Store Order Inquiry',
      message: `Shipping Address: ${orderData.address}\n\n${orderData.summary}`,
    });
    storage.logActivity('inquiry', `Order submitted by ${orderData.name} (${orderData.email})`);
    setCart([]);
    storage.saveCart([]);
    setMessages(storage.getMessages());
    setMetrics(storage.getMetrics());
    setActivities(storage.getActivities());
    showToast('Order inquiry received! Check your email soon.');
  };

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  return (
    <div className="relative min-h-screen bg-[#0c0a09] pb-28">
      {/* Background ambient glows */}
      <div className="fixed top-[-100px] left-[10%] w-[520px] h-[520px] bg-[#d9531e]/25 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed bottom-[10%] right-[5%] w-[550px] h-[550px] bg-[#f36c21]/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Navigation Bar */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
        isAdmin={isAdmin}
        onOpenCart={() => setIsCartOpen(true)}
        onToggleAdmin={() => {
          if (isAdmin) setIsAdminDashboardOpen(true);
          else setIsAdminLoginOpen(true);
        }}
        artistName={settings.artistName}
      />

      {/* Admin Ribbon Banner */}
      {isAdmin && (
        <AdminRibbon
          onOpenDashboard={() => setIsAdminDashboardOpen(true)}
          onLogout={handleAdminLogout}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6">
        <Hero
          artistName={settings.artistName}
          tagline={settings.tagline}
          bio={settings.bio}
          featuredTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayFeatured={() => playTrackAtIndex(currentTrackIndex)}
        />

        <MusicSection
          tracks={tracks}
          currentTrackId={currentTrack?.id || null}
          isPlaying={isPlaying}
          isAdmin={isAdmin}
          onPlayTrack={(trk) => {
            const idx = tracks.findIndex((t) => t.id === trk.id);
            if (idx !== -1) {
              if (idx === currentTrackIndex && isPlaying) {
                handleTogglePlay();
              } else {
                playTrackAtIndex(idx);
              }
            }
          }}
          onAddTrack={() => {
            setTrackToEdit(null);
            setIsTrackModalOpen(true);
          }}
          onEditTrack={(trk) => {
            setTrackToEdit(trk);
            setIsTrackModalOpen(true);
          }}
          onDeleteTrack={handleDeleteTrack}
          onToast={showToast}
        />

        <StoreSection
          products={products}
          currency={settings.currency}
          isAdmin={isAdmin}
          onAddToCart={handleAddToCart}
          onAddProduct={() => {
            setProductToEdit(null);
            setIsProductModalOpen(true);
          }}
          onEditProduct={(p) => {
            setProductToEdit(p);
            setIsProductModalOpen(true);
          }}
          onDeleteProduct={handleDeleteProduct}
        />

        <NewsSection
          news={news}
          isAdmin={isAdmin}
          onAddNews={() => {
            setNewsToEdit(null);
            setIsNewsModalOpen(true);
          }}
          onEditNews={(p) => {
            setNewsToEdit(p);
            setIsNewsModalOpen(true);
          }}
          onDeleteNews={handleDeleteNews}
        />

        <AboutSection
          bio={settings.bio}
          onSendMessage={handleSendMessage}
          onToast={showToast}
        />
      </main>

      {/* Persistent Audio Player Bar */}
      <AudioPlayerBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNext={handleNextTrack}
        onPrev={handlePrevTrack}
        audioRef={audioRef}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        volume={volume}
        onVolumeChange={handleVolumeChange}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        currency={settings.currency}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsOrderModalOpen(true);
        }}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLogin={handleAdminLogin}
      />

      {/* Admin Control Center Modal */}
      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        metrics={metrics}
        activities={activities}
        messages={messages}
        settings={settings}
        onClose={() => setIsAdminDashboardOpen(false)}
        onClearActivities={() => {
          if (confirm('Clear all visitor activity logs?')) {
            storage.saveActivities([]);
            setActivities([]);
            showToast('Activity logs cleared');
          }
        }}
        onDeleteMessage={(id) => {
          storage.deleteMessage(id);
          setMessages(storage.getMessages());
          showToast('Message removed');
        }}
        onSaveSettings={(newSettings, newPin) => {
          setSettings(newSettings);
          storage.saveSettings(newSettings);
          if (newPin) storage.setPIN(newPin);
        }}
        onOpenAddTrack={() => {
          setTrackToEdit(null);
          setIsTrackModalOpen(true);
        }}
        onOpenAddProduct={() => {
          setProductToEdit(null);
          setIsProductModalOpen(true);
        }}
        onOpenAddNews={() => {
          setNewsToEdit(null);
          setIsNewsModalOpen(true);
        }}
        onToast={showToast}
      />

      {/* Track Modal */}
      <TrackModal
        isOpen={isTrackModalOpen}
        trackToEdit={trackToEdit}
        onClose={() => setIsTrackModalOpen(false)}
        onSave={handleSaveTrack}
      />

      {/* Product Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        productToEdit={productToEdit}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
      />

      {/* News Modal */}
      <NewsModal
        isOpen={isNewsModalOpen}
        newsToEdit={newsToEdit}
        onClose={() => setIsNewsModalOpen(false)}
        onSave={handleSaveNews}
      />

      {/* Order Inquiry Modal */}
      <OrderInquiryModal
        isOpen={isOrderModalOpen}
        cart={cart}
        currency={settings.currency}
        onClose={() => setIsOrderModalOpen(false)}
        onSubmitOrder={handleSubmitOrder}
      />

      {/* Toast Notification Container */}
      {toastMsg && (
        <div className="fixed bottom-24 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#1c1611] border border-[#f36c21] text-white text-xs font-semibold shadow-2xl animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#f36c21] animate-ping" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
