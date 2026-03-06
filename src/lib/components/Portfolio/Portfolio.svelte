<script>
	import KeenSlider from 'keen-slider';
	import { onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	
	const {portfolio} = $props()
	
	console.log(portfolio);

	// Комнаты
	const rooms = [
		{
			src: '/img/Portfolio/portfolio/rooms/kitchen.png',
			text: 'Кухни'
		},
		{
			src: '/img/Portfolio/portfolio/rooms/living.png',
			text: 'Гостиные'
		},
		{
			src: '/img/Portfolio/portfolio/rooms/working.png',
			text: 'Рабочие зоны'
		},
		{
			src: '/img/Portfolio/portfolio/rooms/bedroom.png',
			text: 'Спальни'
		},
		{
			src: '/img/Portfolio/portfolio/rooms/children.png',
			text: 'Детская'
		},
		{
			src: '/img/Portfolio/portfolio/rooms/bathroom.png',
			text: 'Сан узел'
		},
		{
			src: '/img/Portfolio/portfolio/rooms/hallway.png',
			text: 'Прихожая'
		},
		{
			src: '/img/Portfolio/portfolio/rooms/shelves.png',
			text: 'Стиллажи'
		},
		{
			src: '/img/Portfolio/portfolio/rooms/cabinets.png',
			text: 'Шкафы-купе'
		}
	];
	let roomActiveIndex = $state(0);

	// Фильтр
	const filters = [
		{
			categories: 'Форма',
			lists: ['Прямая', 'Угловая (Г-образная)', 'П-образная', 'С островом']
		},
		{
			categories: 'Стиль',
			lists: [
				'Современный (гладкие фасады, без ручек)',
				'Классический',
				'Неоклассика',
				'Скандинавский',
				'Лофт',
				'Минимализм',
				'Прованс'
			]
		},
		{
			categories: 'Все проекты',
			lists: ['Базовый', 'Оптимум', 'Премиум']
		}
	];

	let openFilter = $state(filters.map(() => false));
	let anyOpenFilter = $derived(openFilter.some(Boolean));

	const toggleFilter = (index) => {
		openFilter[index] = !openFilter[index];
	};
	const toggleAllFilter = () => {
		if (anyOpenFilter) openFilter = openFilter.map(() => false);
		else openFilter = openFilter.map(() => true);
	};
	const resetFilter = () => (openFilter = openFilter.map(() => false));

	// Галерея
	const galleries_first = [
		{
			items: [
				{
					src: '/img/Portfolio/portfolio/gallery/1.jpg',
					alt: '',
					popup: ['Проект', 'Название', 'Цена: XXX 000 ₽']
				}
			]
		},
		{
			items: [
				{
					src: '/img/Portfolio/portfolio/gallery/2.jpg',
					alt: '',
					popup: ['Проект', 'Название', 'Цена: XXX 000 ₽']
				},
				{
					src: '/img/Portfolio/portfolio/gallery/3.jpg',
					alt: '',
					popup: ['Проект', 'Название', 'Цена: XXX 000 ₽']
				}
			]
		},
		{
			items: [
				{
					src: '/img/Portfolio/portfolio/gallery/4.jpg',
					alt: '',
					popup: ['Проект', 'Название', 'Цена: XXX 000 ₽']
				},
				{
					src: '/img/Portfolio/portfolio/gallery/5.jpg',
					alt: '',
					popup: ['Проект', 'Название', 'Цена: XXX 000 ₽']
				}
			]
		}
	];
	const galleries_second = [
		{
			items: [
				{
					src: '/img/Portfolio/portfolio/gallery/6.jpg',
					alt: '',
					popup: ['Проект', 'Название', 'Цена: XXX 000 ₽']
				}
			]
		},
		{
			items: [
				{
					src: '/img/Portfolio/portfolio/gallery/7.jpg',
					alt: '',
					popup: ['Проект', 'Название', 'Цена: XXX 000 ₽']
				},
				{
					src: '/img/Portfolio/portfolio/gallery/8.jpg',
					alt: '',
					popup: ['Проект', 'Название', 'Цена: XXX 000 ₽']
				}
			]
		},
		{
			items: [
				{
					src: '/img/Portfolio/portfolio/gallery/9.jpg',
					alt: '',
					popup: ['Проект', 'Название', 'Цена: XXX 000 ₽']
				},
				{
					src: '/img/Portfolio/portfolio/gallery/10.jpg',
					alt: '',
					popup: ['Проект', 'Название', 'Цена: XXX 000 ₽']
				}
			]
		}
	];

	let galleryIndexPopup = $state(0);

	const toggleGalleryPopup = (group, listIndex, itemIndex) => {
		const key = `${group}_${listIndex}_${itemIndex}`;
		galleryIndexPopup = galleryIndexPopup === key ? null : key;
	};

	// Показать еще
	let showGallery = $state(false);

	const setShowGallery = () => {
		showGallery = !showGallery;
	};

	// Контент

	let showContentTop = $state(false);
	let showContentMiddle = $state(false);
	let showContentBottom = $state(false);
	let contentImage = $state('/img/Portfolio/portfolio/gallery/1.jpg');

	const clickGallery = (src, position) => {
		contentImage = src;

		if (position === 'top') {
			showContentTop = true;
			showContentMiddle = false;
			showContentBottom = false;
		} else if (position === 'middle') {
			showContentTop = false;
			showContentMiddle = true;
			showContentBottom = false;
		} else {
			showContentTop = false;
			showContentMiddle = false;
			showContentBottom = true;
		}
	};

	// =============================================================================

	// Слайдер фильтра
	let sliderFilterRef = $state(null);

	// Слайдер портфолио
	let slider;
	let sliderPortfolioRef = $state(null);
	let currentSlide = $state(0);

	const throttle = (func, interval) => {
		let lastCall = 0;
		return function (...args) {
			const now = Date.now();
			if (lastCall + interval < now) {
				lastCall = now;
				return func.apply(this, args);
			}
		};
	};

	$effect(() => {
		new KeenSlider(sliderFilterRef, {
			mode: 'free-snap',
			slides: {
				perView: 'auto',
				spacing: 20
			}
		});

		slider = new KeenSlider(sliderPortfolioRef, {
			mode: 'free-snap',
			breakpoints: {
				'(min-width: 320px)': {
					vertical: false
				},
				'(min-width: 1220px)': {
					slides: { origin: 'center', perView: 1, spacing: 20 },
					vertical: true
				}
			},
			loop: true,
			slides: {
				perView: 1,
				spacing: 0
			},
			vertical: true,

			slideChanged(s) {
				currentSlide = s.track.details.rel;
			}
		});

		const onWheel = throttle((e) => {
			e.preventDefault();
			if (e.deltaY > 0) {
				slider.next();
			} else if (e.deltaY < 0) {
				slider.prev();
			}
		}, 500);

		sliderPortfolioRef.addEventListener('wheel', onWheel);

		onDestroy(() => {
			sliderPortfolioRef.removeEventListener('wheel', onWheel);
			slider.destroy && slider.destroy();
		});
	});

	const nextSlide = () => slider.next();
</script>

<section id="portfolio" class="portfolio">
	<div class="portfolio__container">
		<header class="portfolio__header" data-aos="fade-up">
			<h2 class="portfolio__header-title">Портфолио</h2>
			<div class="portfolio__header-text">
				<h3 class="portfolio__header-heading">
					Наши реальные
					<p>проекты</p>
				</h3>
				<p class="portfolio__header-subtitle">Каждый проект можно адаптировать под Ваш интерьер</p>
			</div>
		</header>
	</div>

	<ul bind:this={sliderFilterRef} class="portfolio__rooms" data-aos="fade-up">
		{#each rooms as room, index}
			<li
				class="portfolio__rooms-room keen-slider__slide"
				class:active={roomActiveIndex === index}
				onclick={() => (roomActiveIndex = index)}>
				<img src={room.src} alt={room.text} class="portfolio__rooms-image" />
				<p class="portfolio__rooms-text">{room.text}</p>
			</li>
		{/each}
	</ul>

	<div class="portfolio__container">
		<div class="portfolio__filter" data-aos="fade-up">
			{#each filters as filter, index (filter.categories)}
				<div class="portfolio__filter-column">
					<button
						class="portfolio__filter-button portfolio__filter-button--categories"
						onclick={() => toggleFilter(index)}>
						{filter.categories}
						<div class="portfolio__filter-button-icon">
							<svg viewBox="0 0 3.56641 6.48389" width="3.566406" height="6.483887">
								<path
									d="M0.41 6.484C0.298 6.484 0.201667 6.44733 0.121 6.374C0.0403336 6.29933 0 6.20167 0 6.081L0 0.403999C0 0.282666 0.0413329 0.185 0.124 0.111C0.206666 0.0370001 0.302666 1.77636e-15 0.412 0C0.44 0 0.534667 0.0433325 0.696 0.129999L3.373 2.808C3.435 2.86933 3.48267 2.93567 3.516 3.007C3.54933 3.07833 3.566 3.15667 3.566 3.242C3.566 3.32733 3.54933 3.40567 3.516 3.477C3.48267 3.54833 3.435 3.615 3.373 3.677L0.696 6.354C0.659333 6.39067 0.616334 6.42167 0.567 6.447C0.518334 6.47167 0.466 6.484 0.41 6.484Z"
									fill="rgb(123,94,87)" />
							</svg>
						</div>
					</button>
					{#if openFilter[index]}
						<ul class="portfolio__filter-lists" transition:slide>
							{#each filter.lists as list, i}
								<li class="portfolio__filter-list portfolio__filter-button">
									<span>→</span>
									{list}
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
			<button
				class="portfolio__filter-button portfolio__filter-button--categories portfolio__filter-button--toggle"
				onclick={toggleAllFilter}>
				{anyOpenFilter ? 'Скрыть' : 'Показать'}
			</button>
		</div>

		<div class="portfolio__wrapper">
			<div class="portfolio__gallery">
				{#each galleries_first as list, listIndex}
					<ul class="portfolio__gallery-items">
						{#each list.items as item, itemIndex}
							<li
								class="portfolio__gallery-item"
								data-aos="zoom-in"
								onclick={() => clickGallery(item.src, 'top')}>
								<img src={item.src} alt={item.alt} class="portfolio__gallery-image" />
								<svg
									viewBox="0 0 27 27"
									width="27"
									height="27"
									fill="none"
									class="portfolio__gallery-icon"
									onclick={() => toggleGalleryPopup('first', listIndex, itemIndex)}>
									<circle cx="13.5" cy="13.5" r="10.5" fill="rgb(250,248,245)" />
									<circle cx="13.5" cy="13.5" r="10" stroke="rgb(250,248,245)" />
									<circle cx="13.5" cy="13.5" r="13" stroke="rgb(250,248,245)" />
								</svg>
								<div
									class="portfolio__gallery-popup"
									class:active={galleryIndexPopup === `first_${listIndex}_${itemIndex}`}>
									{#each item.popup as text}
										<p class="portfolio__gallery-popup-text">{text}</p>
									{/each}
								</div>
							</li>
						{/each}
					</ul>
				{/each}
			</div>

			{#if showContentTop}
				<div class="portfolio__project" data-aos="zoom-in">
					<div class="portfolio__project-content">
						<div class="portfolio__project-content-text">
							<h6 class="portfolio__project-content-title">Проект Эхо фактур</h6>
							<p class="portfolio__project-content-subtitle">
								<b>Стильная кухня в чёрном цвете с акцентом под дерево,</b>
								в которой идеально сочетаются глубокий матовый чёрный и тёплая текстура натурального
								дерева. Гармоничный контраст придаёт интерьеру выразительность и премиальный вид.
							</p>
						</div>
						<div class="portfolio__project-content-bullets" onclick={nextSlide}>
							<svg width="29.166504" height="35.833496" viewBox="0 0 29.1665 35.8335">
								<path
									d="M14.58 6.25L15.46 5.36C15.23 5.13 14.91 5 14.58 5C14.25 5 13.93 5.13 13.7 5.36L14.58 6.25ZM14.58 19.58L13.7 20.46C13.93 20.7 14.25 20.83 14.58 20.83C14.91 20.83 15.23 20.7 15.46 20.46L14.58 19.58ZM10.36 8.7C10.14 8.93 10.02 9.25 10.03 9.57C10.03 9.89 10.16 10.2 10.39 10.43C10.62 10.66 10.93 10.79 11.25 10.8C11.58 10.8 11.89 10.68 12.13 10.46L10.36 8.7ZM17.03 10.46C17.14 10.58 17.28 10.68 17.43 10.75C17.59 10.82 17.75 10.86 17.92 10.86C18.09 10.86 18.26 10.83 18.41 10.77C18.57 10.71 18.71 10.61 18.83 10.49C18.95 10.37 19.04 10.23 19.1 10.08C19.16 9.92 19.2 9.76 19.19 9.59C19.19 9.42 19.15 9.25 19.08 9.1C19.02 8.95 18.92 8.81 18.79 8.7L17.03 10.46ZM12.13 15.36C12.01 15.24 11.88 15.14 11.72 15.07C11.57 15 11.4 14.97 11.24 14.96C11.07 14.96 10.9 14.99 10.75 15.05C10.59 15.12 10.45 15.21 10.33 15.33C10.21 15.45 10.12 15.59 10.05 15.75C9.99 15.9 9.96 16.07 9.96 16.24C9.97 16.4 10 16.57 10.07 16.72C10.14 16.88 10.24 17.01 10.36 17.13L12.13 15.36ZM18.79 17.13C18.92 17.01 19.02 16.88 19.08 16.72C19.15 16.57 19.19 16.4 19.19 16.24C19.2 16.07 19.16 15.9 19.1 15.75C19.04 15.59 18.95 15.45 18.83 15.33C18.71 15.21 18.57 15.12 18.41 15.05C18.26 14.99 18.09 14.96 17.92 14.96C17.75 14.97 17.59 15 17.43 15.07C17.28 15.14 17.14 15.24 17.03 15.36L18.79 17.13ZM0 14.58L0 21.25L2.5 21.25L2.5 14.58L0 14.58ZM29.16 21.25L29.16 14.58L26.66 14.58L26.66 21.25L29.16 21.25ZM13.33 6.25L13.33 19.58L15.83 19.58L15.83 6.25L13.33 6.25ZM13.7 5.36L10.36 8.7L12.13 10.46L15.46 7.13L13.7 5.36ZM13.7 7.13L17.03 10.46L18.79 8.7L15.46 5.36L13.7 7.13ZM15.46 18.7L12.13 15.36L10.36 17.13L13.7 20.46L15.46 18.7ZM15.46 20.46L18.79 17.13L17.03 15.36L13.7 18.7L15.46 20.46ZM29.16 14.58C29.16 10.71 27.63 7 24.89 4.27C22.16 1.53 18.45 0 14.58 0L14.58 2.5C17.78 2.5 20.86 3.77 23.12 6.03C25.39 8.3 26.66 11.37 26.66 14.58L29.16 14.58ZM14.58 35.83C16.49 35.83 18.39 35.45 20.16 34.72C21.93 33.99 23.54 32.91 24.89 31.56C26.24 30.2 27.32 28.6 28.05 26.83C28.78 25.06 29.16 23.16 29.16 21.25L26.66 21.25C26.66 24.45 25.39 27.52 23.12 29.79C20.86 32.06 17.78 33.33 14.58 33.33L14.58 35.83ZM0 21.25C0 25.11 1.53 28.82 4.27 31.56C7 34.29 10.71 35.83 14.58 35.83L14.58 33.33C11.37 33.33 8.3 32.06 6.03 29.79C3.77 27.52 2.5 24.45 2.5 21.25L0 21.25ZM2.5 14.58C2.5 11.37 3.77 8.3 6.03 6.03C8.3 3.77 11.37 2.5 14.58 2.5L14.58 0C10.71 0 7 1.53 4.27 4.27C1.53 7 0 10.71 0 14.58L2.5 14.58Z"
									fill="#7B5E57" />
							</svg>

							<div class="portfolio__project-content-bullet">
								{#each Array(3) as _, index}
									<span class:active={currentSlide === index}></span>
								{/each}
							</div>
						</div>
					</div>

					<ul bind:this={sliderPortfolioRef} class="portfolio__project-media">
						<li class="portfolio__project-media-item keen-slider__slide">
							<img src={contentImage} alt="" class="portfolio__project-media-image" />
						</li>
						<li class="portfolio__project-media-item keen-slider__slide">
							<img src={contentImage} alt="" class="portfolio__project-media-image" />
						</li>
						<li class="portfolio__project-media-item keen-slider__slide">
							<img src={contentImage} alt="" class="portfolio__project-media-image" />
						</li>
					</ul>

					<div class="portfolio__project-info">
						<div class="portfolio__project-info-text">
							<h5 class="portfolio__project-info-heading">Материалы:</h5>

							<div class="portfolio__project-info-wrapper">
								<h6 class="portfolio__project-info-title">Фасады</h6>
								<p class="portfolio__project-info-subtitle">
									— EGGER PerfectSense чёрный + Филвуд Дуб Галифакс Олово
								</p>
								<h6 class="portfolio__project-info-title">Столешница</h6>
								<p class="portfolio__project-info-subtitle">
									— HPL-пластик 12 мм, цвет Камень Пьетра Гриджиа Чёрный
								</p>
								<h6 class="portfolio__project-info-title">Фурнитура</h6>
								<p class="portfolio__project-info-subtitle">— Hettich с доводчиками</p>
								<h6 class="portfolio__project-info-title">Подъёмные механизмы</h6>
								<p class="portfolio__project-info-subtitle">— Aventos Blum</p>
								<h6 class="portfolio__project-info-title">Ручки</h6>
								<p class="portfolio__project-info-subtitle">— интегрированный профиль Gola</p>
								<h6 class="portfolio__project-info-title">Стиль</h6>
								<p class="portfolio__project-info-subtitle">— минимализм с тёплыми акцентами</p>
							</div>

							<div class="portfolio__project-info-prices">
								<p>Цена:</p>
								<p>400 000 ₽</p>
							</div>

							<footer class="portfolio__project-info-footer">
								<p>Состояние до ремонта</p>
								<div class="portfolio__project-info-thumbnails">
									<img
										src="/img/Portfolio/portfolio/thumbnails/image.jpg"
										alt=""
										class="portfolio__project-info-thumbnail" />
									<img
										src="/img/Portfolio/portfolio/thumbnails/image.jpg"
										alt=""
										class="portfolio__project-info-thumbnail" />
									<img
										src="/img/Portfolio/portfolio/thumbnails/image.jpg"
										alt=""
										class="portfolio__project-info-thumbnail" />
								</div>
							</footer>
						</div>

						<a href="/" class="portfolio__project-info-link">
							<div class="portfolio__project-info-icon">
								<svg viewBox="0 0 31.9453 31.9873" width="31.945312" height="31.987305">
									<path
										d="M29.9453 28L29.9453 0L31.9453 0L31.9453 28L29.9453 28Z"
										fill="rgb(255,255,255)" />
									<path
										d="M0 30.5731L29.5731 1L30.9873 2.4142L1.4142 31.9873L0 30.5731Z"
										fill="rgb(255,255,255)" />
									<path
										d="M3.94531 0L31.9453 0L31.9453 2L3.94531 2L3.94531 0Z"
										fill="rgb(255,255,255)" />
								</svg>
							</div>

							<p>хочу такую</p>
						</a>
					</div>
				</div>
			{/if}

			<div class="portfolio__gallery">
				{#each galleries_second as list, listIndex}
					<ul class="portfolio__gallery-items">
						{#each list.items as item, itemIndex}
							<li
								class="portfolio__gallery-item"
								data-aos="zoom-in"
								onclick={() => clickGallery(item.src, 'middle')}>
								<img src={item.src} alt={item.alt} class="portfolio__gallery-image" />
								<svg
									viewBox="0 0 27 27"
									width="27"
									height="27"
									fill="none"
									class="portfolio__gallery-icon"
									onclick={() => toggleGalleryPopup('second', listIndex, itemIndex)}>
									<circle cx="13.5" cy="13.5" r="10.5" fill="rgb(250,248,245)" />
									<circle cx="13.5" cy="13.5" r="10" stroke="rgb(250,248,245)" />
									<circle cx="13.5" cy="13.5" r="13" stroke="rgb(250,248,245)" />
								</svg>
								<div
									class="portfolio__gallery-popup"
									class:active={galleryIndexPopup === `second_${listIndex}_${itemIndex}`}>
									{#each item.popup as text}
										<p class="portfolio__gallery-popup-text">{text}</p>
									{/each}
								</div>
							</li>
						{/each}
					</ul>
				{/each}
			</div>

			{#if showContentMiddle}
				<div class="portfolio__project" data-aos="zoom-in">
					<div class="portfolio__project-content">
						<div class="portfolio__project-content-text">
							<h6 class="portfolio__project-content-title">Проект Эхо фактур</h6>
							<p class="portfolio__project-content-subtitle">
								<b>Стильная кухня в чёрном цвете с акцентом под дерево,</b>
								в которой идеально сочетаются глубокий матовый чёрный и тёплая текстура натурального
								дерева. Гармоничный контраст придаёт интерьеру выразительность и премиальный вид.
							</p>
						</div>
						<div class="portfolio__project-content-bullets" onclick={nextSlide}>
							<svg width="29.166504" height="35.833496" viewBox="0 0 29.1665 35.8335">
								<path
									d="M14.58 6.25L15.46 5.36C15.23 5.13 14.91 5 14.58 5C14.25 5 13.93 5.13 13.7 5.36L14.58 6.25ZM14.58 19.58L13.7 20.46C13.93 20.7 14.25 20.83 14.58 20.83C14.91 20.83 15.23 20.7 15.46 20.46L14.58 19.58ZM10.36 8.7C10.14 8.93 10.02 9.25 10.03 9.57C10.03 9.89 10.16 10.2 10.39 10.43C10.62 10.66 10.93 10.79 11.25 10.8C11.58 10.8 11.89 10.68 12.13 10.46L10.36 8.7ZM17.03 10.46C17.14 10.58 17.28 10.68 17.43 10.75C17.59 10.82 17.75 10.86 17.92 10.86C18.09 10.86 18.26 10.83 18.41 10.77C18.57 10.71 18.71 10.61 18.83 10.49C18.95 10.37 19.04 10.23 19.1 10.08C19.16 9.92 19.2 9.76 19.19 9.59C19.19 9.42 19.15 9.25 19.08 9.1C19.02 8.95 18.92 8.81 18.79 8.7L17.03 10.46ZM12.13 15.36C12.01 15.24 11.88 15.14 11.72 15.07C11.57 15 11.4 14.97 11.24 14.96C11.07 14.96 10.9 14.99 10.75 15.05C10.59 15.12 10.45 15.21 10.33 15.33C10.21 15.45 10.12 15.59 10.05 15.75C9.99 15.9 9.96 16.07 9.96 16.24C9.97 16.4 10 16.57 10.07 16.72C10.14 16.88 10.24 17.01 10.36 17.13L12.13 15.36ZM18.79 17.13C18.92 17.01 19.02 16.88 19.08 16.72C19.15 16.57 19.19 16.4 19.19 16.24C19.2 16.07 19.16 15.9 19.1 15.75C19.04 15.59 18.95 15.45 18.83 15.33C18.71 15.21 18.57 15.12 18.41 15.05C18.26 14.99 18.09 14.96 17.92 14.96C17.75 14.97 17.59 15 17.43 15.07C17.28 15.14 17.14 15.24 17.03 15.36L18.79 17.13ZM0 14.58L0 21.25L2.5 21.25L2.5 14.58L0 14.58ZM29.16 21.25L29.16 14.58L26.66 14.58L26.66 21.25L29.16 21.25ZM13.33 6.25L13.33 19.58L15.83 19.58L15.83 6.25L13.33 6.25ZM13.7 5.36L10.36 8.7L12.13 10.46L15.46 7.13L13.7 5.36ZM13.7 7.13L17.03 10.46L18.79 8.7L15.46 5.36L13.7 7.13ZM15.46 18.7L12.13 15.36L10.36 17.13L13.7 20.46L15.46 18.7ZM15.46 20.46L18.79 17.13L17.03 15.36L13.7 18.7L15.46 20.46ZM29.16 14.58C29.16 10.71 27.63 7 24.89 4.27C22.16 1.53 18.45 0 14.58 0L14.58 2.5C17.78 2.5 20.86 3.77 23.12 6.03C25.39 8.3 26.66 11.37 26.66 14.58L29.16 14.58ZM14.58 35.83C16.49 35.83 18.39 35.45 20.16 34.72C21.93 33.99 23.54 32.91 24.89 31.56C26.24 30.2 27.32 28.6 28.05 26.83C28.78 25.06 29.16 23.16 29.16 21.25L26.66 21.25C26.66 24.45 25.39 27.52 23.12 29.79C20.86 32.06 17.78 33.33 14.58 33.33L14.58 35.83ZM0 21.25C0 25.11 1.53 28.82 4.27 31.56C7 34.29 10.71 35.83 14.58 35.83L14.58 33.33C11.37 33.33 8.3 32.06 6.03 29.79C3.77 27.52 2.5 24.45 2.5 21.25L0 21.25ZM2.5 14.58C2.5 11.37 3.77 8.3 6.03 6.03C8.3 3.77 11.37 2.5 14.58 2.5L14.58 0C10.71 0 7 1.53 4.27 4.27C1.53 7 0 10.71 0 14.58L2.5 14.58Z"
									fill="#7B5E57" />
							</svg>

							<div class="portfolio__project-content-bullet">
								{#each Array(3) as _, index}
									<span class:active={currentSlide === index}></span>
								{/each}
							</div>
						</div>
					</div>

					<ul bind:this={sliderPortfolioRef} class="portfolio__project-media">
						<li class="portfolio__project-media-item keen-slider__slide">
							<img src={contentImage} alt="" class="portfolio__project-media-image" />
						</li>
						<li class="portfolio__project-media-item keen-slider__slide">
							<img src={contentImage} alt="" class="portfolio__project-media-image" />
						</li>
						<li class="portfolio__project-media-item keen-slider__slide">
							<img src={contentImage} alt="" class="portfolio__project-media-image" />
						</li>
					</ul>

					<div class="portfolio__project-info">
						<div class="portfolio__project-info-text">
							<h5 class="portfolio__project-info-heading">Материалы:</h5>

							<div class="portfolio__project-info-wrapper">
								<h6 class="portfolio__project-info-title">Фасады</h6>
								<p class="portfolio__project-info-subtitle">
									— EGGER PerfectSense чёрный + Филвуд Дуб Галифакс Олово
								</p>
								<h6 class="portfolio__project-info-title">Столешница</h6>
								<p class="portfolio__project-info-subtitle">
									— HPL-пластик 12 мм, цвет Камень Пьетра Гриджиа Чёрный
								</p>
								<h6 class="portfolio__project-info-title">Фурнитура</h6>
								<p class="portfolio__project-info-subtitle">— Hettich с доводчиками</p>
								<h6 class="portfolio__project-info-title">Подъёмные механизмы</h6>
								<p class="portfolio__project-info-subtitle">— Aventos Blum</p>
								<h6 class="portfolio__project-info-title">Ручки</h6>
								<p class="portfolio__project-info-subtitle">— интегрированный профиль Gola</p>
								<h6 class="portfolio__project-info-title">Стиль</h6>
								<p class="portfolio__project-info-subtitle">— минимализм с тёплыми акцентами</p>
							</div>

							<div class="portfolio__project-info-prices">
								<p>Цена:</p>
								<p>400 000 ₽</p>
							</div>

							<footer class="portfolio__project-info-footer">
								<p>Состояние до ремонта</p>
								<div class="portfolio__project-info-thumbnails">
									<img
										src="/img/Portfolio/portfolio/thumbnails/image.jpg"
										alt=""
										class="portfolio__project-info-thumbnail" />
									<img
										src="/img/Portfolio/portfolio/thumbnails/image.jpg"
										alt=""
										class="portfolio__project-info-thumbnail" />
									<img
										src="/img/Portfolio/portfolio/thumbnails/image.jpg"
										alt=""
										class="portfolio__project-info-thumbnail" />
								</div>
							</footer>
						</div>

						<a href="/" class="portfolio__project-info-link">
							<div class="portfolio__project-info-icon">
								<svg viewBox="0 0 31.9453 31.9873" width="31.945312" height="31.987305">
									<path
										d="M29.9453 28L29.9453 0L31.9453 0L31.9453 28L29.9453 28Z"
										fill="rgb(255,255,255)" />
									<path
										d="M0 30.5731L29.5731 1L30.9873 2.4142L1.4142 31.9873L0 30.5731Z"
										fill="rgb(255,255,255)" />
									<path
										d="M3.94531 0L31.9453 0L31.9453 2L3.94531 2L3.94531 0Z"
										fill="rgb(255,255,255)" />
								</svg>
							</div>

							<p>хочу такую</p>
						</a>
					</div>
				</div>
			{/if}

			{#if showGallery}
				<div class="portfolio__gallery" transition:slide>
					{#each galleries_first as list, listIndex}
						<ul class="portfolio__gallery-items">
							{#each list.items as item, itemIndex}
								<li
									class="portfolio__gallery-item"
									data-aos="zoom-in"
									onclick={() => clickGallery(item.src, 'middle')}>
									<img src={item.src} alt={item.alt} class="portfolio__gallery-image" />
									<svg
										viewBox="0 0 27 27"
										width="27"
										height="27"
										fill="none"
										class="portfolio__gallery-icon"
										onclick={() => toggleGalleryPopup('first', listIndex, itemIndex)}>
										<circle cx="13.5" cy="13.5" r="10.5" fill="rgb(250,248,245)" />
										<circle cx="13.5" cy="13.5" r="10" stroke="rgb(250,248,245)" />
										<circle cx="13.5" cy="13.5" r="13" stroke="rgb(250,248,245)" />
									</svg>
									<div
										class="portfolio__gallery-popup"
										class:active={galleryIndexPopup === `first_${listIndex}_${itemIndex}`}>
										{#each item.popup as text}
											<p class="portfolio__gallery-popup-text">{text}</p>
										{/each}
									</div>
								</li>
							{/each}
						</ul>
					{/each}
				</div>
			{/if}

			{#if showContentBottom}
				<div class="portfolio__project" data-aos="zoom-in">
					<div class="portfolio__project-content">
						<div class="portfolio__project-content-text">
							<h6 class="portfolio__project-content-title">Проект Эхо фактур</h6>
							<p class="portfolio__project-content-subtitle">
								<b>Стильная кухня в чёрном цвете с акцентом под дерево,</b>
								в которой идеально сочетаются глубокий матовый чёрный и тёплая текстура натурального
								дерева. Гармоничный контраст придаёт интерьеру выразительность и премиальный вид.
							</p>
						</div>
						<div class="portfolio__project-content-bullets" onclick={nextSlide}>
							<svg width="29.166504" height="35.833496" viewBox="0 0 29.1665 35.8335">
								<path
									d="M14.58 6.25L15.46 5.36C15.23 5.13 14.91 5 14.58 5C14.25 5 13.93 5.13 13.7 5.36L14.58 6.25ZM14.58 19.58L13.7 20.46C13.93 20.7 14.25 20.83 14.58 20.83C14.91 20.83 15.23 20.7 15.46 20.46L14.58 19.58ZM10.36 8.7C10.14 8.93 10.02 9.25 10.03 9.57C10.03 9.89 10.16 10.2 10.39 10.43C10.62 10.66 10.93 10.79 11.25 10.8C11.58 10.8 11.89 10.68 12.13 10.46L10.36 8.7ZM17.03 10.46C17.14 10.58 17.28 10.68 17.43 10.75C17.59 10.82 17.75 10.86 17.92 10.86C18.09 10.86 18.26 10.83 18.41 10.77C18.57 10.71 18.71 10.61 18.83 10.49C18.95 10.37 19.04 10.23 19.1 10.08C19.16 9.92 19.2 9.76 19.19 9.59C19.19 9.42 19.15 9.25 19.08 9.1C19.02 8.95 18.92 8.81 18.79 8.7L17.03 10.46ZM12.13 15.36C12.01 15.24 11.88 15.14 11.72 15.07C11.57 15 11.4 14.97 11.24 14.96C11.07 14.96 10.9 14.99 10.75 15.05C10.59 15.12 10.45 15.21 10.33 15.33C10.21 15.45 10.12 15.59 10.05 15.75C9.99 15.9 9.96 16.07 9.96 16.24C9.97 16.4 10 16.57 10.07 16.72C10.14 16.88 10.24 17.01 10.36 17.13L12.13 15.36ZM18.79 17.13C18.92 17.01 19.02 16.88 19.08 16.72C19.15 16.57 19.19 16.4 19.19 16.24C19.2 16.07 19.16 15.9 19.1 15.75C19.04 15.59 18.95 15.45 18.83 15.33C18.71 15.21 18.57 15.12 18.41 15.05C18.26 14.99 18.09 14.96 17.92 14.96C17.75 14.97 17.59 15 17.43 15.07C17.28 15.14 17.14 15.24 17.03 15.36L18.79 17.13ZM0 14.58L0 21.25L2.5 21.25L2.5 14.58L0 14.58ZM29.16 21.25L29.16 14.58L26.66 14.58L26.66 21.25L29.16 21.25ZM13.33 6.25L13.33 19.58L15.83 19.58L15.83 6.25L13.33 6.25ZM13.7 5.36L10.36 8.7L12.13 10.46L15.46 7.13L13.7 5.36ZM13.7 7.13L17.03 10.46L18.79 8.7L15.46 5.36L13.7 7.13ZM15.46 18.7L12.13 15.36L10.36 17.13L13.7 20.46L15.46 18.7ZM15.46 20.46L18.79 17.13L17.03 15.36L13.7 18.7L15.46 20.46ZM29.16 14.58C29.16 10.71 27.63 7 24.89 4.27C22.16 1.53 18.45 0 14.58 0L14.58 2.5C17.78 2.5 20.86 3.77 23.12 6.03C25.39 8.3 26.66 11.37 26.66 14.58L29.16 14.58ZM14.58 35.83C16.49 35.83 18.39 35.45 20.16 34.72C21.93 33.99 23.54 32.91 24.89 31.56C26.24 30.2 27.32 28.6 28.05 26.83C28.78 25.06 29.16 23.16 29.16 21.25L26.66 21.25C26.66 24.45 25.39 27.52 23.12 29.79C20.86 32.06 17.78 33.33 14.58 33.33L14.58 35.83ZM0 21.25C0 25.11 1.53 28.82 4.27 31.56C7 34.29 10.71 35.83 14.58 35.83L14.58 33.33C11.37 33.33 8.3 32.06 6.03 29.79C3.77 27.52 2.5 24.45 2.5 21.25L0 21.25ZM2.5 14.58C2.5 11.37 3.77 8.3 6.03 6.03C8.3 3.77 11.37 2.5 14.58 2.5L14.58 0C10.71 0 7 1.53 4.27 4.27C1.53 7 0 10.71 0 14.58L2.5 14.58Z"
									fill="#7B5E57" />
							</svg>

							<div class="portfolio__project-content-bullet">
								{#each Array(3) as _, index}
									<span class:active={currentSlide === index}></span>
								{/each}
							</div>
						</div>
					</div>

					<ul bind:this={sliderPortfolioRef} class="portfolio__project-media">
						<li class="portfolio__project-media-item keen-slider__slide">
							<img src={contentImage} alt="" class="portfolio__project-media-image" />
						</li>
						<li class="portfolio__project-media-item keen-slider__slide">
							<img src={contentImage} alt="" class="portfolio__project-media-image" />
						</li>
						<li class="portfolio__project-media-item keen-slider__slide">
							<img src={contentImage} alt="" class="portfolio__project-media-image" />
						</li>
					</ul>

					<div class="portfolio__project-info">
						<div class="portfolio__project-info-text">
							<h5 class="portfolio__project-info-heading">Материалы:</h5>

							<div class="portfolio__project-info-wrapper">
								<h6 class="portfolio__project-info-title">Фасады</h6>
								<p class="portfolio__project-info-subtitle">
									— EGGER PerfectSense чёрный + Филвуд Дуб Галифакс Олово
								</p>
								<h6 class="portfolio__project-info-title">Столешница</h6>
								<p class="portfolio__project-info-subtitle">
									— HPL-пластик 12 мм, цвет Камень Пьетра Гриджиа Чёрный
								</p>
								<h6 class="portfolio__project-info-title">Фурнитура</h6>
								<p class="portfolio__project-info-subtitle">— Hettich с доводчиками</p>
								<h6 class="portfolio__project-info-title">Подъёмные механизмы</h6>
								<p class="portfolio__project-info-subtitle">— Aventos Blum</p>
								<h6 class="portfolio__project-info-title">Ручки</h6>
								<p class="portfolio__project-info-subtitle">— интегрированный профиль Gola</p>
								<h6 class="portfolio__project-info-title">Стиль</h6>
								<p class="portfolio__project-info-subtitle">— минимализм с тёплыми акцентами</p>
							</div>

							<div class="portfolio__project-info-prices">
								<p>Цена:</p>
								<p>400 000 ₽</p>
							</div>

							<footer class="portfolio__project-info-footer">
								<p>Состояние до ремонта</p>
								<div class="portfolio__project-info-thumbnails">
									<img
										src="/img/Portfolio/portfolio/thumbnails/image.jpg"
										alt=""
										class="portfolio__project-info-thumbnail" />
									<img
										src="/img/Portfolio/portfolio/thumbnails/image.jpg"
										alt=""
										class="portfolio__project-info-thumbnail" />
									<img
										src="/img/Portfolio/portfolio/thumbnails/image.jpg"
										alt=""
										class="portfolio__project-info-thumbnail" />
								</div>
							</footer>
						</div>

						<a href="/" class="portfolio__project-info-link">
							<div class="portfolio__project-info-icon">
								<svg viewBox="0 0 31.9453 31.9873" width="31.945312" height="31.987305">
									<path
										d="M29.9453 28L29.9453 0L31.9453 0L31.9453 28L29.9453 28Z"
										fill="rgb(255,255,255)" />
									<path
										d="M0 30.5731L29.5731 1L30.9873 2.4142L1.4142 31.9873L0 30.5731Z"
										fill="rgb(255,255,255)" />
									<path
										d="M3.94531 0L31.9453 0L31.9453 2L3.94531 2L3.94531 0Z"
										fill="rgb(255,255,255)" />
								</svg>
							</div>

							<p>хочу такую</p>
						</a>
					</div>
				</div>
			{/if}

			{#if !showGallery}
				<button class="portfolio__button" data-aos="fade-up" onclick={setShowGallery}>
					Посмотреть больше проектов
				</button>
			{/if}

			<div bind:this={sliderPortfolioRef}></div>
		</div>
	</div>
</section>

<style lang="scss">
	.portfolio {
		@include adaptiveValue('padding-top', 65, 20, 991, 767, 1);
		@include adaptiveValue('padding-bottom', 65, 20, 991, 767, 1);
		/* .portfolio__container */
		&__container {
		}
		/* .portfolio__header */
		&__header {
			@include adaptiveValue('margin-bottom', 90, 45, 991, 479, 1);
			/* .portfolio__header-title */
			&-title {
				color: rgba(#3f2c24b8, 0.72);
				@include adaptiveValue('font-size', 40, 30, 991, 767, 1);
				font-weight: 300;
				line-height: 150%;
				letter-spacing: rem(-1.1);
				text-transform: uppercase;

				@include adaptiveValue('margin-bottom', 45, 20, 991, 767, 1);

				@media (max-width: $mobile) {
					@include adaptiveValue('font-size', 30, 16, 767, 479, 1);
					@include adaptiveValue('margin-bottom', 20, 10, 767, 479, 1);
				}
			}
			/* .portfolio__header-text */
			&-text {
				display: flex;
				justify-content: space-between;
				@include adaptiveValue('padding-left', 350, 0, 1300, 991, 1);

				@media (max-width: $tablet) {
					flex-direction: column;
				}
			}
			/* .portfolio__header-heading */
			&-heading {
				color: #3f2c24;
				@include adaptiveValue('font-size', 80, 40, 767, 479, 1);
				font-weight: 500;
				line-height: 110%;
				letter-spacing: -1.1%;

				@media (max-width: $tablet) {
					align-self: flex-start;
					margin-bottom: rem(20);
				}

				p {
					font-weight: 300;
					font-style: italic;
				}
			}
			/* .portfolio__header-subtitle */
			&-subtitle {
				color: #3f2c24;
				font-family: Montserrat;
				@include adaptiveValue('font-size', 32, 16, 767, 479, 1);
				line-height: 140%;
				letter-spacing: rem(-1);
				text-align: right;

				@include adaptiveValue('max-width', 360, 300, 767, 479, 1);

				@media (max-width: $tablet) {
					margin: 0 0 0 auto;
				}
			}
		}

		/* .portfolio__rooms */
		&__rooms {
			display: flex;
			// gap: rem(20);
			overflow: hidden;
			// width: calc(rem(330) * 9 + rem(20) * 8 + rem(80));

			background-color: #3f2c24;
			padding: rem(40);
			@include adaptiveValue('margin-bottom', 60, 15, 767, 479, 1);

			@media (max-width: $mobileSmall) {
				padding-left: rem(20);
				padding-right: rem(20);
			}

			/* .portfolio__rooms-room */
			&-room {
				flex: 0 0 rem(330);
				text-align: center;
				user-select: none;
				cursor: pointer;

				@media (max-width: $mobileSmall) {
					@include adaptiveValue('flex-basis', 330, 280, 479, 320, 1);
				}

				&.active .portfolio__rooms-text {
					color: #faf8f5;
					font-weight: 500;
					font-size: rem(22);
				}
			}
			/* .portfolio__rooms-image */
			&-image {
				width: auto;
				height: rem(194);
				margin-bottom: rem(20);
			}
			/* .portfolio__rooms-text */
			&-text {
				color: #ddd0c8;
				font-family: Montserrat;
				font-size: rem(18);
				font-weight: 300;
				line-height: math.div(22, 18);
				text-transform: uppercase;
				transition:
					color 0.3s ease 0s,
					font-weight 0.3s ease 0s;
			}
		}

		/* .portfolio__filter */
		&__filter {
			display: flex;
			gap: rem(20);

			@include adaptiveValue('margin-bottom', 60, 20, 767, 479, 1);
			@media (max-width: em(700)) {
				flex-direction: column;
			}

			// justify-content: space-between;

			/* .portfolio__filter-column */
			&-column {
				flex: 0 1 33.33333%;
				display: flex;
				gap: rem(20);
				@media (max-width: $tablet) {
					flex-direction: column;
				}
			}
			/* .portfolio__filter-button */
			&-button {
				align-self: flex-start;

				color: #7b5e57;
				font-family: Montserrat;
				font-size: rem(18);
				line-height: math.div(24, 18);
				letter-spacing: 10%;
				cursor: pointer;

				padding: rem(8);

				&-icon {
					width: rem(24);
					height: rem(24);
				}

				&--categories {
					display: flex;
					align-items: center;
					gap: rem(10);
					font-weight: 500;
				}

				&--toggle {
					@media (max-width: em(700)) {
						order: -1;
						align-self: flex-end;
					}
				}
			}

			/* .portfolio__filter-lists */
			&-lists {
				align-self: flex-start;

				display: flex;
				flex-direction: column;
				gap: rem(20);

				border-left: rem(1) solid #ddd0c8;
				padding-left: rem(10);
			}
			/* .portfolio__filter-list */
			&-list {
				display: flex;
				text-align: left;

				&:hover {
					span {
						opacity: 1;
						padding-right: rem(2);
					}
				}

				span {
					padding-right: rem(5);

					opacity: 0;
					transition:
						opacity 0.3s ease 0s,
						padding-right 0.3s ease 0s;
				}
			}
		}

		/* .portfolio__wrapper */
		&__wrapper {
		}
		/* .portfolio__gallery */
		&__gallery {
			// display: grid;
			// grid-template-columns: percent(795, 1840) percent(445, 1840) percent(560, 1840);
			display: flex;
			@include adaptiveValue('gap', 20, 5, 991, 479, 1);

			&:not(:last-child) {
				margin-bottom: rem(20);
			}

			/* .portfolio__gallery-items */
			&-items {
				display: flex;
				flex-direction: column;
				@include adaptiveValue('gap', 20, 5, 991, 479, 1);
			}
			/* .portfolio__gallery-item */
			&-item {
				flex: 1;
				position: relative;

				&:hover .portfolio__gallery-icon {
					opacity: 1;
				}
			}
			/* .portfolio__gallery-image */
			&-image {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			/* .portfoli__gallery-icon */
			&-icon {
				position: absolute;
				top: 50%;
				left: 50%;
				z-index: 2;

				width: rem(27);
				height: rem(27);
				cursor: pointer;
				opacity: 0;
				transition: opacity 0.3s ease 0s;

				@media (max-width: $tablet) {
					display: none;
				}
			}
			/* .portfolio__gallery-popup */
			&-popup {
				display: none;
				position: absolute;
				top: 50%;
				left: 50%;
				z-index: 1;
				transform: translateX(-50%);

				background-color: #faf8f5;
				padding: rem(20);

				&.active {
					display: block;
				}

				/* .portfolio__gallery-popup-text */
				&-text {
					color: #7b5e57;
					font-size: rem(22);

					&:last-child {
						padding-top: rem(20);
					}
				}
			}
		}

		/* .portfolio__project */
		&__project {
			display: flex;
			gap: rem(20);

			padding-top: rem(65);
			padding-bottom: rem(65);
			@include adaptiveValue('padding-top', 45, 20, 991, 479, 1);
			@include adaptiveValue('padding-bottom', 65, 20, 991, 479, 1);

			@media (max-width: em(1220)) {
				flex-direction: column;
			}

			/* .portfolio__project-content */
			&-content {
				flex: 0 1 rem(326);
				display: flex;

				@media (max-width: em(1220)) {
					flex: 1 1 100%;
					@include adaptiveValue('gap', 20, 10, 767, 479, 1);
				}

				@media (max-width: $mobileSmall) {
					flex-direction: column;
				}

				/* .portfolio__project-content-text */
				&-text {
					display: flex;
					flex-direction: column;
					@include adaptiveValue('gap', 20, 10, 767, 479, 1);
					height: 100%;
				}
				/* .portfolio__project-content-title */
				&-title {
					flex: 1;

					color: #574b4b;
					font-family: Montserrat;
					@include adaptiveValue('font-size', 24, 22, 767, 479, 1);
					line-height: 140%;
					letter-spacing: rem(-1);

					max-width: rem(130);
					@media (max-width: em(1220)) {
						max-width: 100%;
					}
				}
				/* .portfolio__project-content-subtitle */
				&-subtitle {
					color: #574b4b;
					font-family: Montserrat;
					@include adaptiveValue('font-size', 24, 20, 767, 479, 1);
					line-height: 150%;

					max-width: rem(300);
					@media (max-width: em(1220)) {
						max-width: 100%;
					}

					b {
						font-weight: 600;
					}
				}
				/* .portfolio__project-content-bullets */
				&-bullets {
					align-self: flex-start;

					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					gap: rem(10);
					cursor: pointer;

					@media (max-width: em(1220)) {
						align-self: flex-end;
					}

					svg {
						@media (max-width: em(1220)) {
							transform: rotate(-90deg);
						}
					}
				}

				&-bullet {
					display: flex;
					flex-direction: column;
					gap: rem(10);

					@media (max-width: em(1220)) {
						flex-direction: row;
					}

					span {
						display: inline-block;
						width: rem(10);
						height: rem(10);
						border-radius: 50%;
						background-color: #ddd0c8;
						transition: background-color 0.3s ease 0s;
					}

					span.active {
						background-color: #7b5e57;
					}
				}
			}

			&-media {
				flex: 0 1 rem(677);
				@include adaptiveValue('max-height', 600, 260, 767, 479, 1);

				overflow: hidden;

				@media (max-width: em(1220)) {
					display: flex;
				}

				&-item {
					height: 100%;
				}
				/* .portfolio__project-media-image */
				&-image {
					width: 100%;
					// max-height: rem(600);
					@include adaptiveValue('max-height', 600, 260, 767, 479, 1);
					height: 100%;
					object-fit: cover;
				}
			}

			/* .portfolio__project-info */
			&-info {
				flex: 1;

				display: flex;
				gap: rem(20);
				height: 100%;

				@media (max-width: $mobileSmall) {
					flex-direction: column-reverse;
				}

				&-text {
					flex: 1;

					display: flex;
					flex-direction: column;
					gap: rem(10);
				}
				/* .portfolio__project-info-heading */
				&-heading {
					color: #7b5e57;
					font-family: Montserrat;
					font-size: rem(18);
					line-height: 110%;
					letter-spacing: rem(-1.1);

					border-bottom: rem(1) solid rgba(221, 208, 200, 1);
					border-top: rem(1) solid rgba(221, 208, 200, 1);
					padding: rem(10) rem(5);
					// margin-bottom: rem(20);
				}
				/* .portfolio__project-info-wrapper */
				&-wrapper {
				}
				/* .portfolio__project-info-title */
				&-title {
					flex: 1;
					color: #3f2c24;
					font-family: Montserrat;
					font-size: rem(18);
					font-weight: 600;
					line-height: 180%;
				}
				/* .portfolio__project-info-subtitle */
				&-subtitle {
					color: #3f2c24;
					font-family: Montserrat;
					font-size: rem(18);
					line-height: 180%;
				}
				/* .portfolio__project-info-prices */
				&-prices {
					display: flex;
					justify-content: space-between;
					align-items: center;

					border-bottom: rem(1) solid rgba(221, 208, 200, 1);
					border-top: rem(1) solid rgba(221, 208, 200, 1);
					padding: rem(10) 0 rem(10) rem(5);
					margin-bottom: rem(10);
					p {
						color: #7b5e57;
						font-family: Montserrat;
						font-size: rem(18);
						line-height: 110%;
						letter-spacing: rem(-1.1);
						&:last-child {
							font-weight: 600;
						}
					}
				}
				/* .portfolio__project-info-footer */
				&-footer {
					p {
						color: #7b5e57;
						font-family: Montserrat;
						font-size: rem(18);
						line-height: 110%;
						letter-spacing: rem(-1.1);
						margin-bottom: rem(10);
					}
				}
				/* .portfolio__project-info-thumbnails */
				&-thumbnails {
					display: flex;
					flex-wrap: wrap;
					gap: rem(20);
					@include adaptiveValue('gap', 20, 10, 767, 479, 1);
				}
				/* .portfolio__project-info-thumbnail */
				&-thumbnail {
					width: rem(97);
					height: rem(60);
					object-fit: cover;
				}

				/* .portfolio__project-info-link */
				&-link {
					display: flex;
					flex-direction: column;
					// justify-content: space-between;
					align-items: center;

					@media (any-hover: hover) {
						&:hover p {
							transform: rotate(-90deg) translateX(rem(-50));
						}
						&:hover .portfolio__project-info-icon svg {
							transform: translate(rem(5), rem(-5));
						}
					}

					@media (max-width: $mobileSmall) {
						flex-direction: row-reverse;
						justify-content: space-between;
					}

					p {
						color: #574b4b;
						font-size: rem(22);
						line-height: 150%;
						letter-spacing: rem(-1);
						transform: rotate(-90deg) translateX(rem(-350));
						transition: transform 0.3s ease 0s;
						// padding-left: rem(60);
						@media (max-width: $mobileSmall) {
							transform: none;
						}
					}
				}

				&-icon {
					display: flex;
					justify-content: center;
					align-items: center;

					// width: rem(95);
					// height: rem(95);

					@include adaptiveValue('width', 95, 48, 991, 479, 1);
					@include adaptiveValue('height', 95, 48, 991, 479, 1);
					border-radius: 50%;
					background-color: #ff6f20;

					svg {
						transition: transform 0.3s ease 0s;
						@include adaptiveValue('width', 31, 18, 991, 479, 1);
						@include adaptiveValue('height', 31, 18, 991, 479, 1);
					}
				}
			}
		}

		&__button {
			color: #ff6f20;
			font-size: rem(24);
			line-height: 150%;
			letter-spacing: rem(-1);

			width: 100%;
			margin: 0 auto;
			@include adaptiveValue('margin-top', 45, 15, 991, 479, 1);
		}
	}
</style>
