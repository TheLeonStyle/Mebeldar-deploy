<script>
	import KeenSlider from 'keen-slider';
	import { onMount } from 'svelte';

	let slider;
	let sliderRef = $state(null);

	const WheelControls = (slider) => {
		let lastEventTime = 0;
		const throttleDelay = 500;

		function wheelHandler(e) {
			const idx = slider.track.details.rel;
			const maxIdx = slider.track.details.slides.length - 1;

			const scrollingDown = e.deltaY > 0;
			const scrollingUp = e.deltaY < 0;

			const isAtBound = (idx === maxIdx && scrollingDown) || (idx === 0 && scrollingUp);

			if (isAtBound) return;

			if (e.cancelable) e.preventDefault();

			const currentTime = new Date().getTime();
			if (currentTime - lastEventTime < throttleDelay) return;

			if (scrollingDown) {
				slider.next();
			} else {
				slider.prev();
			}

			lastEventTime = currentTime;
		}

		slider.on('created', () => {
			slider.container.addEventListener('wheel', wheelHandler, { passive: false });
		});
	};

	onMount(() => {
		slider = new KeenSlider(
			sliderRef,
			{
				mode: 'free-snap',
				breakpoints: {
					'(min-width: 320px)': {
						vertical: false
					},
					'(min-width: 1300px)': {
						slides: { origin: 'center', perView: 1, spacing: 20 },
						vertical: true
					}
				},
				slides: {
					perView: 1,
					spacing: 20
				},
				vertical: true
			},
			[WheelControls]
		);
	});

	const nextSlide = () => slider.next();
</script>

