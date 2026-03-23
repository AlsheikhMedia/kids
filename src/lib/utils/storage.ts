import { STORAGE_KEY } from '$lib/constants';
import type { Stroke } from '$lib/stores/drawing.svelte';

const MAX_STORAGE_BYTES = 4 * 1024 * 1024; // 4MB

function isValidStroke(stroke: unknown): stroke is Stroke {
	if (!stroke || typeof stroke !== 'object') return false;
	const s = stroke as Record<string, unknown>;
	return (
		Array.isArray(s.points) &&
		typeof s.color === 'string' &&
		typeof s.size === 'number' &&
		(s.tool === 'brush' || s.tool === 'eraser')
	);
}

export function saveDrawing(strokes: Stroke[]): boolean {
	try {
		const json = JSON.stringify(strokes);
		if (json.length > MAX_STORAGE_BYTES) return false;
		localStorage.setItem(STORAGE_KEY, json);
		return true;
	} catch {
		return false;
	}
}

export function loadDrawing(): Stroke[] | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;

		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return null;
		if (!parsed.every(isValidStroke)) return null;

		return parsed;
	} catch {
		return null;
	}
}

export function hasSavedDrawing(): boolean {
	try {
		return localStorage.getItem(STORAGE_KEY) !== null;
	} catch {
		return false;
	}
}

export function clearSavedDrawing(): void {
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch {
		// localStorage unavailable
	}
}
