'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Send, CheckCheck } from 'lucide-react';

export default function WorkerMessagesPage() {
  const { user } = useAuth();
  const { chatThreads, sendMessage } = useMarketplace();

  const [activeThreadId, setActiveThreadId] = useState<string>(
    chatThreads[0]?.id || ''
  );
  const [replyText, setReplyText] = useState<string>('');

  const activeThread = chatThreads.find((t) => t.id === activeThreadId) || chatThreads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThread) return;

    sendMessage(
      activeThread.id,
      replyText.trim(),
      user?.id || 'prov-rafael-costa',
      user?.name || 'Rafael Costa',
      'worker'
    );
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-emerald-900/30">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
          Customer Inquiries & Messages
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Coordinate timing, directions, and part requirements with clients.
        </p>
      </div>

      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 shadow-xl shadow-black/40 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
        {/* Thread List */}
        <div className="md:col-span-4 border-r border-emerald-900/30 flex flex-col bg-[#0a1410]/50">
          <div className="p-4 border-b border-emerald-900/30 bg-[#0c1712]">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Client Threads ({chatThreads.length})
            </h3>
          </div>

          <div className="divide-y divide-emerald-900/30 overflow-y-auto flex-1 max-h-[500px]">
            {chatThreads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                    isActive ? 'bg-emerald-950/60 border-l-4 border-emerald-500' : 'hover:bg-[#121f19]/60'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#121f19] overflow-hidden flex-shrink-0 border border-emerald-500/30 flex items-center justify-center font-bold text-amber-300 text-xs">
                    {thread.participantCustomer.avatarUrl ? (
                      <img
                        src={thread.participantCustomer.avatarUrl}
                        alt={thread.participantCustomer.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      thread.participantCustomer.name.charAt(0)
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-slate-100 text-xs truncate">
                        {thread.participantCustomer.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {thread.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-[11px] text-emerald-400 font-medium truncate">
                      {thread.serviceTitle}
                    </p>

                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {thread.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Stream */}
        {activeThread ? (
          <div className="md:col-span-8 flex flex-col justify-between h-full bg-[#0e1714]/40">
            <div className="p-4 border-b border-emerald-900/30 bg-[#0c1712] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#121f19] overflow-hidden border border-emerald-500/30 flex items-center justify-center font-bold text-amber-300 text-xs flex-shrink-0">
                {activeThread.participantCustomer.avatarUrl ? (
                  <img
                    src={activeThread.participantCustomer.avatarUrl}
                    alt={activeThread.participantCustomer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  activeThread.participantCustomer.name.charAt(0)
                )}
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm">
                  {activeThread.participantCustomer.name}
                </h4>
                <p className="text-[11px] text-slate-400">
                  Customer · {activeThread.serviceTitle}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 max-h-[400px]">
              {activeThread.messages.map((msg) => {
                const isMe = msg.senderRole === 'worker';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md ${
                        isMe
                          ? 'bg-gradient-to-r from-emerald-800 to-emerald-700 text-white rounded-br-xs border border-emerald-500/30'
                          : 'bg-[#121f19] text-slate-200 border border-emerald-900/40 rounded-bl-xs'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 px-1">
                      {msg.timestamp}
                      {isMe && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                    </span>
                  </div>
                );
              })}
            </div>

            <form
              onSubmit={handleSend}
              className="p-3 sm:p-4 bg-[#0c1712] border-t border-emerald-900/30 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Reply to customer..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold text-xs border border-emerald-500/30 transition-all disabled:opacity-40 flex items-center gap-1.5 shadow-md"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}