<section class="reviews">
	<div class="reviews__container">
		<h2 class="reviews__title" data-aos="fade-up">Отзывы</h2>
		<h3 class="reviews__heading" data-aos="fade-up">
			Что говорят
			<p>Наши клиенты</p>
		</h3>

		<ul bind:this={sliderRef} class="reviews__items" data-aos="fade-up">
			<li class="reviews__item keen-slider__slide">
				<div class="reviews__item-info">
					<img src="/img/Home/reviews/thumbnail1.jpeg" alt="" class="reviews__item-thumbnail" />
					<div class="reviews__item-profile">
						<p class="reviews__item-avatar">А</p>
						<p class="reviews__item-name">— Айдар</p>
					</div>
				</div>

				<div class="reviews__item-content">
					<p class="reviews__item-text">
						Стильная кухня в чёрном цвете с акцентом под дерево.
						<span>
							Современный минимализм с характером: глубокий матовый чёрный сочетается с тёплой
							текстурой дуба Halifax. Контраст строгости и уюта в премиальном исполнении.
						</span>
						Цена: 400 000 ₽
					</p>

					<p class="reviews__item-review">
						«Кухня получилась именно такой, как мы мечтали. Отдельное спасибо за аккуратную
						установку и помощь с планировкой!
					</p>
				</div>

				<div class="reviews__item-bullets" onclick={nextSlide}>
					<svg width="29.166504" height="35.833496" viewBox="0 0 29.1665 35.8335">
						<path
							d="M14.58 6.25L15.46 5.36C15.23 5.13 14.91 5 14.58 5C14.25 5 13.93 5.13 13.7 5.36L14.58 6.25ZM14.58 19.58L13.7 20.46C13.93 20.7 14.25 20.83 14.58 20.83C14.91 20.83 15.23 20.7 15.46 20.46L14.58 19.58ZM10.36 8.7C10.14 8.93 10.02 9.25 10.03 9.57C10.03 9.89 10.16 10.2 10.39 10.43C10.62 10.66 10.93 10.79 11.25 10.8C11.58 10.8 11.89 10.68 12.13 10.46L10.36 8.7ZM17.03 10.46C17.14 10.58 17.28 10.68 17.43 10.75C17.59 10.82 17.75 10.86 17.92 10.86C18.09 10.86 18.26 10.83 18.41 10.77C18.57 10.71 18.71 10.61 18.83 10.49C18.95 10.37 19.04 10.23 19.1 10.08C19.16 9.92 19.2 9.76 19.19 9.59C19.19 9.42 19.15 9.25 19.08 9.1C19.02 8.95 18.92 8.81 18.79 8.7L17.03 10.46ZM12.13 15.36C12.01 15.24 11.88 15.14 11.72 15.07C11.57 15 11.4 14.97 11.24 14.96C11.07 14.96 10.9 14.99 10.75 15.05C10.59 15.12 10.45 15.21 10.33 15.33C10.21 15.45 10.12 15.59 10.05 15.75C9.99 15.9 9.96 16.07 9.96 16.24C9.97 16.4 10 16.57 10.07 16.72C10.14 16.88 10.24 17.01 10.36 17.13L12.13 15.36ZM18.79 17.13C18.92 17.01 19.02 16.88 19.08 16.72C19.15 16.57 19.19 16.4 19.19 16.24C19.2 16.07 19.16 15.9 19.1 15.75C19.04 15.59 18.95 15.45 18.83 15.33C18.71 15.21 18.57 15.12 18.41 15.05C18.26 14.99 18.09 14.96 17.92 14.96C17.75 14.97 17.59 15 17.43 15.07C17.28 15.14 17.14 15.24 17.03 15.36L18.79 17.13ZM0 14.58L0 21.25L2.5 21.25L2.5 14.58L0 14.58ZM29.16 21.25L29.16 14.58L26.66 14.58L26.66 21.25L29.16 21.25ZM13.33 6.25L13.33 19.58L15.83 19.58L15.83 6.25L13.33 6.25ZM13.7 5.36L10.36 8.7L12.13 10.46L15.46 7.13L13.7 5.36ZM13.7 7.13L17.03 10.46L18.79 8.7L15.46 5.36L13.7 7.13ZM15.46 18.7L12.13 15.36L10.36 17.13L13.7 20.46L15.46 18.7ZM15.46 20.46L18.79 17.13L17.03 15.36L13.7 18.7L15.46 20.46ZM29.16 14.58C29.16 10.71 27.63 7 24.89 4.27C22.16 1.53 18.45 0 14.58 0L14.58 2.5C17.78 2.5 20.86 3.77 23.12 6.03C25.39 8.3 26.66 11.37 26.66 14.58L29.16 14.58ZM14.58 35.83C16.49 35.83 18.39 35.45 20.16 34.72C21.93 33.99 23.54 32.91 24.89 31.56C26.24 30.2 27.32 28.6 28.05 26.83C28.78 25.06 29.16 23.16 29.16 21.25L26.66 21.25C26.66 24.45 25.39 27.52 23.12 29.79C20.86 32.06 17.78 33.33 14.58 33.33L14.58 35.83ZM0 21.25C0 25.11 1.53 28.82 4.27 31.56C7 34.29 10.71 35.83 14.58 35.83L14.58 33.33C11.37 33.33 8.3 32.06 6.03 29.79C3.77 27.52 2.5 24.45 2.5 21.25L0 21.25ZM2.5 14.58C2.5 11.37 3.77 8.3 6.03 6.03C8.3 3.77 11.37 2.5 14.58 2.5L14.58 0C10.71 0 7 1.53 4.27 4.27C1.53 7 0 10.71 0 14.58L2.5 14.58Z"
							fill="#7B5E57" />
					</svg>

					<div class="reviews__item-bullet">
						<span class="active"></span>
						<span></span>
						<span></span>
					</div>
				</div>

				<img src="/img/Home/reviews/image1.jpeg" alt="" class="reviews__item-media" />
			</li>

			<li class="reviews__item keen-slider__slide">
				<div class="reviews__item-info">
					<img src="/img/Home/reviews/thumbnail2.jpeg" alt="" class="reviews__item-thumbnail" />
					<div class="reviews__item-profile">
						<p class="reviews__item-avatar reviews__item-avatar--marked">А</p>
						<p class="reviews__item-name">— Альфия</p>
					</div>
				</div>

				<div class="reviews__item-content">
					<p class="reviews__item-text">
						Современная кухня с витринами и встроенной техникой
						<span>
							Минималистичный дизайн, белая матовая эмаль и витрины со стеклом. Функциональность в
							каждой детали и встроенная техника для максимального удобства.
						</span>
						Цена: 704 000 ₽
					</p>

					<p class="reviews__item-review">
						«Очень довольны нашей новой кухней! Монтаж прошёл аккуратно — после установки было
						чисто, как будто ничего не собирали. Фурнитура — на высоте: всё плавно, без скрипа,
						чувствуется качество. А ещё приятно удивили подарком — стильная мойка в цвет столешницы.
						Спасибо команде за внимание к деталям!
					</p>
				</div>

				<div class="reviews__item-bullets" onclick={nextSlide}>
					<svg width="29.166504" height="35.833496" viewBox="0 0 29.1665 35.8335">
						<path
							d="M14.58 6.25L15.46 5.36C15.23 5.13 14.91 5 14.58 5C14.25 5 13.93 5.13 13.7 5.36L14.58 6.25ZM14.58 19.58L13.7 20.46C13.93 20.7 14.25 20.83 14.58 20.83C14.91 20.83 15.23 20.7 15.46 20.46L14.58 19.58ZM10.36 8.7C10.14 8.93 10.02 9.25 10.03 9.57C10.03 9.89 10.16 10.2 10.39 10.43C10.62 10.66 10.93 10.79 11.25 10.8C11.58 10.8 11.89 10.68 12.13 10.46L10.36 8.7ZM17.03 10.46C17.14 10.58 17.28 10.68 17.43 10.75C17.59 10.82 17.75 10.86 17.92 10.86C18.09 10.86 18.26 10.83 18.41 10.77C18.57 10.71 18.71 10.61 18.83 10.49C18.95 10.37 19.04 10.23 19.1 10.08C19.16 9.92 19.2 9.76 19.19 9.59C19.19 9.42 19.15 9.25 19.08 9.1C19.02 8.95 18.92 8.81 18.79 8.7L17.03 10.46ZM12.13 15.36C12.01 15.24 11.88 15.14 11.72 15.07C11.57 15 11.4 14.97 11.24 14.96C11.07 14.96 10.9 14.99 10.75 15.05C10.59 15.12 10.45 15.21 10.33 15.33C10.21 15.45 10.12 15.59 10.05 15.75C9.99 15.9 9.96 16.07 9.96 16.24C9.97 16.4 10 16.57 10.07 16.72C10.14 16.88 10.24 17.01 10.36 17.13L12.13 15.36ZM18.79 17.13C18.92 17.01 19.02 16.88 19.08 16.72C19.15 16.57 19.19 16.4 19.19 16.24C19.2 16.07 19.16 15.9 19.1 15.75C19.04 15.59 18.95 15.45 18.83 15.33C18.71 15.21 18.57 15.12 18.41 15.05C18.26 14.99 18.09 14.96 17.92 14.96C17.75 14.97 17.59 15 17.43 15.07C17.28 15.14 17.14 15.24 17.03 15.36L18.79 17.13ZM0 14.58L0 21.25L2.5 21.25L2.5 14.58L0 14.58ZM29.16 21.25L29.16 14.58L26.66 14.58L26.66 21.25L29.16 21.25ZM13.33 6.25L13.33 19.58L15.83 19.58L15.83 6.25L13.33 6.25ZM13.7 5.36L10.36 8.7L12.13 10.46L15.46 7.13L13.7 5.36ZM13.7 7.13L17.03 10.46L18.79 8.7L15.46 5.36L13.7 7.13ZM15.46 18.7L12.13 15.36L10.36 17.13L13.7 20.46L15.46 18.7ZM15.46 20.46L18.79 17.13L17.03 15.36L13.7 18.7L15.46 20.46ZM29.16 14.58C29.16 10.71 27.63 7 24.89 4.27C22.16 1.53 18.45 0 14.58 0L14.58 2.5C17.78 2.5 20.86 3.77 23.12 6.03C25.39 8.3 26.66 11.37 26.66 14.58L29.16 14.58ZM14.58 35.83C16.49 35.83 18.39 35.45 20.16 34.72C21.93 33.99 23.54 32.91 24.89 31.56C26.24 30.2 27.32 28.6 28.05 26.83C28.78 25.06 29.16 23.16 29.16 21.25L26.66 21.25C26.66 24.45 25.39 27.52 23.12 29.79C20.86 32.06 17.78 33.33 14.58 33.33L14.58 35.83ZM0 21.25C0 25.11 1.53 28.82 4.27 31.56C7 34.29 10.71 35.83 14.58 35.83L14.58 33.33C11.37 33.33 8.3 32.06 6.03 29.79C3.77 27.52 2.5 24.45 2.5 21.25L0 21.25ZM2.5 14.58C2.5 11.37 3.77 8.3 6.03 6.03C8.3 3.77 11.37 2.5 14.58 2.5L14.58 0C10.71 0 7 1.53 4.27 4.27C1.53 7 0 10.71 0 14.58L2.5 14.58Z"
							fill="#7B5E57" />
					</svg>

					<div class="reviews__item-bullet">
						<span></span>
						<span class="active"></span>
						<span></span>
					</div>
				</div>

				<video src="/video/Home/reviews/video.mp4" class="reviews__item-media" autoplay loop muted>
				</video>
			</li>

			<li class="reviews__item keen-slider__slide">
				<div class="reviews__item-info">
					<img src="/img/Home/reviews/thumbnail3.jpeg" alt="" class="reviews__item-thumbnail" />
					<div class="reviews__item-profile">
						<p class="reviews__item-avatar">А</p>
						<p class="reviews__item-name">— Алсу</p>
					</div>
				</div>

				<div class="reviews__item-content">
					<p class="reviews__item-text">
						Полностью оборудованная детская комната на заказ
						<span>
							Полностью оборудованная детская на заказ: рабочая зона, шкаф, ТВ-секция, мягкие уголки
							и открытое хранение. Уют, свет и логика в каждой детали
						</span>
						Цена: 370 000 руб.
					</p>

					<p class="reviews__item-review">
						«Наиля, спасибо Вам всем огромное!!!! Мы с вами такууууую шикарную идею воплотили в
						жизнь!!! Каждый день наслаждаемся всей семьей!!!! Большое спасибо за терпеливость! За
						вовлеченность! За профессионализм!
					</p>
				</div>

				<div class="reviews__item-bullets">
					<svg width="29.166504" height="35.833496" viewBox="0 0 29.1665 35.8335">
						<path
							d="M14.58 6.25L15.46 5.36C15.23 5.13 14.91 5 14.58 5C14.25 5 13.93 5.13 13.7 5.36L14.58 6.25ZM14.58 19.58L13.7 20.46C13.93 20.7 14.25 20.83 14.58 20.83C14.91 20.83 15.23 20.7 15.46 20.46L14.58 19.58ZM10.36 8.7C10.14 8.93 10.02 9.25 10.03 9.57C10.03 9.89 10.16 10.2 10.39 10.43C10.62 10.66 10.93 10.79 11.25 10.8C11.58 10.8 11.89 10.68 12.13 10.46L10.36 8.7ZM17.03 10.46C17.14 10.58 17.28 10.68 17.43 10.75C17.59 10.82 17.75 10.86 17.92 10.86C18.09 10.86 18.26 10.83 18.41 10.77C18.57 10.71 18.71 10.61 18.83 10.49C18.95 10.37 19.04 10.23 19.1 10.08C19.16 9.92 19.2 9.76 19.19 9.59C19.19 9.42 19.15 9.25 19.08 9.1C19.02 8.95 18.92 8.81 18.79 8.7L17.03 10.46ZM12.13 15.36C12.01 15.24 11.88 15.14 11.72 15.07C11.57 15 11.4 14.97 11.24 14.96C11.07 14.96 10.9 14.99 10.75 15.05C10.59 15.12 10.45 15.21 10.33 15.33C10.21 15.45 10.12 15.59 10.05 15.75C9.99 15.9 9.96 16.07 9.96 16.24C9.97 16.4 10 16.57 10.07 16.72C10.14 16.88 10.24 17.01 10.36 17.13L12.13 15.36ZM18.79 17.13C18.92 17.01 19.02 16.88 19.08 16.72C19.15 16.57 19.19 16.4 19.19 16.24C19.2 16.07 19.16 15.9 19.1 15.75C19.04 15.59 18.95 15.45 18.83 15.33C18.71 15.21 18.57 15.12 18.41 15.05C18.26 14.99 18.09 14.96 17.92 14.96C17.75 14.97 17.59 15 17.43 15.07C17.28 15.14 17.14 15.24 17.03 15.36L18.79 17.13ZM0 14.58L0 21.25L2.5 21.25L2.5 14.58L0 14.58ZM29.16 21.25L29.16 14.58L26.66 14.58L26.66 21.25L29.16 21.25ZM13.33 6.25L13.33 19.58L15.83 19.58L15.83 6.25L13.33 6.25ZM13.7 5.36L10.36 8.7L12.13 10.46L15.46 7.13L13.7 5.36ZM13.7 7.13L17.03 10.46L18.79 8.7L15.46 5.36L13.7 7.13ZM15.46 18.7L12.13 15.36L10.36 17.13L13.7 20.46L15.46 18.7ZM15.46 20.46L18.79 17.13L17.03 15.36L13.7 18.7L15.46 20.46ZM29.16 14.58C29.16 10.71 27.63 7 24.89 4.27C22.16 1.53 18.45 0 14.58 0L14.58 2.5C17.78 2.5 20.86 3.77 23.12 6.03C25.39 8.3 26.66 11.37 26.66 14.58L29.16 14.58ZM14.58 35.83C16.49 35.83 18.39 35.45 20.16 34.72C21.93 33.99 23.54 32.91 24.89 31.56C26.24 30.2 27.32 28.6 28.05 26.83C28.78 25.06 29.16 23.16 29.16 21.25L26.66 21.25C26.66 24.45 25.39 27.52 23.12 29.79C20.86 32.06 17.78 33.33 14.58 33.33L14.58 35.83ZM0 21.25C0 25.11 1.53 28.82 4.27 31.56C7 34.29 10.71 35.83 14.58 35.83L14.58 33.33C11.37 33.33 8.3 32.06 6.03 29.79C3.77 27.52 2.5 24.45 2.5 21.25L0 21.25ZM2.5 14.58C2.5 11.37 3.77 8.3 6.03 6.03C8.3 3.77 11.37 2.5 14.58 2.5L14.58 0C10.71 0 7 1.53 4.27 4.27C1.53 7 0 10.71 0 14.58L2.5 14.58Z"
							fill="#7B5E57" />
					</svg>

					<div class="reviews__item-bullet">
						<span></span>
						<span></span>
						<span class="active"></span>
					</div>
				</div>

				<img src="/img/Home/reviews/image3.jpeg" alt="" class="reviews__item-media" />
			</li>
		</ul>
	</div>
