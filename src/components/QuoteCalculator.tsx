import React, { useState, useMemo } from 'react';
import { Calculator, CheckCircle2, ShieldCheck, Clock, FileText, ArrowRight, Upload, Plus, Trash2, Download, AlertCircle, Truck, DollarSign, Check } from 'lucide-react';
import { COUNTRIES, getCountryByCode } from '../data/countries';
import { DOCUMENT_TYPES, calculateRequirement } from '../data/documents';
import { Country, DocumentTypeInfo } from '../types';

interface QuoteCalculatorProps {
  initialOriginCode?: string;
  initialDestCode?: string;
  onOrderCreated?: (trackId: string) => void;
}

interface SelectedDocument {
  typeId: string;
  quantity: number;
  fileName?: string;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({
  initialOriginCode = 'GB',
  initialDestCode = 'AE',
  onOrderCreated
}) => {
  const [originCode, setOriginCode] = useState(initialOriginCode);
  const [destCode, setDestCode] = useState(initialDestCode);
  
  const [selectedDocs, setSelectedDocs] = useState<SelectedDocument[]>([
    { typeId: 'degree_diploma', quantity: 1 }
  ]);

  const [speed, setSpeed] = useState<'STANDARD' | 'EXPRESS' | 'SUPER_EXPRESS'>('STANDARD');
  const [needTranslation, setNeedTranslation] = useState(false);
  const [translationPages, setTranslationPages] = useState(1);
  const [needSolicitor, setNeedSolicitor] = useState(true);
  const [needReturnCourier, setNeedReturnCourier] = useState(true);

  // Customer Contact Info for Order Creation
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderCreatedSuccess, setOrderCreatedSuccess] = useState<string | null>(null);

