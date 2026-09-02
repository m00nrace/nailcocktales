import React, { useState } from 'react';
import type { Service, ServiceCategory } from '../../types';
import { Plus, Edit2, Trash2, Upload, Clock, RefreshCw } from 'lucide-react';

interface ServicesManagerProps {
  services: Service[];
  onSaveService: (service: Service) => void;
  onDeleteService: (id: string) => void;
  onResetDefaults: () => void;
}

const STOCK_SPA_IMAGES = [
  { label: 'Manicure Gel', url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80' },
  { label: 'Hand Scrub & Mask', url: 'https://images.unsplash.com/photo-1519014816548-bf7851c8528b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Foot Soak & Massage', url: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80' },
  { label: 'Pedicure Relax', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
  { label: 'Royal Combo Duo', url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80' },
  { label: 'Nail Polish Art', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Acrylic Enhancements', url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80' },
  { label: 'Paraffin Treatment', url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80' },
];

export const ServicesManager: React.FC<ServicesManagerProps> = ({
  services,
  onSaveService,
  onDeleteService,
  onResetDefaults,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('hand-spa');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(450);
  const [durationMinutes, setDurationMinutes] = useState<number>(45);
  const [imageUrl, setImageUrl] = useState('');
  const [popular, setPopular] = useState(false);
  const [featured, setFeatured] = useState(false);

  const openNewModal = () => {
    setEditingService(null);
    setName('');
    setCategory('hand-spa');
    setDescription('');
    setPrice(450);
    setDurationMinutes(45);
    setImageUrl(STOCK_SPA_IMAGES[0].url);
    setPopular(false);
    setFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (s: Service) => {
    setEditingService(s);
    setName(s.name);
    setCategory(s.category);
    setDescription(s.description);
    setPrice(s.price);
    setDurationMinutes(s.durationMinutes);
    setImageUrl(s.imageUrl);
    setPopular(!!s.popular);
    setFeatured(!!s.featured);
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceData: Service = {
      id: editingService ? editingService.id : `srv-${Date.now()}`,
      name: name.trim(),
      category,
      description: description.trim(),
      price: Number(price),
      durationMinutes: Number(durationMinutes),
      imageUrl: imageUrl.trim() || STOCK_SPA_IMAGES[0].url,
      popular,
      featured,
    };

    onSaveService(serviceData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Services & Pricing Menu</h2>
          <p className="text-xs text-slate-500">
            Add new treatments, modify prices, and upload custom photos for the landing page
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onResetDefaults}
            title="Reset to factory sample services"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-brand-teal bg-white/70 border border-slate-200 flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={openNewModal}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-teal hover:bg-brand-teal-dark shadow-md flex items-center gap-2 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div
            key={service.id}
            className="glass-panel rounded-3xl overflow-hidden border border-white/80 flex flex-col justify-between group shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = STOCK_SPA_IMAGES[0].url;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-teal text-white uppercase">
                  {service.category}
                </span>
                {service.popular && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-coral text-white uppercase">
                    Popular
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl glass-panel-dark text-white font-extrabold text-sm">
                ₱{service.price.toLocaleString()}
              </div>

              <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/50 text-white text-[11px] flex items-center gap-1">
                <Clock className="w-3 h-3 text-brand-teal-light" />
                <span>{service.durationMinutes}m</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {service.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(service)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-teal hover:bg-brand-teal/10 flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${service.name}"?`)) {
                      onDeleteService(service.id);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-white/90 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95">
            <h3 className="text-xl font-bold text-slate-800 pb-3 border-b border-brand-teal/20">
              {editingService ? 'Edit Service' : 'Add New Spa Service'}
            </h3>

            <form onSubmit={handleSubmit} className="py-4 space-y-4 max-h-[75vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lavender Botanical Hand Spa"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-slate-800"
                  >
                    <option value="hand-spa">Hand Spa & Manicure</option>
                    <option value="foot-spa">Foot Spa & Pedicure</option>
                    <option value="packages">Signature Cocktales Package</option>
                    <option value="enhancements">Gel & Enhancements</option>
                    <option value="nail-art">Nail Art</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Price (PHP)
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-slate-800 font-bold text-brand-mocha"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    required
                    min={5}
                    step={5}
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Detail the steps, ingredients, and pampering experience..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-slate-800"
                />
              </div>

              {/* Service Image Configuration (Default vs Upload vs Stock) */}
              <div className="space-y-2 pt-2 border-t border-brand-teal/15">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Service Image for Landing Page
                </label>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-300 shrink-0">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="url"
                      placeholder="Image URL (https://...)"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl glass-input text-xs text-slate-700"
                    />

                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:text-brand-teal cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-brand-teal" />
                      <span>Upload Custom Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Stock presets */}
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block mb-1">
                    Or pick from default spa photo library:
                  </span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {STOCK_SPA_IMAGES.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setImageUrl(img.url)}
                        className={`h-12 rounded-lg overflow-hidden border-2 relative ${
                          imageUrl === img.url ? 'border-brand-teal ring-2 ring-brand-teal/30' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={popular}
                    onChange={(e) => setPopular(e.target.checked)}
                    className="rounded text-brand-teal focus:ring-brand-teal"
                  />
                  <span>Mark as "Popular" badge</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded text-brand-teal focus:ring-brand-teal"
                  />
                  <span>Mark as "Signature"</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-teal hover:bg-brand-teal-dark shadow-md"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
