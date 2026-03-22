import { useState } from 'react';
import type { MenuItem } from '@/types';
import { Plus, Edit2, Trash2, Search, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { upsertMenuOverride, deleteMenuOverride } from '@/lib/api';
import { useSelector, useDispatch } from 'react-redux';
import { updateLocalMenuItem, removeLocalMenuItem } from '@/store/menuSlice';
import type { RootState } from '@/store';

const CATEGORIES = ['starters', 'mains', 'breads', 'rice', 'desserts', 'beverages', 'specials'];

const EMPTY_FORM: Omit<MenuItem, 'id'> = {
    name: '',
    description: '',
    price: 0,
    category: 'mains',
    image: '',
    isAvailable: true,
    isVeg: true,
};

export default function MenuManagement() {
    const dispatch = useDispatch();
    const { items: menuList } = useSelector((state: RootState) => state.menu);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [form, setForm] = useState<Omit<MenuItem, 'id'>>(EMPTY_FORM);
    const [saved, setSaved] = useState(false);

    const filteredMenu = menuList.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ── Open modal for Add ──
    const openAdd = () => {
        setEditingItem(null);
        setForm(EMPTY_FORM);
        setShowModal(true);
        setSaved(false);
    };

    // ── Open modal for Edit ──
    const openEdit = (item: MenuItem) => {
        setEditingItem(item);
        setForm({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            image: item.image,
            isAvailable: item.isAvailable,
            isVeg: item.isVeg,
        });
        setShowModal(true);
        setSaved(false);
    };

    // ── Save modal ──
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || form.price <= 0) return;

        if (editingItem) {
            const updatedItem = { ...editingItem, ...form };
            dispatch(updateLocalMenuItem(updatedItem));
            upsertMenuOverride(editingItem.id, { ...form, is_available: form.isAvailable, is_veg: form.isVeg } as any)
                .catch(err => console.warn('DB sync failed:', err.message));
        } else {
            const newItemId = `ITEM-${Date.now()}`;
            const newItem: MenuItem = { ...form, id: newItemId };
            dispatch(updateLocalMenuItem(newItem));
            upsertMenuOverride(newItemId, { ...form, is_available: form.isAvailable, is_veg: form.isVeg } as any)
                .catch(err => console.warn('DB sync failed:', err.message));
        }
        setSaved(true);
        setTimeout(() => setShowModal(false), 800);
    };

    const handleDelete = (id: string) => {
        if (confirm('Delete this item from the menu?')) {
            dispatch(removeLocalMenuItem(id));
            deleteMenuOverride(id).catch(err => console.warn('DB delete failed:', err.message));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Menu Management</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{menuList.length} items in menu</p>
                </div>
                <button
                    onClick={openAdd}
                    className="bg-burgundy text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-burgundy/90 transition-colors shadow-sm font-semibold"
                >
                    <Plus className="w-5 h-5" /> Add New Item
                </button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                    <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="Search by name or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm"
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-gray-600">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                                <th className="p-4">Item</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Price</th>
                                <th className="p-4 text-center">Veg</th>
                                <th className="p-4 text-center">Available</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMenu.map(item => (
                                <tr key={item.id} className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {item.image
                                                ? <img src={item.image} alt={item.name} className="w-11 h-11 rounded-xl object-cover border border-gray-100" />
                                                : <div className="w-11 h-11 rounded-xl bg-cream flex items-center justify-center text-xl">🍽️</div>
                                            }
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                                                <p className="text-xs text-gray-400 line-clamp-1 max-w-[200px]">{item.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full capitalize font-medium">{item.category}</span>
                                    </td>
                                    <td className="p-4 font-bold text-gray-800">₹{item.price}</td>
                                    <td className="p-4 text-center">
                                        <span className={`inline-block w-3.5 h-3.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} title={item.isVeg ? 'Vegetarian' : 'Non-Veg'} />
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${item.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                                            {item.isAvailable ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => openEdit(item)}
                                            title="Edit item"
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-1 transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            title="Delete item"
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredMenu.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-10 text-center text-gray-400">No menu items found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add / Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-auto"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-5 border-b bg-gray-50">
                                <h3 className="font-bold text-gray-800 text-lg">
                                    {editingItem ? `Edit: ${editingItem.name}` : 'Add New Menu Item'}
                                </h3>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSave} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Item Name *</label>
                                        <input
                                            required
                                            type="text"
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            placeholder="e.g. Paneer Tikka"
                                            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-burgundy outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Price (₹) *</label>
                                        <input
                                            required
                                            type="number"
                                            min={1}
                                            value={form.price}
                                            onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                                            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-burgundy outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Category</label>
                                        <select
                                            value={form.category}
                                            onChange={e => setForm({ ...form, category: e.target.value })}
                                            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-burgundy outline-none text-sm capitalize"
                                        >
                                            {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Description</label>
                                        <textarea
                                            rows={2}
                                            value={form.description}
                                            onChange={e => setForm({ ...form, description: e.target.value })}
                                            placeholder="Brief description of the dish..."
                                            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-burgundy outline-none text-sm resize-none"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Image URL (optional)</label>
                                        <input
                                            type="url"
                                            value={form.image}
                                            onChange={e => setForm({ ...form, image: e.target.value })}
                                            placeholder="https://..."
                                            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-burgundy outline-none text-sm"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="isVeg"
                                            checked={form.isVeg}
                                            onChange={e => setForm({ ...form, isVeg: e.target.checked })}
                                            className="w-4 h-4 accent-green-500"
                                        />
                                        <label htmlFor="isVeg" className="text-sm font-medium text-gray-700">Vegetarian</label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="isAvailable"
                                            checked={form.isAvailable}
                                            onChange={e => setForm({ ...form, isAvailable: e.target.checked })}
                                            className="w-4 h-4 accent-burgundy"
                                        />
                                        <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700">Available</label>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={`flex-1 px-4 py-3 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${saved ? 'bg-green-500 text-white' : 'bg-burgundy text-white hover:bg-burgundy/90'}`}
                                    >
                                        {saved ? (<><CheckCircle className="w-4 h-4" /> Saved!</>) : (editingItem ? 'Save Changes' : 'Add Item')}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
