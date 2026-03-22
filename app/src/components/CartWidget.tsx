import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '@/store';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { items, totalAmount, itemCount } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (itemCount === 0) return null;

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="fixed bottom-6 right-6 z-50"
                    >
                        <Button
                            size="lg"
                            className="rounded-full shadow-2xl bg-burgundy hover:bg-burgundy/90 text-white gap-2 px-6 h-14"
                            onClick={() => setIsOpen(true)}
                        >
                            <ShoppingBag className="w-5 h-5" />
                            <span className="font-semibold text-base">{itemCount} items</span>
                            <span className="mx-2 border-r border-white/30 h-6" />
                            <span className="font-semibold text-base">₹{totalAmount}</span>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent side="right" className="w-full sm:max-w-md flex flex-col h-full bg-[#FAFAFA] border-l-0 sm:border-l">
                    <SheetHeader className="text-left border-b pb-4">
                        <SheetTitle className="text-2xl font-display text-burgundy flex items-center gap-2">
                            <ShoppingBag className="w-6 h-6" />
                            Your Order
                        </SheetTitle>
                        <SheetDescription>
                            Review your items before proceeding to checkout.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-4 px-1">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl shadow-sm border border-orange-100">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-semibold text-burgundy text-sm sm:text-base line-clamp-2 leading-tight">{item.name}</h4>
                                        <p className="text-sm text-gray-500 font-medium mt-1">₹{item.price}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-3 bg-[#FAFAFA] rounded-full px-2 py-1 border">
                                            <button
                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                                                className="text-burgundy hover:text-orange-500 transition-colors p-1"
                                            >
                                                <Minus className="w-3.5 h-3.5" />
                                            </button>
                                            <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                                className="text-burgundy hover:text-orange-500 transition-colors p-1"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="text-red-500 hover:text-red-600 p-2 bg-red-50 rounded-full"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <SheetFooter className="border-t pt-6 mt-auto">
                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-center text-lg font-semibold text-burgundy">
                                <span>Subtotal</span>
                                <span>₹{totalAmount}</span>
                            </div>
                            <Button
                                className="w-full h-14 text-lg bg-burgundy hover:bg-burgundy/90 text-white rounded-full shadow-lg"
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate('/checkout');
                                }}
                            >
                                Proceed to Checkout
                            </Button>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    );
}
