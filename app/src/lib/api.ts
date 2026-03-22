/**
 * api.ts — Thin client for the Vrindas Express/Neon backend
 * All functions call /api/* which is proxied to localhost:3001 in dev
 * and should be configured on your deployment host for production.
 */

import type { Order, OrderStatus } from '@/types';

const BASE = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`API ${res.status}: ${body}`);
    }
    return res.json() as Promise<T>;
}

// ─── Health ───────────────────────────────────────────────────────────────────
export async function checkHealth() {
    return request<{ status: string; db: string; timestamp: string }>('/health');
}

// ─── Orders ──────────────────────────────────────────────────────────────────
export async function fetchOrders(): Promise<Order[]> {
    return request<Order[]>('/orders');
}

export async function createOrder(order: Order): Promise<{ success: boolean; id: string }> {
    return request<{ success: boolean; id: string }>('/orders', {
        method: 'POST',
        body: JSON.stringify(order),
    });
}

export async function updateOrderStatusAPI(
    id: string,
    status: OrderStatus
): Promise<{ success: boolean; id: string; status: OrderStatus }> {
    return request(`/orders/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    });
}

// ─── Menu Overrides ───────────────────────────────────────────────────────────
export interface MenuOverride {
    item_id: string;
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    image?: string;
    is_available?: boolean;
    is_veg?: boolean;
}

export async function fetchMenuOverrides(): Promise<MenuOverride[]> {
    return request<MenuOverride[]>('/menu-overrides');
}

export async function upsertMenuOverride(itemId: string, data: Omit<MenuOverride, 'item_id'>) {
    return request(`/menu-overrides/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deleteMenuOverride(itemId: string) {
    return request(`/menu-overrides/${itemId}`, { method: 'DELETE' });
}
