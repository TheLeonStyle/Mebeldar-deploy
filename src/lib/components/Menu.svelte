<script>
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import { slide } from 'svelte/transition';
	import { isMenuOpen, menuStore } from '$lib/stores';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	const handleLinkClick = (path) => {
		menuStore.close();
		goto(path);
	};
</script>

<section class="menu" transition:slide>
	<Header />

	<nav class="menu__nav">
		<a
			href="/"
			class="menu__link"
			class:active={page.url.pathname === '/'}
			onclick={() => handleLinkClick('/')}>
			Главная
		</a>
		<a
			href="/calculator"
			class="menu__link"
			class:active={page.url.pathname === '/calculator'}
			onclick={() => handleLinkClick('/calculator')}>
			Калькулятор
		</a>
		<a
			href="/portfolio"
			class="menu__link"
			class:active={page.url.pathname === '/portfolio'}
			onclick={() => handleLinkClick('/portfolio')}>
			Портфолио
		</a>
		<a
			href="/about"
			class="menu__link"
			class:active={page.url.pathname === '/about'}
			onclick={() => handleLinkClick('/about')}>
			О нас
		</a>
	</nav>

	<Footer />
</section>

<style lang="scss">
	.menu {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 20;
		background-color: #f1ece9;

		display: flex;
		flex-direction: column;
		gap: rem(10);

		width: 100%;
		min-height: 100dvh;
		max-height: 100%;
		overflow: scroll;

		// @include adaptiveValue('top', 87, 77, 767, 479, 1);
		// padding-left: rem(15);
		// padding-right: rem(15);

		/* .menu__nav */
		&__nav {
			flex: 1;
			justify-content: center;

			display: flex;
			flex-direction: column;
			gap: rem(20);
		}
		/* .menu__link */
		&__link {
			color: #3f2c24;
			font-family: Jost;
			font-weight: 300;
			// font-size: rem(40);
			@include adaptiveValue('font-size', 40, 30, 767, 479, 1);
			line-height: 150%;
			letter-spacing: -1.1%;
			text-align: center;
			text-transform: uppercase;
			transition: font-weight 0.7s ease 0s;

			&.active,
			&:hover {
				font-weight: 500;
				border-left: rem(3) solid #3f2c24;
			}
		}
	}
</style>
