import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Printer, Info } from 'lucide-react';

const MENU_URL = `${window.location.origin}/menu`;

export default function QRCodeGenerator() {
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        const content = printRef.current?.innerHTML || '';
        const win = window.open('', '_blank');
        if (!win) return;
        win.document.write(`<html><head><title>Vrindas Menu QR Code</title>
        <style>
            body { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; font-family:Arial,sans-serif; padding:40px; }
            h1 { font-size:28px; font-weight:bold; color:#7a1a2e; margin-bottom:4px; }
            p { color:#666; font-size:14px; margin:4px 0; text-align:center; }
            .qr-box { border:2px dashed #ccc; border-radius:16px; padding:24px; margin:20px 0; background:#fff; }
            .footer { margin-top:16px; font-size:12px; color:#aaa; }
        </style></head><body>${content}</body></html>`);
        win.document.close();
        win.print();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Menu QR Code</h2>
                <p className="text-sm text-gray-500 mt-1">Print this single QR code and place it on every table. Customers scan it to open your live menu and order directly.</p>
            </div>

            {/* Info banner */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                    <p className="font-semibold mb-0.5">How it works</p>
                    <p>When a customer scans this QR code, they land on your live menu page and can add items to cart. At checkout, if they choose <strong>Dine-in</strong>, they will be prompted to enter their table number. This way, one single QR card works for every table.</p>
                </div>
            </div>

            {/* QR Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md">
                <div ref={printRef} className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold text-burgundy mb-1">VRINDAS</h1>
                    <p className="text-gray-500 text-sm mb-6">Scan to view menu & order</p>

                    <div className="bg-white p-4 border-2 border-dashed border-gray-200 rounded-2xl mb-6">
                        <QRCodeSVG
                            value={MENU_URL}
                            size={220}
                            level="H"
                            includeMargin={true}
                        />
                    </div>

                    <p className="text-xs text-gray-400 font-mono break-all max-w-xs">{MENU_URL}</p>
                    <p className="text-xs text-gray-500 mt-3 font-medium">📍 Scan → Browse Menu → Add to Cart → Checkout</p>

                    <div className="mt-4 text-xs text-gray-400 border-t pt-3 w-full">
                        Vrindas Restaurant · Kanpur
                    </div>
                </div>

                <button
                    onClick={handlePrint}
                    className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-burgundy text-white font-semibold rounded-xl hover:bg-burgundy/90 transition-colors shadow-sm"
                >
                    <Printer className="w-5 h-5" /> Print / Download QR Code
                </button>

                <div className="mt-4 flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                    <QrCode className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <p className="text-xs text-green-700 font-medium">One QR for all tables — Customers enter their table number at checkout when selecting Dine-in.</p>
                </div>
            </div>
        </div>
    );
}
