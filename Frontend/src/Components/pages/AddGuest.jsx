// src/pages/AddGuest.jsx
import { useEffect, useRef, useState } from "react";

export default function AddGuestModal({ open, onClose, onSubmit }) {
  const initialForm = {
    fullName: "",
    dob: "",
    idFiles: [],

    email: "",
    mobile: "",
    altPhone: "",
    emergencyName: "",
    emergencyPhone: "",

    currentAddress: "",
    permanentAddress: "",

    username: "",
    password: "",
    forceChangeOnFirstLogin: true,
  };

  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);

  // Reset form when modal opens (optional: uncomment to clear each open)
  useEffect(() => {
    if (open) {
      // setForm(initialForm); // <-- uncomment if you want to reset on each open
    }
  }, [open]);

  // close on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // block body scroll while open (component-local safe)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [open]);

  if (!open) return null;

  const update = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const handleFile = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setForm((s) => ({ ...s, idFiles: [...s.idFiles, ...files] }));
    // clear native input value so same file can be re-picked if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (idx) =>
    setForm((s) => ({ ...s, idFiles: s.idFiles.filter((_, i) => i !== idx) }));

  const validate = () => {
    if (!form.fullName.trim()) {
      alert("Please enter full name.");
      return false;
    }
    if (!form.email.trim()) {
      alert("Please enter primary email.");
      return false;
    }
    if (!form.mobile.trim()) {
      alert("Please enter mobile number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Demo: convert Files to names — for real upload use FormData
    const payload = {
      ...form,
      idFiles: form.idFiles.map((f) => f.name || null),
    };

    try {
      const res = onSubmit ? onSubmit(payload) : null;
      if (res && typeof res.then === "function") await res;
      onClose?.();
    } catch (err) {
      console.error("Add Guest error:", err);
    }
  };

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

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Add new guest"
    >
      <form onSubmit={handleSubmit} className="w-full max-w-4xl rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">New Guest</h2>
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
            {/* Left: Personal / Contact / Address */}
            <div className="md:col-span-2 space-y-5">
              <section>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Personal Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs text-gray-600">Full name</label>
                    <Input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Date of birth</label>
                    <Input type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)} />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-xs text-gray-600 block mb-2">Photo ID upload (Aadhaar, passport, license)</label>
                  <div className="rounded-lg border border-dashed border-gray-300 p-4">
                    <div className="flex items-center gap-4">
                      <label className="flex cursor-pointer items-center gap-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm text-gray-600">Upload ID documents</span>
                        <input ref={fileInputRef} type="file" multiple accept=".pdf,image/*" onChange={handleFile} className="hidden" />
                      </label>
                    </div>

                    {form.idFiles.length > 0 && (
                      <div className="mt-3 grid grid-cols-1 gap-2">
                        {form.idFiles.map((f, i) => (
                          <div key={i} className="flex items-center justify-between gap-3 rounded bg-gray-50 px-3 py-2">
                            <div className="truncate text-sm">{f.name}</div>
                            <button type="button" onClick={() => removeFile(i)} className="text-sm text-red-500">Remove</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs text-gray-600">Primary email address</label>
                    <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="guest@example.com" />
                  </div>

                  <div>
                    <label className="text-xs text-gray-600">Mobile number</label>
                    <Input value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="+91 9XXXXXXXXX" />
                  </div>

                  <div>
                    <label className="text-xs text-gray-600">Alternate phone</label>
                    <Input value={form.altPhone} onChange={(e) => update("altPhone", e.target.value)} placeholder="Alternate number" />
                  </div>

                  <div>
                    <label className="text-xs text-gray-600">Emergency contact name</label>
                    <Input value={form.emergencyName} onChange={(e) => update("emergencyName", e.target.value)} placeholder="Emergency contact" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs text-gray-600">Emergency contact phone</label>
                    <Input value={form.emergencyPhone} onChange={(e) => update("emergencyPhone", e.target.value)} placeholder="Emergency phone" />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Address</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="text-xs text-gray-600">Current residential address</label>
                    <Textarea value={form.currentAddress} onChange={(e) => update("currentAddress", e.target.value)} rows={3} />
                  </div>

                  <div>
                    <label className="text-xs text-gray-600">Permanent address</label>
                    <Textarea value={form.permanentAddress} onChange={(e) => update("permanentAddress", e.target.value)} rows={3} />
                  </div>
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="md:col-span-1">
              <div className="md:pl-6 md:ml-6 border-l md:border-l-0">
                <section>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Login & Access Permissions</h3>

                  <div className="mb-4">
                    <label className="text-xs text-gray-600">Desired username</label>
                    <Input value={form.username} onChange={(e) => update("username", e.target.value)} placeholder="username" />
                  </div>

                  <div className="mb-2">
                    <label className="text-xs text-gray-600">Initial password</label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Set initial password" />
                      <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-2 text-sm text-gray-500">{showPassword ? "Hide" : "Show"}</button>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">User will be prompted to change password on first login.</div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <input id="forceChange" type="checkbox" checked={form.forceChangeOnFirstLogin} onChange={(e) => update("forceChangeOnFirstLogin", e.target.checked)} className="h-4 w-4 rounded" />
                    <label htmlFor="forceChange" className="text-sm text-gray-700">Require change on first login</label>
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
              const payload = { ...form, draft: true, idFiles: form.idFiles.map((f) => f.name) };
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

          <button type="submit" className="px-4 py-2 rounded-lg bg-[#605BFF] text-white hover:bg-[#5048e6]">Create Guest</button>
        </div>
      </form>
    </div>
  );
}
