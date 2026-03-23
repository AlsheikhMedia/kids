export interface GameInfo {
	id: string;
	title: string;
	description: string;
	href: string;
	gradient: string;
	borderColor: string;
	ageRange: string;
	icon: string;
	featured: boolean;
	comingSoon: boolean;
}

export const GAMES: GameInfo[] = [
	{
		id: 'paint',
		title: 'لوحة الرسم الحرة',
		description: 'ارسم وتلوين بأصابعك! ألوان وأحجام مختلفة مع ممحاة سحرية',
		href: '/paint',
		gradient: 'linear-gradient(135deg, #FF6B6B, #EE5A24)',
		borderColor: 'rgba(238, 90, 36, 0.3)',
		ageRange: '٢ - ٥ سنوات',
		icon: 'openmoji:artist-palette',
		featured: true,
		comingSoon: false
	},
	{
		id: 'colors',
		title: 'طابق الألوان',
		description: 'تعلم الألوان عبر المطابقة',
		href: '/games/colors',
		gradient: 'linear-gradient(135deg, #FDCB6E, #E17055)',
		borderColor: 'rgba(225, 112, 85, 0.3)',
		ageRange: '٢ - ٤ سنوات',
		icon: 'openmoji:rainbow',
		featured: false,
		comingSoon: true
	},
	{
		id: 'numbers',
		title: 'رتب الأرقام',
		description: '١ إلى ١٠ بالترتيب الصحيح',
		href: '/games/numbers',
		gradient: 'linear-gradient(135deg, #55EFC4, #00B894)',
		borderColor: 'rgba(0, 184, 148, 0.3)',
		ageRange: '٣ - ٥ سنوات',
		icon: 'openmoji:input-numbers',
		featured: false,
		comingSoon: true
	},
	{
		id: 'alphabet',
		title: 'رتب الحروف',
		description: 'تعلم ترتيب الحروف العربية',
		href: '/games/alphabet',
		gradient: 'linear-gradient(135deg, #74B9FF, #0984E3)',
		borderColor: 'rgba(9, 132, 227, 0.3)',
		ageRange: '٣ - ٥ سنوات',
		icon: 'openmoji:open-book',
		featured: false,
		comingSoon: true
	},
	{
		id: 'puzzle',
		title: 'الأحجية',
		description: 'ركّب القطع في مكانها الصحيح',
		href: '/games/puzzle',
		gradient: 'linear-gradient(135deg, #A29BFE, #6C5CE7)',
		borderColor: 'rgba(108, 92, 231, 0.3)',
		ageRange: '٣ - ٥ سنوات',
		icon: 'openmoji:puzzle-piece',
		featured: false,
		comingSoon: true
	}
];