  // Upload state
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);

  const originCountry = useMemo(() => getCountryByCode(originCode), [originCode]);
  const destCountry = useMemo(() => getCountryByCode(destCode), [destCode]);
  const requirement = useMemo(() => calculateRequirement(originCountry, destCountry), [originCountry, destCountry]);

  // Pricing calculations
  const totalDocQty = selectedDocs.reduce((sum, item) => sum + item.quantity, 0);

  const baseDocFees = useMemo(() => {
    return selectedDocs.reduce((sum, item) => {
      const info = DOCUMENT_TYPES.find(d => d.id === item.typeId) || DOCUMENT_TYPES[0];
      return sum + (info.typicalFeeZAR * item.quantity);
    }, 0);
  }, [selectedDocs]);

  const speedMultiplierFee = speed === 'SUPER_EXPRESS' ? 2520 : speed === 'EXPRESS' ? 1170 : 0;
  const translationTotal = needTranslation ? translationPages * Math.max(originCountry.translationFeePerPageZAR, destCountry.translationFeePerPageZAR) : 0;
  const solicitorTotal = needSolicitor ? originCountry.solicitorFeeZAR * totalDocQty : 0;
  
  const govtFee = requirement.isHagueToHague
    ? originCountry.apostilleFeeZAR * totalDocQty
    : (originCountry.apostilleFeeZAR + destCountry.embassyAttestationFeeZAR) * totalDocQty;

  const courierFee = needReturnCourier ? 810 : 0;

  const grandTotal = baseDocFees + speedMultiplierFee + translationTotal + solicitorTotal + govtFee + courierFee;

  const estimatedDays = speed === 'SUPER_EXPRESS' ? 2 : speed === 'EXPRESS' ? requirement.totalEstimatedDaysExpress : requirement.totalEstimatedDaysStandard;

  const handleAddDoc = () => {
    setSelectedDocs([...selectedDocs, { typeId: 'police_clearance', quantity: 1 }]);
  };

  const handleRemoveDoc = (index: number) => {
    if (selectedDocs.length > 1) {
      const next = [...selectedDocs];
      next.splice(index, 1);
      setSelectedDocs(next);
    }
  };

  const handleDocTypeChange = (index: number, typeId: string) => {
    const next = [...selectedDocs];
    next[index].typeId = typeId;
    setSelectedDocs(next);
  };

  const handleDocQtyChange = (index: number, quantity: number) => {
    const next = [...selectedDocs];
    next[index].quantity = Math.max(1, quantity);
    setSelectedDocs(next);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFiles(prev => [
        ...prev,
        { name: file.name, size: `${(file.size / 1024 / 1024).toFixed(2)} MB` }
      ]);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim()) {
      alert('Please enter your full name and contact email.');
      return;
    }

    const randomTrackId = `FW-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderCreatedSuccess(randomTrackId);

    if (onOrderCreated) {
      onOrderCreated(randomTrackId);
    }
  };

  return (
    <section className="py-12 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold mb-3 border border-blue-200">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>Instant Document Legalisation Cost Estimator</span>
          </div>
          <h2 className="text-3xl font-extrabold font-sans text-slate-900">
            Calculate Legalisation Fees & Order Apostille
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Configure document types, speed options, sworn translations, and generate an official breakdown receipt.
          </p>
        </div>

        {orderCreatedSuccess ? (
          /* Order Confirmation Screen */
          <div className="max-w-2xl mx-auto bg-white border border-emerald-200 rounded-2xl p-8 text-center space-y-6 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold uppercase text-emerald-700 tracking-wider">Application Submitted</span>
              <h3 className="text-2xl font-bold font-sans text-slate-900 mt-1">Legalisation Order Confirmed</h3>
              <p className="text-slate-600 text-sm mt-2">
                Your tracking reference number is: <strong className="text-blue-600 font-mono text-base px-2 py-1 bg-blue-50 rounded border border-blue-200">{orderCreatedSuccess}</strong>
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Customer Name:</span>
                <span className="font-semibold text-slate-900">{customerName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Route:</span>
                <span className="font-semibold text-blue-600">{originCountry.name} ➔ {destCountry.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Total Estimate:</span>
                <span className="font-bold text-slate-900 font-mono">R${grandTotal.toLocaleString()} ZAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Est. Processing Time:</span>
                <span className="font-semibold text-slate-700">~{estimatedDays} business days</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  if (onOrderCreated) onOrderCreated(orderCreatedSuccess);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md shadow-blue-200"
              >
                Track Live Progress ({orderCreatedSuccess})
              </button>

              <button
                onClick={() => setOrderCreatedSuccess(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium px-4 py-3 rounded-xl border border-slate-200"
              >
                Calculate Another Order
              </button>
            </div>
          </div>
        ) : (
          /* Main Calculator Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Selection Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Country Pair */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">1</span>
                  <span>Select Issuing & Destination Countries</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1.5 font-medium">Document Origin</label>
                    <select
                      value={originCode}
                      onChange={(e) => setOriginCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 font-medium"
                    >
                      {COUNTRIES.map(c => (
                        <option key={`q-origin-${c.code}`} value={c.code}>
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1.5 font-medium">Target Destination</label>
                    <select
                      value={destCode}
                      onChange={(e) => setDestCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 font-medium"
                    >
                      {COUNTRIES.map(c => (
                        <option key={`q-dest-${c.code}`} value={c.code}>
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs flex items-center justify-between text-slate-700">
                  <span>Protocol: <strong className="text-blue-600">{requirement.isHagueToHague ? 'Hague Apostille' : 'Embassy Attestation'}</strong></span>
                  <span className="text-slate-500">Std turn: ~{requirement.totalEstimatedDaysStandard} days</span>
                </div>
              </div>

              {/* Step 2: Document Selection */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">2</span>
                    <span>Document Types & Quantities</span>
                  </h3>

                  <button
                    onClick={handleAddDoc}
                    className="text-xs bg-slate-100 hover:bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg border border-slate-200 font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Document
                  </button>
                </div>

                <div className="space-y-3">
                  {selectedDocs.map((doc, idx) => (
                    <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <label className="block text-[10px] text-slate-400 font-semibold uppercase mb-1">Document {idx + 1}</label>
                        <select
                          value={doc.typeId}
                          onChange={(e) => handleDocTypeChange(idx, e.target.value)}
                          className="w-full bg-white border border-slate-200 text-slate-900 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 font-medium"
                        >
                          {DOCUMENT_TYPES.map(d => (
                            <option key={d.id} value={d.id}>
                              [{d.category}] {d.name} (R${d.typicalFeeZAR.toLocaleString()} ZAR)
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div>
                          <label className="block text-[10px] text-slate-400 font-semibold uppercase mb-1">Qty</label>
                          <input
                            type="number"
                            min={1}
                            max={20}
                            value={doc.quantity}
                            onChange={(e) => handleDocQtyChange(idx, parseInt(e.target.value) || 1)}
                            className="w-16 bg-white border border-slate-200 text-slate-900 text-xs font-bold rounded-lg px-2 py-2 text-center"
                          />
                        </div>

                        {selectedDocs.length > 1 && (
                          <button
                            onClick={() => handleRemoveDoc(idx)}
                            className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-200 transition-colors mt-3 sm:mt-0"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Speed & Add-ons */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">3</span>
                  <span>Processing Speed & Options</span>
                </h3>

                {/* Speed selector */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSpeed('STANDARD')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      speed === 'STANDARD'
                        ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-100'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">Standard Service</div>
                    <div className="text-[11px] text-slate-500 mt-1">~{requirement.totalEstimatedDaysStandard} Business Days</div>
                    <div className="text-xs font-mono font-bold text-emerald-600 mt-2">Included (R0)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpeed('EXPRESS')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      speed === 'EXPRESS'
                        ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-100'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900 flex items-center justify-between">
                      <span>Express Service</span>
                      <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-mono font-bold">FAST</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">~{requirement.totalEstimatedDaysExpress} Business Days</div>
                    <div className="text-xs font-mono font-bold text-blue-600 mt-2">+R1,170 ZAR</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpeed('SUPER_EXPRESS')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      speed === 'SUPER_EXPRESS'
                        ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-100'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900 flex items-center justify-between">
                      <span>Same-Day / 24h</span>
                      <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-mono font-bold">URGENT</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">1-2 Business Days</div>
                    <div className="text-xs font-mono font-bold text-blue-600 mt-2">+R2,520 ZAR</div>
                  </button>
                </div>

                {/* Additional services checkboxes */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200 cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={needTranslation}
                        onChange={(e) => setNeedTranslation(e.target.checked)}
                        className="w-4 h-4 accent-blue-600 rounded"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900">Sworn Certified Translation</span>
                        <p className="text-[11px] text-slate-500">Official certified translation into target language</p>
                      </div>
                    </div>
                    {needTranslation && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-500">Pages:</span>
                        <input
                          type="number"
                          min={1}
                          max={50}
                          value={translationPages}
                          onChange={(e) => setTranslationPages(parseInt(e.target.value) || 1)}
                          className="w-14 bg-white border border-slate-200 text-xs text-slate-900 font-bold text-center py-1 rounded"
                        />
                      </div>
                    )}
                  </label>

                  <label className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200 cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={needSolicitor}
                        onChange={(e) => setNeedSolicitor(e.target.checked)}
                        className="w-4 h-4 accent-blue-600 rounded"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900">Notary Public / Solicitor Certification</span>
                        <p className="text-[11px] text-slate-500">Verified by practicing law society notary (R{originCountry.solicitorFeeZAR}/doc)</p>
                      </div>
                    </div>
                    <span className="text-xs text-blue-600 font-mono font-bold">+R{(originCountry.solicitorFeeZAR * totalDocQty).toLocaleString()}</span>
                  </label>

                  <label className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200 cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={needReturnCourier}
                        onChange={(e) => setNeedReturnCourier(e.target.checked)}
                        className="w-4 h-4 accent-blue-600 rounded"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900">DHL Express Secure Courier Return</span>
                        <p className="text-[11px] text-slate-500">Tracked worldwide door-to-door delivery</p>
                      </div>
                    </div>
                    <span className="text-xs text-blue-600 font-mono font-bold">+R810</span>
                  </label>
                </div>

              </div>

              {/* Step 4: Optional Scan Upload */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">4</span>
                  <span>Upload Document Scan / Copy (Optional)</span>
                </h3>

                <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-5 text-center bg-slate-50 transition-colors">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-700 font-semibold">Drag & drop your document scan or click to browse</p>
                  <p className="text-[10px] text-slate-400 mt-1">PDF, PNG, JPG up to 25MB (Encrypted high-security vault)</p>
                  
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="doc-file-upload"
                  />
                  <label
                    htmlFor="doc-file-upload"
                    className="mt-3 inline-block bg-white hover:bg-slate-100 text-blue-600 text-xs font-bold px-4 py-2 rounded-lg cursor-pointer border border-slate-200 shadow-sm"
                  >
                    Browse Local File
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-1 text-xs">
                    <span className="text-slate-500 font-medium">Uploaded Files:</span>
                    {uploadedFiles.map((f, idx) => (
                      <div key={idx} className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 flex justify-between font-medium">
                        <span className="truncate">{f.name}</span>
                        <span className="text-slate-400 font-mono text-[10px]">{f.size}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Instant Live Summary & Checkout */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg space-y-6">
                
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Estimated Order Summary</span>
                  <h3 className="text-xl font-extrabold font-sans text-slate-900 mt-1">
                    {originCountry.flag} {originCountry.name} ➔ {destCountry.flag} {destCountry.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Protocol: {requirement.isHagueToHague ? 'Hague Apostille' : 'Embassy Consular Attestation'}
                  </p>
                </div>

                {/* Breakdown List */}
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Document Processing ({totalDocQty} doc/s):</span>
                    <span className="font-mono font-semibold text-slate-900">R${baseDocFees.toLocaleString()} ZAR</span>
                  </div>

                  {solicitorTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Solicitor / Notary Certification:</span>
                      <span className="font-mono font-semibold text-slate-900">R${solicitorTotal.toLocaleString()} ZAR</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-slate-500">Government & Embassy Legalisation Fees:</span>
                    <span className="font-mono font-semibold text-slate-900">R${govtFee.toLocaleString()} ZAR</span>
                  </div>

                  {speedMultiplierFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Express Priority Surcharge ({speed}):</span>
                      <span className="font-mono font-bold text-blue-600">R${speedMultiplierFee.toLocaleString()} ZAR</span>
                    </div>
                  )}

                  {translationTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Sworn Translation ({translationPages} pg/s):</span>
                      <span className="font-mono font-semibold text-slate-900">R${translationTotal.toLocaleString()} ZAR</span>
                    </div>
                  )}

                  {courierFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">DHL Express Tracked Courier:</span>
                      <span className="font-mono font-semibold text-slate-900">R${courierFee.toLocaleString()} ZAR</span>
                    </div>
                  )}
                </div>

                {/* Total Cost Display */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Total Estimated Cost:</span>
                    <span className="text-2xl font-extrabold text-blue-600 font-mono">R${grandTotal.toLocaleString()} ZAR</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Estimated Completion:</span>
                    <span className="font-bold text-emerald-600">~{estimatedDays} business days</span>
                  </div>
                </div>

                {/* Order Submission Form */}
                <form onSubmit={handleSubmitOrder} className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Submit & Book Legalisation</h4>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name (e.g. Sarah Jenkins)"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 text-xs font-medium rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 placeholder-slate-400"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Contact Email Address"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 text-xs font-medium rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 placeholder-slate-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-xl shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Proceed & Generate Order Ref</span>
                  </button>

                  <p className="text-[10px] text-center text-slate-400">
                    100% Guarantee of Embassy Acceptance • Encrypted Data Security
                  </p>
                </form>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