</section>

<style lang="scss">
	.reviews {
		// @include adaptiveValue('padding-top', 65, 45, 991, 479, 1);
		@include adaptiveValue('padding-bottom', 45, 30, 991, 479, 1);
		/* .reviews__container */
		&__container {
		}
		/* .reviews__title */
		&__title {
			color: rgba(#3f2c24b8, 0.72);
			// font-size: rem(40);
			@include adaptiveValue('font-size', 40, 30, 991, 767, 1);
			font-weight: 300;
			line-height: 150%;
			letter-spacing: rem(-1.1);
			text-transform: uppercase;

			// margin-bottom: rem(60);
			@include adaptiveValue('margin-bottom', 60, 20, 991, 767, 1);

			@media (max-width: $mobile) {
				@include adaptiveValue('font-size', 30, 16, 767, 479, 1);
			}
		}
		/* .reviews__heading */
		&__heading {
			color: #3f2c24;
			// font-size: rem(80);
			@include adaptiveValue('font-size', 80, 34, 767, 479, 1);
			line-height: 110%;
			letter-spacing: -1.1%;

			@include adaptiveValue('padding-left', 350, 0, 1300, 991, 1);
			margin-bottom: rem(60);

			p {
				font-weight: 300;
				font-style: italic;
			}
		}

		/* .reviews__items */
		&__items {
			// display: flex;
			// flex-direction: column;
			// gap: rem(25);

			// height: rem(849);
			@include adaptiveValue('height', 849, 530, 1840, 1300, 1);
			overflow: hidden;
			@media (max-width: em(1300)) {
				display: flex;
				max-height: 1300px;
				// height: auto;
				@include adaptiveValue('height', 1200, 830, 1300, 700, 1);

				@media (max-width: em(700)) {
					height: auto;
				}
			}
		}
		/* .reviews__item */
		&__item {
			@include adaptiveValue('height', 849, 530, 1840, 1300, 1);

			display: grid;
			grid-template-columns: auto 1fr auto auto;
			gap: rem(20);

			@media (max-width: em(1300)) {
				grid-template-columns: auto 1fr;
			}

			@media (max-width: em(700)) {
				display: flex;
				flex-direction: column;
				height: auto;
			}
			/* .reviews__item-info */
			&-info {
				display: flex;
				flex-direction: column;
				@media (max-width: em(1300)) {
					grid-column: 1/2;
					grid-row: 2/3;
					gap: 0;
				}
				@media (max-width: em(700)) {
					order: 2;
				}
			}
			/* .reviews__item-thumbnail */
			&-thumbnail {
				// width: rem(329);
				// height: rem(329);
				@include adaptiveValue('width', 329, 160, 1300, 767, 1);
				@include adaptiveValue('height', 329, 237, 1300, 767, 1);
				object-fit: cover;

				@media (max-width: em(700)) {
					display: none;
				}
			}
			/* .reviews__item-profile */
			&-profile {
				flex: 1;
				justify-content: flex-end;

				display: flex;
				flex-direction: column;
				// gap: rem(40);
				@include adaptiveValue('gap', 40, 10, 767, 479, 1);
			}
			/* .reviews__item-avatar */
			&-avatar {
				display: flex;
				justify-content: center;
				align-items: center;
				// width: rem(80);
				// height: rem(80);
				@include adaptiveValue('width', 80, 40, 767, 479, 1);
				@include adaptiveValue('height', 80, 40, 767, 479, 1);
				background-color: #ffcb14;
				border-radius: 50%;

				color: #ffffff;
				font-family: Montserrat;
				// font-size: rem(38);
				@include adaptiveValue('font-size', 38, 16, 767, 479, 1);

				font-weight: 500;
				line-height: 100%;
				text-align: center;

				&--marked {
					background-color: #7b5e57;
				}
			}
			/* .reviews__item-name */
			&-name {
				color: #3f2c24;
				// font-size: rem(24);
				@include adaptiveValue('font-size', 24, 16, 767, 479, 1);

				font-weight: 300;
				line-height: 110%;
				letter-spacing: -1.1%;
			}
			/* .reviews__item-content */
			&-content {
				display: flex;
				flex-direction: column;
				@media (max-width: em(1300)) {
					grid-column: 2/3;
					grid-row: 2/3;
				}
				@media (max-width: em(700)) {
					display: contents;
				}
			}
			/* .reviews__item-text */
			&-text {
				flex: 1;
				justify-content: center;

				display: flex;
				flex-direction: column;
				gap: rem(10);
				color: #3f2c24;
				// font-size: rem(24);
				@include adaptiveValue('font-size', 24, 20, 767, 479, 1);

				line-height: 130%;
				letter-spacing: -1.1%;

				span {
					font-weight: 300;
				}

				@media (max-width: em(1300)) {
					justify-content: flex-start;
				}
				@media (max-width: em(700)) {
					order: 5;
				}
			}
			/* .reviews__item-review */
			&-review {
				color: #3f2c24;
				// font-size: rem(24);
				@include adaptiveValue('font-size', 24, 18, 767, 479, 1);
				font-weight: 300;
				line-height: 130%;
				letter-spacing: -1.1%;
				@media (max-width: em(1300)) {
					padding-bottom: rem(50);
				}
				@media (max-width: em(700)) {
					padding-bottom: 0;
					order: 3;
				}
			}
			/* .reviews__item-bullets */
			&-bullets {
				align-self: center;

				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: rem(10);
				cursor: pointer;

				svg {
					@media (max-width: em(700)) {
						transform: rotate(-90deg);
						margin-right: rem(10);
					}
				}

				@media (max-width: em(1300)) {
					grid-column: 1/3;
					grid-row: 1/2;
					justify-self: flex-end;
				}

				@media (max-width: em(700)) {
					order: 1;
					align-items: flex-end;
				}
			}
			/* .reviews__item-bullet */
			&-bullet {
				display: flex;
				flex-direction: column;
				gap: rem(10);

				@media (max-width: em(1300)) {
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
			/* .reviews__item-media */
			&-media {
				// width: rem(794);
				@include adaptiveValue('width', 794, 400, 1840, 1300, 1);
				@include adaptiveValue('height', 849, 530, 1840, 1300, 1);

				// max-height: rem(849);
				// height: 100%;
				object-fit: cover;

				@media (max-width: em(1300)) {
					grid-column: 1/3;
					grid-row: 3/4;
					width: 100%;
				}
				@media (max-width: em(700)) {
					order: 4;
					@include adaptiveValue('height', 530, 300, 767, 479, 1);
				}
			}
		}
	}
</style>
