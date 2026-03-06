<script>
	import KeenSlider from 'keen-slider';
	import { onMount, onDestroy } from 'svelte';

	let slider;
	let sliderRef = $state(null);
	let observer;
	let animationFrame;

	const animation = { duration: 10000, easing: (t) => t };

	const startAutoMove = () => {
		if (!slider || !slider.track?.details) return;
		slider.moveToIdx(slider.track.details.abs + 1, true, animation);
	};

	onMount(() => {
		observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !slider) {
					// Дождаться момента, когда DOM точно готов
					animationFrame = requestAnimationFrame(() => {
						slider = new KeenSlider(sliderRef, {
							loop: true,
							mode: 'free',
							renderMode: 'performance',
							drag: true,
							breakpoints: {
								'(min-width: 320px)': { slides: { perView: 1, spacing: 20 } },
								'(min-width: 820px)': { slides: { perView: 'auto', spacing: 20 } },
								'(min-width: 1060px)': { slides: { perView: 'auto', spacing: 20 } }
							},
							slides: { perView: 'auto', spacing: 20 },
							created(s) {
								// Подождать одну отрисовку перед стартом, иначе будет "прыжок"
								requestAnimationFrame(() => startAutoMove());
							},
							updated(s) {
								startAutoMove();
							},
							animationEnded(s) {
								startAutoMove();
							}
						});
					});
				}
			},
			{ rootMargin: '100px' }
		);

		if (sliderRef) observer.observe(sliderRef);
	});

	onDestroy(() => {
		slider?.destroy();
		if (observer && sliderRef) observer.unobserve(sliderRef);
		if (animationFrame) cancelAnimationFrame(animationFrame);
	});
</script>

<section class="stock">
	<div class="stock__container">
		<h2 class="stock__title" data-aos="fade-up">Акции</h2>

		<header class="stock__header">
			<h3 class="stock__header-heading" data-aos="fade-up">
				То, что нужно <p>Тебе</p>
			</h3>

			<div class="stock__header-wrapper" data-aos="fade-up">
				<p class="stock__header-title">
					Закажите замер или начните с онлайн-калькулятора расчета стоимости мебели
				</p>
				<p class="stock__header-subtitle">Предложение ограничено по сроку и количеству заказов</p>
			</div>
		</header>

		<ul bind:this={sliderRef} class="stock__cards" data-aos="zoom-in-up">
			<li class="stock__card stock__card--first keen-slider__slide">
				<picture>
					<source srcset="/img/Home/stock/card1.jpeg" type="image/jpeg" />
					<source
						srcset="/img/Home/stock/card1-tablet.jpeg"
						type="image/jpeg"
						media="(max-width: 767px)" />
					<source
						srcset="/img/Home/stock/card1-mobile.jpeg"
						type="image/jpeg"
						media="(max-width: 479px)" />
					<img src="/img/Home/stock/card1.jpeg" alt="" class="stock__card-image" loading="lazy" />
				</picture>
				<div class="stock__card-wrapper">
					<a href="" class="stock__card-manager">Связаться с менеджером</a>
					<a href="/calculator" class="stock__card-calculator">( Запустить калькулятор )</a>
				</div>
			</li>

			<li class="stock__card stock__card--second keen-slider__slide">
				<picture>
					<source srcset="/img/Home/stock/card2.jpeg" type="image/jpeg" />
					<source
						srcset="/img/Home/stock/card2-tablet.jpeg"
						type="image/jpeg"
						media="(max-width: 767px)" />
					<source
						srcset="/img/Home/stock/card2-mobile.jpeg"
						type="image/jpeg"
						media="(max-width: 479px)" />
					<img src="/img/Home/stock/card2.jpeg" alt="" class="stock__card-image" loading="lazy" />
				</picture>
			</li>

			<li class="stock__card stock__card--third keen-slider__slide">
				<picture>
					<source srcset="/img/Home/stock/card3.jpeg" type="image/jpeg" />
					<source
						srcset="/img/Home/stock/card3-tablet.jpeg"
						type="image/jpeg"
						media="(max-width: 767px)" />
					<source
						srcset="/img/Home/stock/card3-mobile.jpeg"
						type="image/jpeg"
						media="(max-width: 479px)" />
					<img src="/img/Home/stock/card3.jpeg" alt="" class="stock__card-image" loading="lazy" />
				</picture>
				<div class="stock__card-wrapper">
					<a href="" class="stock__card-manager">Связаться с менеджером</a>
					<a href="/calculator" class="stock__card-calculator">( Запустить калькулятор )</a>
				</div>
			</li>
		</ul>
	</div>
</section>

