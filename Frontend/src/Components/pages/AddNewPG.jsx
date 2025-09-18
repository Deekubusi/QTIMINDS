// AddNewPG.jsx
import { useEffect, useState } from "react";

// --- Helper Components (Defined outside to prevent re-renders) ---

const SectionTitle = ({ children }) => <h3 className="text-sm font-semibold text-gray-900 mb-3">{children}</h3>;
const Input = (props) => <input {...props} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#3D63EA]" />;
const Textarea = (props) => <textarea {...props} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#3D63EA]" />;
const Select = (props) => <select {...props} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#3D63EA]" />;

const CharacterCounter = ({ value, maxLength }) => (
  <div className="text-xs text-right text-gray-500 mt-1">
    {value.length} / {maxLength}
  </div>
);

// --- Main Modal Component ---

export default function AddNewPGModal({ open, onClose, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [form, setForm] = useState({
    pgName: "",
    shortDescription: "",
    totalRooms: "",
    totalBeds: "",
    amenities: { ac: false, wifi: false, meals: false, laundry: false },
    assignManager: "",
    defaultRent: "",
    bedsAvailable: "",
    complianceFiles: [],
    photos: [],
  });

  const [managers, setManagers] = useState([]);
  const [loadingManagers, setLoadingManagers] = useState(false);

  // Load manager list from backend
  useEffect(() => {
    if (!open) return;
    let mounted = true;
    async function loadManagers() {
      setLoadingManagers(true);
      try {
        // MOCK API CALL - In a real app, replace this with your actual API endpoint
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        const mockData = [
          { id: "mgr_1", name: "Rahul Sharma" },
          { id: "mgr_2", name: "Priya Singh" },
          { id: "mgr_3", name: "Amit Kumar" },
        ];
        if (mounted) setManagers(mockData);
      } catch (err) {
        console.error("Could not load managers:", err);
        if (mounted) setManagers([]);
      } finally {
        if (mounted) setLoadingManagers(false);
      }
    }
    loadManagers();
    return () => { mounted = false; };
  }, [open]);

  // General hooks
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose?.(); }
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return form.pgName.trim() !== "" && form.shortDescription.trim() !== "";
      case 2:
        const isNumericRooms = /^\d+$/.test(form.totalRooms);
        const isNumericBeds = /^\d+$/.test(form.totalBeds);
        const anyAmenityChecked = Object.values(form.amenities).some(v => v === true);
        return isNumericRooms && isNumericBeds && anyAmenityChecked;
      case 3:
        const isNumericRent = /^\d+$/.test(form.defaultRent);
        const isNumericBedsAvailable = /^\d+$/.test(form.bedsAvailable);
        return form.assignManager !== "" && isNumericRent && isNumericBedsAvailable;
      case 4:
        return form.complianceFiles.length > 0 && form.photos.length >= 3;
      default:
        return false;
    }
  };
  
  if (!open) return null;

  const update = (key, value, maxLength) => {
    if (maxLength === undefined || value.length <= maxLength) {
      setForm(f => ({ ...f, [key]: value }));
    }
  };
  const toggleAmenity = k => setForm(f => ({ ...f, amenities: { ...f.amenities, [k]: !f.amenities[k] } }));
  
  const handleFileChange = (key, maxFiles) => e => {
    const newFiles = Array.from(e.target.files || []);
    setForm(f => {
      const existingFiles = f[key] || [];
      if (maxFiles && existingFiles.length + newFiles.length > maxFiles) {
        alert(`You can only upload a maximum of ${maxFiles} files.`);
        return f;
      }
      return { ...f, [key]: [...existingFiles, ...newFiles] };
    });
  };

  const removeFile = (key, index) => setForm(f => ({ ...f, [key]: f[key].filter((_, i) => i !== index) }));

  const nextStep = () => { if (isStepValid()) setCurrentStep(p => p + 1); };
  const prevStep = () => setCurrentStep(p => p - 1);
  
  const handleCreate = (e) => {
    e.preventDefault();
    if (!isStepValid()) {
      alert("Please ensure all mandatory fields are filled correctly.");
      return;
    }
    const payload = {
      ...form,
      photos: form.photos.map(f => f.name),
      complianceFiles: form.complianceFiles.map(f => f.name),
    };
    onSubmit?.(payload);
    onClose();
  };
  
  const baseButtonStyles = "px-4 py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";
  const primaryButtonStyles = "bg-[#605BFF] text-white hover:bg-[#5048e6] disabled:bg-gray-300 disabled:cursor-not-allowed";
  const secondaryButtonStyles = "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 focus:ring-gray-400";

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog">
      <form onSubmit={handleCreate} className="w-full max-w-4xl rounded-2xl bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Add New PG</h2>
          <button type="button" onClick={onClose} className="h-9 w-9 grid place-items-center rounded-full hover:bg-gray-100"><svg viewBox="0 0 20 20" className="h-5 w-5"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" /></svg></button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto px-6 py-5 space-y-6">
          {currentStep === 1 && (
            <section>
              <SectionTitle>Step 1: Basic Details</SectionTitle>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-700">PG Name *</span>
                  <Input value={form.pgName} onChange={e => update("pgName", e.target.value)} placeholder="e.g., Hamsa PG, TNGO Colony" required />
                </label>
                <label className="block">
                  <span className="text-gray-700">Short Description *</span>
                  <Textarea value={form.shortDescription} onChange={e => update("shortDescription", e.target.value, 150)} placeholder="AC rooms, Wi-Fi, meals included" rows={3} required />
                  <CharacterCounter value={form.shortDescription} maxLength={150} />
                </label>
              </div>
            </section>
          )}

          {currentStep === 2 && (
            <section>
              <SectionTitle>Step 2: Capacity & Amenities</SectionTitle>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Capacity *</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <label><span className="text-xs text-gray-600 mb-1">Total Rooms *</span><Input type="number" value={form.totalRooms} onChange={e => update("totalRooms", e.target.value)} placeholder="25" required /></label>
                    <label><span className="text-xs text-gray-600 mb-1">Total Beds *</span><Input type="number" value={form.totalBeds} onChange={e => update("totalBeds", e.target.value)} placeholder="50" required /></label>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Amenities (Select at least one) *</h3>
                  <div className="flex flex-wrap gap-4">{["ac", "wifi", "meals", "laundry"].map(amenity => (
                    <label key={amenity} className="inline-flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.amenities[amenity]} onChange={() => toggleAmenity(amenity)} className="h-4 w-4 rounded" /><span className="capitalize">{amenity === 'wifi' ? 'Wi-Fi' : amenity}</span></label>
                  ))}</div>
                </div>
              </div>
            </section>
          )}

          {currentStep === 3 && (
            <section>
              <SectionTitle>Step 3: Management & Pricing</SectionTitle>
              <div className="space-y-4">
                <label className="block"><span className="text-gray-700">Assign Manager *</span><Select value={form.assignManager} onChange={e => update("assignManager", e.target.value)} required><option value="" disabled>{loadingManagers ? "Loading..." : "Select manager"}</option>{managers.map(m => (<option key={m.id} value={m.id}>{m.name}</option>))}</Select></label>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Pricing & Availability *</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <label><span className="text-xs text-gray-600 mb-1">Default Rent (Monthly) *</span><Input type="number" value={form.defaultRent} onChange={e => update("defaultRent", e.target.value)} placeholder="₹ 10,000" required /></label>
                    <label><span className="text-xs text-gray-600 mb-1">Beds available *</span><Input type="number" value={form.bedsAvailable} onChange={e => update("bedsAvailable", e.target.value)} placeholder="50" required /></label>
                  </div>
                </div>
              </div>
            </section>
          )}
          
          {currentStep === 4 && (
            <section>
              <SectionTitle>Step 4: Documents & Photos</SectionTitle>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Compliance Documents (e.g., Fire NOC) *</h3>
                  <div className="rounded-lg border border-dashed border-gray-300 p-4"><label className="flex cursor-pointer items-center gap-3"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><span className="text-sm text-gray-600">Upload file(s)</span><input type="file" multiple accept=".pdf,.jpg,.png" onChange={handleFileChange("complianceFiles")} className="hidden" /></label>{form.complianceFiles.length > 0 && <div className="mt-3 space-y-2">{form.complianceFiles.map((f, i) => (<div key={i} className="flex items-center justify-between gap-3 rounded bg-gray-50 px-3 py-2"><div className="truncate text-sm">{f.name}</div><button type="button" onClick={() => removeFile("complianceFiles", i)} className="text-sm text-red-500">Remove</button></div>))}</div>}</div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Photos (Min 3, Max 5) *</h3>
                  <div className="rounded-lg border border-dashed border-gray-300 p-4"><label className="flex cursor-pointer items-center gap-3"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><span className="text-sm text-gray-600">Upload photos</span><input type="file" multiple accept="image/*" onChange={handleFileChange("photos", 5)} className="hidden" /></label>{form.photos.length > 0 && <div className="mt-3 grid grid-cols-2 gap-2">{form.photos.map((f, i) => (<div key={i} className="flex items-center justify-between gap-3 rounded bg-gray-50 px-3 py-2"><div className="truncate text-sm">{f.name}</div><button type="button" onClick={() => removeFile("photos", i)} className="text-sm text-red-500">Remove</button></div>))}</div>}</div>
                </div>
              </div>
            </section>
          )}
        </div>
        
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t mt-auto">
          <button type="button" onClick={onClose} className={`${baseButtonStyles} ${secondaryButtonStyles}`}>Cancel</button>
          <button type="button" disabled className={`${baseButtonStyles} ${secondaryButtonStyles} hidden`}>Save Draft</button> {/* Save Draft functionality can be added here if needed */}
          {currentStep > 1 && <button type="button" onClick={prevStep} className={`${baseButtonStyles} ${secondaryButtonStyles}`}>Back</button>}
          {currentStep < totalSteps && <button type="button" onClick={nextStep} disabled={!isStepValid()} className={`${baseButtonStyles} ${primaryButtonStyles}`}>Next</button>}
          {currentStep === totalSteps && <button type="submit" disabled={!isStepValid()} className={`${baseButtonStyles} ${primaryButtonStyles}`}>Create PG</button>}
        </div>
      </form>
    </div>
  );
}
