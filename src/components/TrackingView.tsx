import React, { useState, useEffect } from 'react';
import { Truck, Search, CheckCircle2, Clock, MapPin, FileCheck, ShieldCheck, Download, AlertCircle, ArrowRight } from 'lucide-react';
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
        // Fallback local check
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
    <section className="py-12 bg-slate-50 text-slate-900 min-h-[700px]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold mb-3 border border-blue-200">
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            <span>Live Consular Tracking Portal</span>
          </div>
          <h2 className="text-3xl font-extrabold font-sans text-slate-900">
            Track Your Document Legalisation Order
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Real-time status updates from Notary authentication, FCDO/Apostille stamping, to Embassy legalization.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Filewise Order Ref (e.g. FW-98214 or FW-74309)..."
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 font-mono font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Track Application</span>
            </button>
          </form>

          {/* Quick Demo Code Buttons */}
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <span>Demo Codes:</span>
            <button
              onClick={() => { setTrackInput('FW-98214'); fetchOrder('FW-98214'); }}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-mono font-bold px-2.5 py-1 rounded-lg border border-blue-200"
            >
              FW-98214 (SA to UAE)
            </button>

            <button
              onClick={() => { setTrackInput('FW-74309'); fetchOrder('FW-74309'); }}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-mono font-bold px-2.5 py-1 rounded-lg border border-emerald-200"
            >
              FW-74309 (SA to Spain)
            </button>
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center text-amber-900 space-y-2 mb-8">
            <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
            <h3 className="font-bold text-slate-900 text-base">Order Not Found</h3>
            <p className="text-xs text-slate-600">{errorMsg}</p>
          </div>
        )}

        {/* Live Order Card */}
        {currentOrder && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl space-y-8">
            
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                    ORDER REF: {currentOrder.id}
                  </span>
                  <span className="text-xs text-slate-500">Created: {currentOrder.createdDate}</span>
                </div>
                
                <h3 className="text-xl font-extrabold font-sans text-slate-900 mt-2">
                  {currentOrder.originCountry} <ArrowRight className="inline w-4 h-4 text-blue-600 mx-1" /> {currentOrder.destinationCountry}
                </h3>
                <p className="text-xs text-slate-600 mt-1">{currentOrder.documentSummary}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-mono font-bold">Status</span>
                <span className="text-sm font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200 inline-block mt-1">
                  {currentOrder.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-emerald-600 font-semibold block mt-1">
                  Est. Delivery: {currentOrder.estimatedCompletion}
                </span>
              </div>
            </div>

            {/* Stage Progress Timeline */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
                Consular Processing Stages:
              </h4>

              <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-8">
                {currentOrder.steps.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle marker */}
                    <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                      step.completed
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : step.current
                        ? 'bg-blue-600 text-white border-blue-600 ring-4 ring-blue-100 animate-pulse'
                        : 'bg-white text-slate-400 border-slate-200'
                    }`}>
                      {step.completed ? '✓' : idx + 1}
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h5 className={`font-bold text-sm ${step.current ? 'text-blue-600' : step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step.title}
                        </h5>
                        {step.date && (
                          <span className="text-[10px] text-slate-400 font-mono font-medium">{step.date}</span>
                        )}
                      </div>

                      {step.location && (
                        <p className="text-xs text-blue-600 flex items-center gap-1 mt-1 font-semibold">
                          <MapPin className="w-3 h-3" /> {step.location}
                        </p>
                      )}

                      {step.notes && (
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{step.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Courier & Security details */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 block">Courier Delivery Reference:</span>
                <span className="font-mono text-blue-600 font-bold">{currentOrder.courierName} • #{currentOrder.trackingNumber}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert(`Official verification certificate for ${currentOrder.id} generated.`)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl border border-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4 text-slate-600" /> Download Status Report PDF
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
