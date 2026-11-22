'use client';

import React, { useState } from 'react';
import {
  X,
  BarChart2,
  Activity as ActivityIcon,
  Mail,
  Settings,
  Users,
  Eye,
  PlayCircle,
  ShoppingBag,
  Receipt,
  Download,
  Trash2,
  Save,
  Plus,
} from 'lucide-react';
import { Metrics, Activity, GuestMessage, SiteSettings } from '@/lib/types';

interface AdminDashboardModalProps {
  isOpen: boolean;
  metrics: Metrics;
  activities: Activity[];
  messages: GuestMessage[];
  settings: SiteSettings;
  onClose: () => void;
  onClearActivities: () => void;
  onDeleteMessage: (id: string) => void;
  onSaveSettings: (settings: SiteSettings, newPin?: string) => void;
  onOpenAddTrack: () => void;
  onOpenAddProduct: () => void;
  onOpenAddNews: () => void;
  onToast: (msg: string) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  metrics,
  activities,
  messages,
  settings,
  onClose,
  onClearActivities,
  onDeleteMessage,
  onSaveSettings,
  onOpenAddTrack,
  onOpenAddProduct,
  onOpenAddNews,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'messages' | 'settings'>('overview');
  const [activityFilter, setActivityFilter] = useState<string>('all');

  // Settings form states
  const [artistName, setArtistName] = useState(settings.artistName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [bio, setBio] = useState(settings.bio);
  const [currency, setCurrency] = useState(settings.currency);
  const [newPin, setNewPin] = useState('');

  if (!isOpen) return null;

  const filteredActivities =
    activityFilter === 'all'
      ? activities
      : activities.filter((a) => a.type === activityFilter);

  const handleExportCSV = () => {
    let csv = 'Timestamp,Guest,Type,Details\n';
    activities.forEach((a) => {
      csv += `"${a.timestamp}","${a.guest}","${a.type}","${a.detail.replace(/"/g, '""')}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uglydogsarecute_activity_log_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    onToast('Activity log exported to CSV!');
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(
      {
        ...settings,
        artistName,
        tagline,
        bio,
        currency,
      },
      newPin.trim() || undefined
    );
    setNewPin('');
    onToast('Settings saved successfully!');
  };

  const getBadgeStyle = (type: Activity['type']) => {
    switch (type) {
      case 'play':
        return 'bg-[#f36c21]/20 text-[#ff9f43] border-[#f36c21]/30';
      case 'shop':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'inquiry':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'admin':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-stone-500/20 text-stone-300 border-stone-500/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#14100c] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <BarChart2 className="w-5 h-5 text-[#f36c21]" />
            <h3 className="font-display font-extrabold text-xl text-white">
              Artist Control Center & Analytics
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 border-b border-white/10 bg-black/20 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-[#f36c21] text-[#ff9f43]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>General Stats</span>
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'activity'
                ? 'border-[#f36c21] text-[#ff9f43]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <ActivityIcon className="w-4 h-4" />
            <span>Individual Activity Logs</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'messages'
                ? 'border-[#f36c21] text-[#ff9f43]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Guest Messages ({messages.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'settings'
                ? 'border-[#f36c21] text-[#ff9f43]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Site Settings</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between text-stone-400 text-xs mb-2">
                    <span>Visitors</span>
                    <Users className="w-4 h-4 text-[#f36c21]" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-white">
                    {metrics.totalVisitors}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between text-stone-400 text-xs mb-2">
                    <span>Pageviews</span>
                    <Eye className="w-4 h-4 text-[#f36c21]" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-white">
                    {metrics.pageViews}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between text-stone-400 text-xs mb-2">
                    <span>Streams</span>
                    <PlayCircle className="w-4 h-4 text-[#f36c21]" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-white">
                    {metrics.trackPlays}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between text-stone-400 text-xs mb-2">
                    <span>Merch Views</span>
                    <ShoppingBag className="w-4 h-4 text-[#f36c21]" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-white">
                    {metrics.productViews}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between text-stone-400 text-xs mb-2">
                    <span>Inquiries</span>
                    <Receipt className="w-4 h-4 text-[#f36c21]" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-white">
                    {metrics.cartInquiries}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between text-stone-400 text-xs mb-2">
                    <span>Messages</span>
                    <Mail className="w-4 h-4 text-[#f36c21]" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-white">
                    {metrics.messagesReceived}
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/5">
                <h4 className="text-sm font-bold text-white mb-3">
                  Quick Content Actions
                </h4>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAddTrack();
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#f36c21] hover:bg-[#ff7b34] text-white text-xs font-bold transition-all shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload Track</span>
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAddProduct();
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Merch Item</span>
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAddNews();
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Post Update</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Activity Logs */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-stone-400 font-semibold">Filter:</label>
                  <select
                    value={activityFilter}
                    onChange={(e) => setActivityFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-[#16120e] border border-white/10 text-white text-xs focus:outline-none focus:border-[#f36c21]"
                  >
                    <option value="all">All Events</option>
                    <option value="play">Music Streams</option>
                    <option value="shop">Merchandise Views</option>
                    <option value="inquiry">Order Inquiries</option>
                    <option value="visit">Navigation & Visits</option>
                    <option value="admin">Admin Actions</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#ff9f43]" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={onClearActivities}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-xs font-semibold text-red-300 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Logs</span>
                  </button>
                </div>
              </div>

              {/* Activity Rows */}
              <div className="rounded-xl border border-white/10 bg-black/20 divide-y divide-white/5 max-h-96 overflow-y-auto">
                {filteredActivities.length === 0 ? (
                  <div className="p-8 text-center text-xs text-stone-500">
                    No activity entries recorded for this filter.
                  </div>
                ) : (
                  filteredActivities.map((act) => (
                    <div
                      key={act.id}
                      className="p-3.5 flex items-center gap-3 text-xs hover:bg-white/5 transition-colors"
                    >
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border shrink-0 ${getBadgeStyle(
                          act.type
                        )}`}
                      >
                        {act.type}
                      </span>
                      <span className="font-semibold text-white shrink-0">
                        {act.guest}
                      </span>
                      <span className="text-stone-300 flex-1 truncate">
                        {act.detail}
                      </span>
                      <span className="text-stone-500 shrink-0 font-mono text-[11px]">
                        {new Date(act.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Messages Inbox */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="p-12 text-center text-stone-400 text-xs">
                  Your message inbox is currently empty.
                </div>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{m.name}</span>
                        <span className="text-xs text-[#ff9f43] font-mono">
                          &lt;{m.email}&gt;
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-stone-500">{m.date}</span>
                        <button
                          onClick={() => onDeleteMessage(m.id)}
                          className="p-1 text-stone-500 hover:text-red-400 transition-colors"
                          title="Delete Message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] font-bold text-[#f36c21] uppercase tracking-wider">
                      Subject: {m.type}
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed whitespace-pre-wrap">
                      {m.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 4: Site Settings */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSettingsSubmit} className="space-y-4 max-w-xl">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                    Artist / Brand Name
                  </label>
                  <input
                    type="text"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                    Currency Symbol
                  </label>
                  <input
                    type="text"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    maxLength={3}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                  Tagline
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                  Artist Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21] resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                  Change Master PIN
                </label>
                <input
                  type="text"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Leave empty to keep current PIN"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#f36c21]"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#f36c21] hover:bg-[#ff7b34] text-white text-xs font-bold transition-all shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
