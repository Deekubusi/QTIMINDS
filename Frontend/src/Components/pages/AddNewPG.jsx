// AddNewPG.jsx
import { useEffect, useState } from "react";

export default function AddNewPGModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    pgName: "",
    shortDescription: "",
    fullDescription: "",
    totalRooms: "",
    totalBeds: "",
    amenities: {
      ac: false,
      wifi: false,
      meals: false,
      laundry: false,
    },
    assignManager: "",
    defaultRent: "",
    bedsAvailable: "",
    complianceFiles: [],
    photos: [],
  });

  const [managers, setManagers] = useState([]); // loaded from backend
  const [loadingManagers, setLoadingManagers] = useState(false);

  // load manager list from backend (adjust endpoint & auth as required)
  useEffect(() => {
    let mounted = true;
    async function loadManagers() {
      setLoadingManagers(true);
      try {
        // Example: replace '/api/managers' with your real endpoint
        const res = await fetch("/api/managers", {
          // headers: { Authorization: `Bearer ${token}` } // if needed
        });
        if (!res.ok) throw new Error("Failed to fetch managers");
        const data = await res.json();
        // expected shape: [{ id: "...", name: "Manager Name" }, ...]
        if (mounted) setManagers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Could not load managers:", err);
        if (mounted) setManagers([]);
      } finally {
        if (mounted) setLoadingManagers(false);
      }
    }
    loadManagers();
    return () => {
      mounted = false;
    };
  }, []);

  // close on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // prevent background scroll while modal open (component-local)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [open]);

  if (!open) return null;

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const toggleAmenity = (k) =>
    setForm((f) => ({ ...f, amenities: { ...f.amenities, [k]: !f.amenities[k] } }));

  const handleFile = (key) => (e) => {
    const files = Array.from(e.target.files || []);
    setForm((f) => ({ ...f, [key]: [...(f[key] || []), ...files] }));
  };

  const removeFile = (key, idx) => {
    setForm((f) => ({ ...f, [key]: f[key].filter((_, i) => i !== idx) }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    // Basic validation example
    if (!form.pgName.trim()) {
      alert("Please enter the PG name.");
      return;
    }

    const payload = {
      ...form,
      // convert File objects to names for demo; switch to FormData if uploading
      photos: form.photos.map((f) => f.name || null),
      complianceFiles: form.complianceFiles.map((f) => f.name || null),
    };

    try {
      const res = onSubmit ? onSubmit(payload) : null;
      if (res && typeof res.then === "function") {
        await res;
      }
      onClose?.();
    } catch (err) {
      console.error("Create PG error:", err);
    }
  };

  const SectionTitle = ({ children }) => (
    <h3 className="text-sm font-semibold text-gray-900 mb-3">{children}</h3>
  );

  const Input = (props) => (
    <input
      {...props}
      className={[
        "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2",
        "outline-none focus:ring-2 focus:ring-[#3D63EA]",
      ].join(" ")}
    />
  );

  const Textarea = (props) => (
    <textarea
      {...props}
      className={[
        "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2",
        "outline-none focus:ring-2 focus:ring-[#3D63EA]",
      ].join(" ")}
    />
  );

  const Select = (props) => (
    <select
      {...props}
      className={[
        "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2",
        "outline-none focus:ring-2 focus:ring-[#3D63EA]",
      ].join(" ")}
    />
  );

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Add New PG"
    >
      <form onSubmit={handleCreate} className="w-full max-w-4xl rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Add New PG</h2>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 grid place-items-center rounded-full hover:bg-gray-100"
            aria-label="Close"
            title="Close"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto px-6 py-5">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Left: main inputs (span 2 columns on md) */}
            <div className="md:col-span-2 space-y-5">
              <section>
                <SectionTitle>PG Name</SectionTitle>
                <Input
                  value={form.pgName}
                  onChange={(e) => update("pgName", e.target.value)}
                  placeholder="Hamsa PG, TNGO Colony"
                />
              </section>

              <section>
                <SectionTitle>Short Description</SectionTitle>
                <Input
                  value={form.shortDescription}
                  onChange={(e) => update("shortDescription", e.target.value)}
                  placeholder="AC rooms, Wi-Fi, meals included"
                />
              </section>

              <section>
                <SectionTitle>Full Description</SectionTitle>
                <Textarea
                  value={form.fullDescription}
                  onChange={(e) => update("fullDescription", e.target.value)}
                  placeholder="Enter a full description"
                  rows={4}
                />
              </section>

              <section>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Capacity</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Total Rooms</div>
                    <Input value={form.totalRooms} onChange={(e) => update("totalRooms", e.target.value)} placeholder="25" />
                  </div>

                  <div>
                    <div className="text-xs text-gray-600 mb-1">Total Beds</div>
                    <Input value={form.totalBeds} onChange={(e) => update("totalBeds", e.target.value)} placeholder="50" />
                  </div>

                  <div>
                    <div />
                  </div>

                  <div>
                    <div />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-4">
                  <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                    <input type="checkbox" checked={form.amenities.ac} onChange={() => toggleAmenity("ac")} className="h-4 w-4 rounded" />
                    <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 15 }}>AC</span>
                  </label>

                  <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                    <input type="checkbox" checked={form.amenities.wifi} onChange={() => toggleAmenity("wifi")} className="h-4 w-4 rounded" />
                    <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 15 }}>Wi-Fi</span>
                  </label>

                  <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                    <input type="checkbox" checked={form.amenities.meals} onChange={() => toggleAmenity("meals")} className="h-4 w-4 rounded" />
                    <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 15 }}>Meals</span>
                  </label>

                  <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                    <input type="checkbox" checked={form.amenities.laundry} onChange={() => toggleAmenity("laundry")} className="h-4 w-4 rounded" />
                    <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 15 }}>Laundry</span>
                  </label>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Photos</h3>

                <div className="rounded-lg border border-dashed border-gray-300 p-4">
                  <div className="flex items-center gap-4">
                    <label className="flex cursor-pointer items-center gap-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5v14M5 12h14" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm text-gray-600">Upload photos</span>
                      <input type="file" multiple accept="image/*" onChange={handleFile("photos")} className="hidden" />
                    </label>
                  </div>

                  {/* preview names */}
                  {form.photos.length > 0 && (
                    <div className="mt-3 grid grid-cols-1 gap-2">
                      {form.photos.map((f, i) => (
                        <div key={i} className="flex items-center justify-between gap-3 rounded bg-gray-50 px-3 py-2">
                          <div className="truncate text-sm">{f.name}</div>
                          <button type="button" onClick={() => removeFile("photos", i)} className="text-sm text-red-500">Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="md:col-span-1">
              <div className="border-l md:border-l-0 md:pl-6 md:ml-6">
                <section>
                  <SectionTitle>Assign Manager</SectionTitle>
                  
                  <Select value={form.assignManager} onChange={(e) => update("assignManager", e.target.value)}>
                    <option value="">{loadingManagers ? "Loading..." : "Select manager"}</option>
                    {/* Fallback static options if backend empty */}
                    {managers.length === 0 && !loadingManagers && (
                      <>
                        <option value="mgr1">Manager 1</option>
                        <option value="mgr2">Manager 2</option>
                      </>
                    )}
                    {managers.map((m) => (
                      <option key={m.id ?? m.value ?? m.name} value={m.id ?? m.value ?? m.name}>
                        {m.name ?? m.label ?? m.value}
                      </option>
                    ))}
                  </Select>
                </section>

                <section className="mt-4">
                  <SectionTitle>Pricing & Availability</SectionTitle>
                  <div className="text-xs text-gray-600 mb-1">Default Rent (Monthly)</div>
                  <Input value={form.defaultRent} onChange={(e) => update("defaultRent", e.target.value)} placeholder="₹ 10,000" />

                  <div className="mt-3">
                    <div className="text-xs text-gray-600 mb-1">Beds available</div>
                    <Input value={form.bedsAvailable} onChange={(e) => update("bedsAvailable", e.target.value)} placeholder="50" />
                  </div>
                </section>

                <section className="mt-5">
                  <SectionTitle>Compliance Documents</SectionTitle>
                  <div className="text-xs text-gray-600 mb-1">Fire NOC</div>

                  <div className="rounded-lg border border-dashed border-gray-300 p-4 mt-2">
                    <label className="flex cursor-pointer items-center gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5v14M5 12h14" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm text-gray-600">Upload file</span>
                      <input type="file" accept=".pdf,.jpg,.png" onChange={handleFile("complianceFiles")} className="hidden" />
                    </label>

                    {form.complianceFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {form.complianceFiles.map((f, i) => (
                          <div key={i} className="flex items-center justify-between gap-3 rounded bg-gray-50 px-3 py-2">
                            <div className="truncate text-sm">{f.name}</div>
                            <button type="button" onClick={() => removeFile("complianceFiles", i)} className="text-sm text-red-500">Remove</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-50">Cancel</button>

          <button
            type="button"
            onClick={() => {
              const payload = { ...form, draft: true };
              try {
                const res = onSubmit ? onSubmit(payload) : null;
                if (res && typeof res.then === "function") res.finally(() => {});
              } catch (err) {
                console.error(err);
              }
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-50"
          >
            Save Draft
          </button>

          <button type="submit" className="px-4 py-2 rounded-lg bg-[#605BFF] text-white hover:bg-[#5048e6]">Create PG</button>
        </div>
      </form>
    </div>
  );
}
