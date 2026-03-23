export interface PaletteColor {
	hex: string;
	nameAr: string;
}

export const PALETTE: PaletteColor[] = [
	{ hex: '#e74c3c', nameAr: 'أحمر' },
	{ hex: '#f39c12', nameAr: 'برتقالي' },
	{ hex: '#f1c40f', nameAr: 'أصفر' },
	{ hex: '#27ae60', nameAr: 'أخضر' },
	{ hex: '#3498db', nameAr: 'أزرق' },
	{ hex: '#8e44ad', nameAr: 'بنفسجي' },
	{ hex: '#e91e8f', nameAr: 'وردي' },
	{ hex: '#795548', nameAr: 'بني' },
	{ hex: '#2c3e50', nameAr: 'أسود' },
	{ hex: '#ecf0f1', nameAr: 'أبيض' }
];

export type BrushSize = 'small' | 'medium' | 'large';

export const BRUSH_SIZES: Record<BrushSize, number> = {
	small: 4,
	medium: 8,
	large: 14
};

export const CANVAS_BACKGROUND = '#fffdf9';
export const AUTO_SAVE_INTERVAL_MS = 30_000;
export const CLEAR_CONFIRM_TIMEOUT_MS = 2_000;
export const STORAGE_KEY = 'alsheikh-kids-painting';
