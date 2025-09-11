// AddManagerModal.jsx
import { useEffect, useState } from "react";

export default function AddManagerModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    // 1. Personal Information
    fullName: "",
    dob: "",
    idType: "aadhaar",
    idFile: null,

    // 2. Contact Details
    email: "",
    mobile: "",
    altPhone: "",
    emergencyName: "",
    emergencyPhone: "",

    // 3. Address
    currentAddress: "",
    permanentAddress: "",

    // 4. Professional Credentials
    designation: "PG Manager",
    joiningDate: "",
    experience: "",
    certifications: "",

    // 5. Login & Access
    username: "",
    password: "",
    forcePasswordChange: true,
    accessLevels: {
      dashboard: true,
      alerts: true,
      financial: false,
    },
    modulePerms: {
      maintenance: true,
      tenants: true,
      inventory: false,
      ticketsApprove: false,
    },

    // 7. Compliance & Verification
    policeReport: null,
    backgroundDocs: null,
    ndaFile: null,

    // 8. Payroll & Tax
    bankAccount: "",
    ifsc: "",
    pan: "",
    taxForm: null,

    // 9. Additional Preferences
    workingHours: "",
    languages: "",
  });

  // close on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const updateNested = (group, key) => (e) =>
    setForm((f) => ({ ...f, [group]: { ...f[group], [key]: e.target.checked } }));

  const handleFile = (key) => (e) => update(key, e.target.files?.[0] ?? null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build payload (you can switch to FormData if uploading files)
    const payload = { ...form };

    // Example: convert files to names for demo
    ["idFile", "policeReport", "backgroundDocs", "ndaFile", "taxForm"].forEach(
      (k) => (payload[k] = form[k]?.name || null)
    );

    onSubmit?.(payload);
  };

  const SectionTitle = ({ children }) => (
    <h3 className="text-sm font-semibold text-gray-900 mb-3">{children}</h3>
  );

  const Label = ({ children }) => (
    <span className="text-xs text-gray-600">{children}</span>
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
      aria-label="Add Manager"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Add Manager</h2>
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

        {/* Body (scrollable) */}
        <div className="max-h-[75vh] overflow-y-auto px-6 py-5 space-y-7">
          {/* 1. Personal Information */}
          <section>
            <SectionTitle>1. Personal Information</SectionTitle>
            <div className="grid md:grid-cols-3 gap-4">
              <label className="block">
                <Label>Full name *</Label>
                <Input
                  required
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="e.g., Rahul Sharma"
                />
              </label>

              <label className="block">
                <Label>Date of birth *</Label>
                <Input
                  required
                  type="date"
                  value={form.dob}
                  onChange={(e) => update("dob", e.target.value)}
                />
              </label>

              <label className="block">
                <Label>Photo ID type</Label>
                <Select
                  value={form.idType}
                  onChange={(e) => update("idType", e.target.value)}
                >
                  <option value="aadhaar">Aadhaar</option>
                  <option value="passport">Passport</option>
                  <option value="driver">Driver’s License</option>
                </Select>
              </label>

              <label className="block md:col-span-3">
                <Label>Photo ID upload</Label>
                <input
                  type="file"
                  onChange={handleFile("idFile")}
                  className="mt-1 block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-gray-700 hover:file:bg-gray-200"
                />
              </label>
            </div>
          </section>

          {/* 2. Contact Details */}
          <section>
            <SectionTitle>2. Contact Details</SectionTitle>
            <div className="grid md:grid-cols-3 gap-4">
              <label className="block">
                <Label>Primary email *</Label>
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="name@email.com"
                />
              </label>

              <label className="block">
                <Label>Mobile number *</Label>
                <Input
                  required
                  value={form.mobile}
                  onChange={(e) => update("mobile", e.target.value)}
                  placeholder="+91-xxxxxxxxxx"
                />
              </label>

              <label className="block">
                <Label>Alternate phone</Label>
                <Input
                  value={form.altPhone}
                  onChange={(e) => update("altPhone", e.target.value)}
                />
              </label>

              <label className="block">
                <Label>Emergency contact name</Label>
                <Input
                  value={form.emergencyName}
                  onChange={(e) => update("emergencyName", e.target.value)}
                />
              </label>

              <label className="block">
                <Label>Emergency contact number</Label>
                <Input
                  value={form.emergencyPhone}
                  onChange={(e) => update("emergencyPhone", e.target.value)}
                />
              </label>
            </div>
          </section>

          {/* 3. Address */}
          <section>
            <SectionTitle>3. Address</SectionTitle>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="block">
                <Label>Current residential address</Label>
                <Textarea
                  rows={2}
                  value={form.currentAddress}
                  onChange={(e) => update("currentAddress", e.target.value)}
                />
              </label>

              <label className="block">
                <Label>Permanent address</Label>
                <Textarea
                  rows={2}
                  value={form.permanentAddress}
                  onChange={(e) => update("permanentAddress", e.target.value)}
                />
              </label>
            </div>
          </section>

          {/* 4. Professional Credentials */}
          <section>
            <SectionTitle>4. Professional Credentials</SectionTitle>
            <div className="grid md:grid-cols-3 gap-4">
              <label className="block">
                <Label>Designation</Label>
                <Input
                  value={form.designation}
                  onChange={(e) => update("designation", e.target.value)}
                />
              </label>

              <label className="block">
                <Label>Date of joining</Label>
                <Input
                  type="date"
                  value={form.joiningDate}
                  onChange={(e) => update("joiningDate", e.target.value)}
                />
              </label>

              <label className="block md:col-span-3">
                <Label>Work experience summary</Label>
                <Textarea
                  rows={2}
                  value={form.experience}
                  onChange={(e) => update("experience", e.target.value)}
                  placeholder="Brief summary"
                />
              </label>

              <label className="block md:col-span-3">
                <Label>Relevant certifications</Label>
                <Textarea
                  rows={2}
                  value={form.certifications}
                  onChange={(e) => update("certifications", e.target.value)}
                  placeholder="Hospitality, safety, first aid, etc."
                />
              </label>
            </div>
          </section>

          {/* 5. Login & Access Permissions */}
          <section>
            <SectionTitle>5. Login & Access Permissions</SectionTitle>
            <div className="grid md:grid-cols-3 gap-4">
              <label className="block">
                <Label>Desired username *</Label>
                <Input
                  required
                  value={form.username}
                  onChange={(e) => update("username", e.target.value)}
                />
              </label>

              <label className="block">
                <Label>Initial password *</Label>
                <Input
                  required
                  type="password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                />
              </label>

              <label className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  checked={form.forcePasswordChange}
                  onChange={(e) => update("forcePasswordChange", e.target.checked)}
                />
                <span className="text-sm text-gray-700">
                  Force password change on first login
                </span>
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="rounded-lg border p-3">
                <div className="text-xs font-medium text-gray-700 mb-2">Access levels</div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.accessLevels.dashboard}
                    onChange={updateNested("accessLevels", "dashboard")}
                  />
                  Dashboard view
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.accessLevels.alerts}
                    onChange={updateNested("accessLevels", "alerts")}
                  />
                  Alerts management
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.accessLevels.financial}
                    onChange={updateNested("accessLevels", "financial")}
                  />
                  Financial approvals
                </label>
              </div>

              <div className="rounded-lg border p-3">
                <div className="text-xs font-medium text-gray-700 mb-2">
                  Module-specific permissions
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.modulePerms.maintenance}
                    onChange={updateNested("modulePerms", "maintenance")}
                  />
                  Maintenance tickets
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.modulePerms.tenants}
                    onChange={updateNested("modulePerms", "tenants")}
                  />
                  Tenant communications
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.modulePerms.inventory}
                    onChange={updateNested("modulePerms", "inventory")}
                  />
                  Inventory access
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.modulePerms.ticketsApprove}
                    onChange={updateNested("modulePerms", "ticketsApprove")}
                  />
                  Approve/close tickets
                </label>
              </div>
            </div>
          </section>

          {/* 7. Compliance & Verification */}
          <section>
            <SectionTitle>7. Compliance & Verification</SectionTitle>
            <div className="grid md:grid-cols-3 gap-4">
              <label className="block">
                <Label>Police verification report</Label>
                <input type="file" onChange={handleFile("policeReport")}
                  className="mt-1 block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-gray-700 hover:file:bg-gray-200" />
              </label>
              <label className="block">
                <Label>Background check documents</Label>
                <input type="file" onChange={handleFile("backgroundDocs")}
                  className="mt-1 block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-gray-700 hover:file:bg-gray-200" />
              </label>
              <label className="block">
                <Label>Signed NDA</Label>
                <input type="file" onChange={handleFile("ndaFile")}
                  className="mt-1 block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-gray-700 hover:file:bg-gray-200" />
              </label>
            </div>
          </section>

          {/* 8. Payroll & Tax Information */}
          <section>
            <SectionTitle>8. Payroll & Tax Information</SectionTitle>
            <div className="grid md:grid-cols-3 gap-4">
              <label className="block">
                <Label>Bank account number</Label>
                <Input
                  value={form.bankAccount}
                  onChange={(e) => update("bankAccount", e.target.value)}
                />
              </label>
              <label className="block">
                <Label>IFSC</Label>
                <Input
                  value={form.ifsc}
                  onChange={(e) => update("ifsc", e.target.value)}
                />
              </label>
              <label className="block">
                <Label>PAN / Tax ID</Label>
                <Input value={form.pan} onChange={(e) => update("pan", e.target.value)} />
              </label>

              <label className="block md:col-span-3">
                <Label>Form 16 / Tax document</Label>
                <input type="file" onChange={handleFile("taxForm")}
                  className="mt-1 block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-gray-700 hover:file:bg-gray-200" />
              </label>
            </div>
          </section>

          {/* 9. Additional Preferences */}
          <section>
            <SectionTitle>9. Additional Preferences</SectionTitle>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="block">
                <Label>Preferred working hours / shift</Label>
                <Input
                  placeholder="e.g., 9am–6pm (Mon–Sat)"
                  value={form.workingHours}
                  onChange={(e) => update("workingHours", e.target.value)}
                />
              </label>
              <label className="block">
                <Label>Language proficiency</Label>
                <Input
                  placeholder="e.g., English, Hindi, Telugu"
                  value={form.languages}
                  onChange={(e) => update("languages", e.target.value)}
                />
              </label>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#3D63EA] text-white hover:bg-blue-600"
          >
            Save Manager
          </button>
        </div>
      </form>
    </div>
  );
}