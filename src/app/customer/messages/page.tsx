'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { MessageSquare, Send, User, CheckCheck, Clock } from 'lucide-react';

export default function CustomerMessagesPage() {
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
      user?.id || 'cust-amara',
      user?.name || 'Amara Bello',
      'customer'
    );
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Direct Messages
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Communicate with your assigned service professionals in real-time.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
        {/* Thread List (Left 4-5 Cols) */}
        <div className="md:col-span-4 border-r border-slate-200/80 flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Conversations ({chatThreads.length})
            </h3>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1 max-h-[500px]">
            {chatThreads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                    isActive ? 'bg-emerald-50/80 border-l-4 border-emerald-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                    {thread.participantWorker.avatarUrl ? (
                      <img
                        src={thread.participantWorker.avatarUrl}
                        alt={thread.participantWorker.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-slate-500">
                        {thread.participantWorker.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-slate-900 text-xs truncate">
                        {thread.participantWorker.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {thread.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-[11px] text-emerald-700 font-medium truncate">
                      {thread.serviceTitle}
                    </p>

                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {thread.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Area (Right 7-8 Cols) */}
        {activeThread ? (
          <div className="md:col-span-8 flex flex-col justify-between h-full bg-slate-50/30">
            {/* Thread Header */}
            <div className="p-4 border-b border-slate-200/80 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                  {activeThread.participantWorker.avatarUrl ? (
                    <img
                      src={activeThread.participantWorker.avatarUrl}
                      alt={activeThread.participantWorker.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-slate-600">
                      {activeThread.participantWorker.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {activeThread.participantWorker.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {activeThread.participantWorker.title || 'Verified Specialist'} · {activeThread.serviceTitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 max-h-[400px]">
              {activeThread.messages.map((msg) => {
                const isMe = msg.senderRole === 'customer';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                        isMe
                          ? 'bg-emerald-700 text-white rounded-br-xs'
                          : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 px-1">
                      {msg.timestamp}
                      {isMe && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSend}
              className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Type your message to the specialist..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-all disabled:opacity-40 flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="md:col-span-8 p-12 text-center text-xs text-slate-400 flex items-center justify-center">
            Select a conversation thread to view messages.
          </div>
        )}
      </div>
    </div>
  );
}