<style lang="scss">
	.stock {
		// padding: rem(60) 0;
		// @include adaptiveValue('padding-top', 60, 30, 991, 479, 1);
		@include adaptiveValue('padding-bottom', 60, 20, 991, 479, 1);
		/* .stock__container */
		&__container {
		}
		/* .stock__title */
		&__title {
			color: rgba(#3f2c24b8, 0.72);
			// font-size: rem(40);
			@include adaptiveValue('font-size', 40, 30, 991, 767, 1);
			font-weight: 300;
			line-height: 150%;
			letter-spacing: rem(-1.1);
			text-transform: uppercase;

			// margin-bottom: rem(70);
			@include adaptiveValue('margin-bottom', 70, 20, 991, 767, 1);

			@media (max-width: $mobile) {
				@include adaptiveValue('font-size', 30, 16, 767, 479, 1);
				@include adaptiveValue('margin-bottom', 20, 10, 767, 479, 1);
			}
		}
		/* .stock__header */
		&__header {
			display: flex;
			align-items: center;

			@include adaptiveValue('padding-left', 350, 0, 1300, 991, 1);
			@include adaptiveValue('margin-bottom', 60, 20, 991, 767, 1);

			@media (max-width: $tablet) {
				flex-direction: column;
			}
			/* .stock__header-heading */
			&-heading {
				flex: 1 1 100%;
				color: #3f2c24;
				// font-size: rem(80);
				@include adaptiveValue('font-size', 80, 40, 767, 479, 1);
				font-weight: 500;
				line-height: 110%;
				letter-spacing: -1.1%;

				@media (max-width: $tablet) {
					align-self: flex-start;
				}

				p {
					font-weight: 300;
					font-style: italic;
				}
			}
			/* .stock__header-wrapper */
			&-wrapper {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				// gap: rem(10);
				@include adaptiveValue('gap', 10, 20, 991, 767, 1);

				@media (max-width: $tablet) {
					align-self: flex-end;
					transform: translateY(rem(-40));
					max-width: 70%;
				}

				@media (max-width: $mobileSmall) {
					display: none;
				}
			}
			/* .stock__header-title */
			&-title {
				color: #ff6f20;
				font-family: Montserrat;
				// font-size: rem(32);
				@include adaptiveValue('font-size', 32, 28, 991, 767, 1);

				line-height: math.div(36, 32);
				letter-spacing: rem(-1);
				text-align: right;
				// max-width: rem(500);
				max-width: rem(750);
			}
			/* .stock__header-subtitle */
			&-subtitle {
				color: #3f2c24;
				font-family: Montserrat;
				font-size: rem(18);
				line-height: 110%;
				letter-spacing: rem(-1.1);
				text-align: right;
				max-width: rem(300);
			}
		}

		/* .stock__cards */
		&__cards {
			display: flex;
			overflow: hidden;
		}
		/* .stock__card */
		&__card {
			// padding: rem(40);
			// height: rem(877);

			// @media (max-width: em(1060)) {
			// 	width: 100vw;
			// }

			// @media (max-width: em(767)) {
			// 	// height: rem(530);
			// 	@include adaptiveValue('height', 600, 530, 767, 479, 1);
			// }

			&-image {
				height: auto;
				// height: 100%;
				// object-fit: cover;
				@media (max-width: em(820)) {
					width: 100%;
					height: 100%;
				}
			}
		}
		/* .stock__card--first */
		&__card--first {
			position: relative;

			/* .stock__card-image */
			& .stock__card-image {
				// width: rem(1000);
				// @include adaptiveValue('width', 1000, 980, 1030, 991, 1);

				@media (max-width: em(1059.98)) {
					width: calc(100vw - rem(30));
					height: 100%;
				}

				// object-fit: cover;
				@media (max-width: em(820)) {
					width: 100%;
					height: 100%;
				}
			}

			/* .stock__card-wrapper */
			& .stock__card-wrapper {
				@include adaptiveValue('padding-right', 40, 25, 1060, 767, 1);
				@include adaptiveValue('padding-left', 40, 25, 1060, 767, 1);

				position: absolute;
				top: 47%;
				left: 0;
				z-index: 1;
				width: 100%;
				// @media (max-width: em(1059.98)) {
				// 	top: 35%;
				// }
				@media (max-width: $mobile) {
					@include adaptiveValue('padding-right', 30, 20, 767, 479, 1);
					@include adaptiveValue('padding-left', 30, 20, 767, 479, 1);
				}
				@media (max-width: $mobileSmall) {
					top: 35%;
				}
			}
		}
		/* .stock__card--second */
		&__card--second {
		}

		/* .stock__card--third */
		&__card--third {
			/* .stock__card-image */
			& .stock__card-image {
				// width: rem(1000);
				// @include adaptiveValue('width', 1000, 980, 1030, 991, 1);

				@media (max-width: em(1059.98)) {
					width: calc(100vw - rem(30));
					height: 100%;
				}

				// object-fit: cover;
				@media (max-width: em(820)) {
					width: 100%;
					height: 100%;
				}
			}

			/* .stock__card-wrapper */
			& .stock__card-wrapper {
				@include adaptiveValue('padding-right', 40, 25, 1060, 767, 1);
				@include adaptiveValue('padding-left', 40, 25, 1060, 767, 1);

				position: absolute;
				bottom: 0;
				left: 0;
				z-index: 1;
				width: 100%;
				// @media (max-width: em(1059.98)) {
				// 	top: 50%;
				// }
				@media (max-width: $mobile) {
					@include adaptiveValue('padding-right', 30, 20, 767, 479, 1);
					@include adaptiveValue('padding-left', 30, 20, 767, 479, 1);
				}
				// @media (max-width: $mobileSmall) {
				// 	top: 27%;
				// }

				@media (max-width: $mobileSmall) {
					// top: 69%;
					bottom: -3%;
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
				}
			}
		}

		/* .stock__card-wrapper */
		&__card-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			gap: rem(10);
			margin-bottom: rem(20);
			@media (max-width: $mobileSmall) {
				gap: 0;
			}
		}
		/* .stock__card-manager */
		&__card-manager {
			color: #ff6f20;
			// font-size: rem(18);
			@include adaptiveValue('font-size', 18, 12, 991, 479, 1);

			font-weight: 500;
			line-height: math.div(20, 18);
			text-transform: uppercase;
		}
		/* .stock__card-calculator */
		&__card-calculator {
			color: inherit;
			font-family: Montserrat;
			// font-size: rem(18);
			@include adaptiveValue('font-size', 18, 12, 991, 479, 1);
			font-weight: 500;
			line-height: math.div(20, 18);
			text-transform: uppercase;
		}
	}
</style>
