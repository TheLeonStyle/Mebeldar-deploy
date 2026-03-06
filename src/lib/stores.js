import { writable } from 'svelte/store';

// Header
export const isMenuOpen = writable(false);
export const menuStore = {
	open: () => isMenuOpen.set(true),
	close: () => isMenuOpen.set(false),
	toggle: () => isMenuOpen.update((value) => !value)
};
