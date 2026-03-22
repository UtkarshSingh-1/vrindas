import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { RootState } from '@/store';
import { clearCart, setOrderMode, type OrderMode } from '@/store/cartSlice';
import { addOrder } from '@/store/ordersSlice';
import type { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronLeft, CheckCircle2, ShoppingBag, MapPin, Utensils } from 'lucide-react';
import { toast } from 'sonner';
import { createOrder } from '@/lib/api';

export default function Checkout() {
    const { items, totalAmount, orderMode, tableNumber } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [manualTableNumber, setManualTableNumber] = useState(tableNumber || '');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        time: 'ASAP',
        paymentMethod: 'cash',
    });

    // If cart is empty, go back
    if (items.length === 0 && step !== 3) {
        navigate('/menu');
        return null;
    }

    const handleModeChange = (val: OrderMode) => {
        dispatch(setOrderMode(val));
    };

    const submitOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderMode) {
            toast.error('Please select an order type (Dine-in, Pickup, or Delivery)');
            return;
        }

        // Validate based on mode
        if (orderMode === 'delivery' && !formData.address) {
            toast.error('Please provide a delivery address');
            return;
        }
        if (orderMode === 'dine-in' && !manualTableNumber) {
            toast.error('Please enter your table number.');
            return;
        }

        // Process order success
        const newOrderId = 'VRD' + Date.now().toString().slice(-8);

        const newOrder: Order = {
            id: newOrderId,
            items: items,
            customerDetails: {
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
                city: 'Kanpur',
                pincode: '208001',
            },
            totalAmount: totalAmount,
            deliveryCharge: orderMode === 'delivery' ? 40 : 0,
            gstAmount: Math.round(totalAmount * 0.05),
            status: 'pending',
            paymentMethod: formData.paymentMethod as 'cod' | 'razorpay',
            paymentStatus: formData.paymentMethod === 'cash' ? 'pending' : 'completed',
            createdAt: new Date().toISOString().split('T')[0]
        };

        dispatch(addOrder(newOrder));

        // Persist to Neon DB (non-blocking — UI proceeds even if this fails)
        createOrder({ ...newOrder, orderMode: orderMode || undefined, tableNumber: manualTableNumber || undefined } as any)
            .then(() => console.log('Order saved to DB:', newOrderId))
            .catch(err => console.warn('DB save skipped (server may not be running):', err.message));

        setStep(3);
        dispatch(clearCart());
        window.scrollTo(0, 0);
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Step Indicator */}
                {step !== 3 && (
                    <div className="flex items-center justify-between mb-8 relative">
                        <div className="absolute left-0 right-0 h-1 bg-gray-200 top-1/2 -translate-y-1/2 -z-10" />
                        <div className="absolute left-0 w-1/2 h-1 bg-burgundy top-1/2 -translate-y-1/2 -z-10 transition-all" style={{ width: step === 2 ? '100%' : '50%' }} />

                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-burgundy text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold relative ${step >= 2 ? 'bg-burgundy text-white' : 'bg-gray-200 text-gray-500'}`}>
                            2
                            <span className="absolute -bottom-6 w-max text-xs font-semibold text-gray-600">Details</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold relative">
                            3
                            <span className="absolute -bottom-6 w-max text-xs font-semibold text-gray-600">Done</span>
                        </div>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-orange-100"
                        >
                            <button onClick={() => navigate(-1)} className="flex items-center text-burgundy hover:text-burgundy/80 mb-6 font-semibold">
                                <ChevronLeft className="w-5 h-5 mr-1" /> Back
                            </button>

                            <h1 className="text-3xl font-display font-bold text-burgundy mb-6">Review Order</h1>

                            <div className="space-y-4 mb-8">
                                {items.map(item => (
                                    <div key={item.id} className="flex justify-between items-center py-3 border-b last:border-0">
                                        <div className="flex items-center gap-4">
                                            <span className="font-semibold text-burgundy w-6">{item.quantity}x</span>
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                                <span className="text-sm text-gray-500">₹{item.price} each</span>
                                            </div>
                                        </div>
                                        <span className="font-bold text-gray-800">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-cream p-4 rounded-xl flex justify-between items-center font-bold text-lg text-burgundy mb-8">
                                <span>Total Amount</span>
                                <span>₹{totalAmount}</span>
                            </div>

                            <div className="mb-8 border-t pt-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">How would you like your order?</h3>
                                <RadioGroup
                                    value={orderMode || 'pickup'}
                                    onValueChange={(val) => handleModeChange(val as OrderMode)}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                >
                                    <div className="relative">
                                        <RadioGroupItem value="dine-in" id="dine-in" className="peer sr-only" />
                                        <Label htmlFor="dine-in" className="flex flex-col items-center justify-center p-4 py-6 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-cream peer-data-[state=checked]:border-burgundy peer-data-[state=checked]:bg-cream transition-all">
                                            <Utensils className="w-6 h-6 mb-2 text-burgundy" />
                                            <span className="font-semibold text-burgundy">Dine-in</span>
                                            {manualTableNumber && <span className="text-xs text-orange-600 mt-1 font-bold">Table {manualTableNumber}</span>}
                                        </Label>
                                    </div>
                                    <div className="relative">
                                        <RadioGroupItem value="pickup" id="pickup" className="peer sr-only" />
                                        <Label htmlFor="pickup" className="flex flex-col items-center justify-center p-4 py-6 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-cream peer-data-[state=checked]:border-burgundy peer-data-[state=checked]:bg-cream transition-all">
                                            <ShoppingBag className="w-6 h-6 mb-2 text-burgundy" />
                                            <span className="font-semibold text-burgundy">Pickup</span>
                                        </Label>
                                    </div>
                                    <div className="relative">
                                        <RadioGroupItem value="delivery" id="delivery" className="peer sr-only" />
                                        <Label htmlFor="delivery" className="flex flex-col items-center justify-center p-4 py-6 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-cream peer-data-[state=checked]:border-burgundy peer-data-[state=checked]:bg-cream transition-all">
                                            <MapPin className="w-6 h-6 mb-2 text-burgundy" />
                                            <span className="font-semibold text-burgundy">Delivery</span>
                                        </Label>
                                    </div>
                                </RadioGroup>

                                {/* Table number input for dine-in */}
                                {orderMode === 'dine-in' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-4 bg-orange-50 border border-orange-200 rounded-xl p-4"
                                    >
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">🪑 Table Number *</label>
                                        <input
                                            type="number"
                                            min={1}
                                            placeholder="Enter your table number (e.g. 5)"
                                            value={manualTableNumber}
                                            onChange={e => setManualTableNumber(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-burgundy outline-none text-gray-800 font-semibold text-lg text-center"
                                        />
                                        <p className="text-xs text-gray-500 mt-2">You'll find the table number on your table card or ask the staff.</p>
                                    </motion.div>
                                )}
                            </div>

                            <Button size="lg" className="w-full h-14 text-lg bg-burgundy hover:bg-burgundy/90 rounded-full" onClick={() => setStep(2)}>
                                Continue to Details
                            </Button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-orange-100"
                        >
                            <button onClick={() => setStep(1)} className="flex items-center text-burgundy hover:text-burgundy/80 mb-6 font-semibold">
                                <ChevronLeft className="w-5 h-5 mr-1" /> Back to Review
                            </button>

                            <h1 className="text-3xl font-display font-bold text-burgundy mb-6">Order Details</h1>

                            <form onSubmit={submitOrder} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" required placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" required type="tel" placeholder="+91" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                    </div>

                                    {orderMode === 'delivery' && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                            <Label htmlFor="address">Delivery Address</Label>
                                            <Input id="address" required placeholder="123 Main St, Appt 4" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                                        </motion.div>
                                    )}

                                    {orderMode === 'pickup' && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                            <Label htmlFor="time">Pickup Time</Label>
                                            <Input id="time" type="time" placeholder="ASAP" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} />
                                        </motion.div>
                                    )}
                                </div>

                                {/* Payment Method Selection */}
                                <div className="pt-4 border-t mt-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
                                    <RadioGroup
                                        value={formData.paymentMethod}
                                        onValueChange={(val) => setFormData({ ...formData, paymentMethod: val })}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    >
                                        <div className="relative">
                                            <RadioGroupItem value="cash" id="pay-cash" className="peer sr-only" />
                                            <Label htmlFor="pay-cash" className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-cream peer-data-[state=checked]:border-burgundy peer-data-[state=checked]:bg-cream transition-all">
                                                <div className="w-5 h-5 rounded-full border-2 border-gray-400 mr-3 peer-data-[state=checked]:border-burgundy flex items-center justify-center">
                                                    {formData.paymentMethod === 'cash' && <div className="w-2.5 h-2.5 bg-burgundy rounded-full" />}
                                                </div>
                                                <span className="font-semibold text-gray-800">Pay with Cash</span>
                                            </Label>
                                        </div>
                                        <div className="relative">
                                            <RadioGroupItem value="online" id="pay-online" className="peer sr-only" />
                                            <Label htmlFor="pay-online" className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-cream peer-data-[state=checked]:border-burgundy peer-data-[state=checked]:bg-cream transition-all">
                                                <div className="w-5 h-5 rounded-full border-2 border-gray-400 mr-3 peer-data-[state=checked]:border-burgundy flex items-center justify-center">
                                                    {formData.paymentMethod === 'online' && <div className="w-2.5 h-2.5 bg-burgundy rounded-full" />}
                                                </div>
                                                <span className="font-semibold text-gray-800">Pay Online</span>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <Button type="submit" size="lg" className="w-full h-14 text-lg bg-burgundy hover:bg-burgundy/90 flex justify-between px-6 rounded-full mt-4">
                                    <span>{formData.paymentMethod === 'online' ? 'Proceed to Pay' : 'Confirm Order'}</span>
                                    <span>₹{totalAmount}</span>
                                </Button>
                            </form>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-orange-100 text-center"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-green-600" />
                            </div>
                            <h1 className="text-4xl font-display font-bold text-burgundy mb-4">
                                {formData.paymentMethod === 'online' ? 'Payment Successful!' : 'Order Placed!'}
                            </h1>
                            <p className="text-lg text-gray-600 mb-8">
                                {orderMode === 'dine-in'
                                    ? `Your food is being prepared. It will be served at Table ${manualTableNumber}.`
                                    : orderMode === 'delivery'
                                        ? 'Your order is confirmed and will be delivered to your address soon.'
                                        : 'Your order is being prepared for pickup. We will see you soon!'}
                            </p>
                            <Button onClick={() => navigate('/menu')} size="lg" className="rounded-full bg-burgundy hover:bg-burgundy/90 h-14 px-8 text-lg">
                                Back to Menu
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
