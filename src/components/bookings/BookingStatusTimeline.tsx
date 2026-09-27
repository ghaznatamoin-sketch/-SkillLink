'use client';

import React from 'react';
import { BookingTimelineEvent, JobStatus } from '@/types/booking';
import { CheckCircle2, Clock, PlayCircle, XCircle, AlertCircle } from 'lucide-react';

interface BookingStatusTimelineProps {
  timeline: BookingTimelineEvent[];
  currentStatus: JobStatus;
}

const STAGES: { status: JobStatus; label: string; desc: string }[] = [
  { status: 'requested', label: 'Booking Requested', desc: 'Request submitted to professional' },
  { status: 'accepted', label: 'Accepted by Pro', desc: 'Appointment confirmed' },
  { status: 'in_progress', label: 'Work In Progress', desc: 'Service execution on site' },
  { status: 'completed', label: 'Completed', desc: 'Service finished & verified' },
];

export const BookingStatusTimeline: React.FC<BookingStatusTimelineProps> = ({
  timeline,
  currentStatus,
}) => {
  const isRejected = currentStatus === 'rejected';
  const isCancelled = currentStatus === 'cancelled';

  const getStageIndex = (status: JobStatus) => {
    switch (status) {
      case 'requested':
        return 0;
      case 'accepted':
        return 1;
      case 'in_progress':
        return 2;
      case 'completed':
        return 3;
      default:
        return 0;
    }
  };

  const currentIdx = getStageIndex(currentStatus);

  if (isRejected || isCancelled) {
    return (
      <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/30 flex items-center gap-3 text-rose-300">
        <XCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
        <div>
          <h5 className="font-bold text-sm">
            Booking {isRejected ? 'Declined / Rejected' : 'Cancelled'}
          </h5>
          <p className="text-xs text-rose-300/80 mt-0.5">
            This booking was {isRejected ? 'declined by the service provider' : 'cancelled'}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-[#0e1714]/85 backdrop-blur-xl border border-emerald-500/20 shadow-xl shadow-black/40">
      <h4 className="font-bold text-slate-100 text-xs uppercase tracking-wider mb-6">
        Service Progress Tracker
      </h4>

      <div className="relative">
        {/* Progress Bar Line */}
        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-emerald-950 -z-0" />

        <div className="space-y-6">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentIdx || currentStatus === 'completed';
            const isCurrent = idx === currentIdx && currentStatus !== 'completed';
            const isUpcoming = idx > currentIdx;

            const eventData = timeline.find((t) => t.status === stage.status);

            return (
              <div key={stage.status} className="relative z-10 flex items-start gap-4">
                {/* Node Icon */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                      : isCurrent
                      ? 'bg-[#0e1714] border-amber-400 text-amber-400 ring-4 ring-amber-400/20'
                      : 'bg-[#121f19] border-emerald-900 text-slate-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-900"></span>
                  )}
                </div>

                {/* Stage Info */}
                <div className="flex-1 -mt-0.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h5
                      className={`text-xs font-bold ${
                        isCompleted || isCurrent ? 'text-slate-100' : 'text-slate-500'
                      }`}
                    >
                      {stage.label}
                    </h5>

                    {eventData && (
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(eventData.timestamp).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {eventData?.note || stage.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
