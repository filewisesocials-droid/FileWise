import React, { useState, useEffect } from 'react';
import { Search, MapPin, Download, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { OrderTrackItem } from '../types';
import { INITIAL_TRACKING_ORDERS } from '../data/tracking';

interface TrackingViewProps {
  initialTrackId?: string;
  onStartNewInquiry?: () => void;
}

export const TrackingView: React.FC<TrackingViewProps> = ({ initialTrackId = 'FW-98214', onStartNewInquiry }) => {
  const [trackInput, setTrackInput] = useState(initialTrackId);
  const [currentOrder, setCurrentOrder] = useState<OrderTrackItem | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOrder = async (id: string) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/track/${id}`);
      const data = await res.json();
      if (data.success) {
        setCurrentOrder(data.order);
      } else {
        const local = INITIAL_TRACKING_ORDERS.find(o => o.id === id.toUpperCase());
        if (local) {
          setCurrentOrder(local);
        } else {
          setCurrentOrder(null);
          setErrorMsg(data.message || `No order found with code ${id}`);
        }
      }
    } catch (err) {
      console.error(err);
      const local = INITIAL_TRACKING_ORDERS.find(o => o.id === id.toUpperCase());
      if (local) {
        setCurrentOrder(local);
      } else {
        setErrorMsg(`Order reference ${id} not found.`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialTrackId) {
      setTrackInput(initialTrackId);
      fetchOrder(initialTrackId);
    }
  }, [initialTrackId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim()) {
      fetchOrder(trackInput.trim());
    }
  };

  return (
    <section className="py-12 bg-[#faf8f5] text-[#2b241d] min-h-[700px] font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-[#f4ecd9] border border-[#c8a46b]/50 text-[#7a5418] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xs mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#b48332]" />
            <span>South African Consular &amp; Legalisation Status</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#2b241d]">
            Track Application Status
          </h2>
          <p className="text-[#5c5044] text-sm mt-2">
            Real-time stage updates from Pretoria DIRCO submissions, Foreign Embassy attestations, and consular verification.
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="bg-white border-2 border-[#c8a46b]/40 rounded-2xl p-6 shadow-sm mb-8"
        >
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#8c7b6d]" />
              <input
                type="text"
                placeholder="Enter Filewise Order Ref (e.g. FW-98214 or FW-74309)..."
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
                className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 text-[#2b241d] text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#b48332] focus:bg-white font-mono font-medium placeholder-[#8c7b6d]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#b48332] hover:bg-[#9f7228] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 border border-[#9a6d23]"
            >
              <Search className="w-4 h-4" />
              <span>Track Reference</span>
            </button>
          </form>

          {/* Quick Demo Code Buttons */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#5c5044]">
            <span className="font-medium">Demo Codes:</span>
            <button
              onClick={() => { setTrackInput('FW-98214'); fetchOrder('FW-98214'); }}
              className="bg-[#fbf9f5] hover:bg-[#f4ecd9] text-[#7a5418] font-mono font-bold px-2.5 py-1 rounded-lg border border-[#c8a46b]/40 transition-colors shadow-2xs"
            >
              FW-98214 (SA to UAE)
            </button>

            <button
              onClick={() => { setTrackInput('FW-74309'); fetchOrder('FW-74309'); }}
              className="bg-[#fbf9f5] hover:bg-[#f4ecd9] text-[#7a5418] font-mono font-bold px-2.5 py-1 rounded-lg border border-[#c8a46b]/40 transition-colors shadow-2xs"
            >
              FW-74309 (SA to Spain)
            </button>
          </div>
        </motion.div>

        {/* Error message */}
        {errorMsg && (
          <div className="bg-[#fbf5eb] border border-[#c8a46b] rounded-2xl p-6 text-center text-[#7a5418] space-y-2 mb-8 shadow-sm">
            <AlertCircle className="w-8 h-8 text-[#b48332] mx-auto" />
            <h3 className="font-serif font-bold text-[#2b241d] text-base">Order Not Found</h3>
            <p className="text-xs text-[#5c5044]">{errorMsg}</p>
          </div>
        )}

        {/* Live Order Card */}
        {currentOrder && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-2 border-[#c8a46b] rounded-2xl p-6 sm:p-8 shadow-sm space-y-8"
          >
            
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#ebdcc4]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold bg-[#f4ecd9] text-[#7a5418] px-3 py-1 rounded-full border border-[#c8a46b]/60">
                    REF: {currentOrder.id}
                  </span>
                  <span className="text-xs text-[#8c7b6d]">Logged: {currentOrder.createdDate}</span>
                </div>
                
                <h3 className="text-xl font-serif font-bold text-[#2b241d] mt-2">
                  {currentOrder.originCountry} <ArrowRight className="inline w-4 h-4 text-[#b48332] mx-1" /> {currentOrder.destinationCountry}
                </h3>
                <p className="text-xs text-[#5c5044] mt-1">{currentOrder.documentSummary}</p>
              </div>

              <div className="text-left md:text-right">
                <span className="text-[10px] text-[#8c7b6d] block uppercase font-mono font-bold">Status</span>
                <span className="text-xs font-bold text-[#7a5418] bg-[#fbf5eb] px-3 py-1 rounded-full border border-[#c8a46b]/40 inline-block mt-1">
                  {currentOrder.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-[#2e7d32] font-semibold block mt-1">
                  Est. Delivery: {currentOrder.estimatedCompletion}
                </span>
              </div>
            </div>

            {/* Stage Progress Timeline */}
            <div>
              <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#8c7b6d] mb-6">
                Consular Processing Stages:
              </h4>

              <div className="relative border-l-2 border-[#c8a46b]/30 ml-4 pl-6 space-y-8">
                {currentOrder.steps.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle marker */}
                    <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                      step.completed
                        ? 'bg-[#2e7d32] text-white border-[#2e7d32]'
                        : step.current
                        ? 'bg-[#b48332] text-white border-[#9a6d23] ring-4 ring-[#f4ecd9]'
                        : 'bg-white text-[#8c7b6d] border-[#ebdcc4]'
                    }`}>
                      {step.completed ? '✓' : idx + 1}
                    </div>

                    <div className="bg-[#fbf9f5] p-4 rounded-xl border border-[#ebdcc4]">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h5 className={`font-bold text-sm ${step.current ? 'text-[#2b241d]' : step.completed ? 'text-[#2b241d]' : 'text-[#8c7b6d]'}`}>
                          {step.title}
                        </h5>
                        {step.date && (
                          <span className="text-[10px] text-[#8c7b6d] font-mono font-medium">{step.date}</span>
                        )}
                      </div>

                      {step.location && (
                        <p className="text-xs text-[#7a5418] flex items-center gap-1 mt-1 font-semibold">
                          <MapPin className="w-3 h-3 text-[#b48332]" /> {step.location}
                        </p>
                      )}

                      {step.notes && (
                        <p className="text-xs text-[#5c5044] mt-1.5 leading-relaxed">{step.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Courier & Security details */}
            <div className="pt-6 border-t border-[#ebdcc4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[#8c7b6d] block">Courier Delivery Details:</span>
                <span className="font-mono text-[#2b241d] font-bold">{currentOrder.courierName} • #{currentOrder.trackingNumber}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert(`Verification certificate for ${currentOrder.id} generated.`)}
                  className="bg-[#f4ecd9] hover:bg-[#ebe0c8] text-[#5c3e0e] font-bold px-4 py-2.5 rounded-xl border border-[#c8a46b] flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Download className="w-4 h-4 text-[#b48332]" /> Download Status Report
                </button>
              </div>
            </div>

          </motion.div>
        )}

      </div>
    </section>
  );
};
