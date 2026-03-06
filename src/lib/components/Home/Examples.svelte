<script>
	import KeenSlider from 'keen-slider';
	import { onDestroy, onMount } from 'svelte';

	let slider;
	let sliderRef = $state(null);
	let autoplayInterval;
	let observer;

	const startAutoplay = () => {
		if (!autoplayInterval) {
			autoplayInterval = setInterval(() => {
				slider?.next();
			}, 2000);
		}
	};

	const stopAutoplay = () => {
		if (autoplayInterval) {
			clearInterval(autoplayInterval);
			autoplayInterval = null;
		}
	};

	onMount(() => {
		slider = new KeenSlider(sliderRef, {
			mode: 'free-snap',
			breakpoints: {
				'(min-width: 320px)': {
					slides: { origin: 'center', perView: 1, spacing: 10 }
				},
				'(min-width: 479px)': {
					slides: { origin: 'center', perView: 2, spacing: 20 }
				},
				'(min-width: 767px)': {
					slides: { origin: 'center', perView: 3, spacing: 20 }
				},
				'(min-width: 991px)': {
					slides: { origin: 'center', perView: 4, spacing: 20 }
				},
				'(min-width: 1400px)': {
					slides: { origin: 'center', perView: 5, spacing: 20 }
				}
			},
			slides: {
				origin: 'center',
				perView: 6,
				spacing: 20
			}
			// loop: true
		});

		// Настройка IntersectionObserver
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						startAutoplay();
					} else {
						stopAutoplay();
					}
				});
			},
			{
				threshold: 0.4 // хотя бы 40% видно — запускаем
			}
		);

		if (sliderRef) observer.observe(sliderRef);

		onDestroy(() => {
			stopAutoplay();
			if (slider) slider.destroy();
			if (observer && sliderRef) observer.unobserve(sliderRef);
		});
	});
</script>

<section class="examples">
	<div class="examples__container">
		<h2 class="examples__title" data-aos="fade-up">Примеры работ</h2>

		<h3 class="examples__heading" data-aos="fade-up">
			Готовые проекты
			<p>для вдохновения</p>
		</h3>

		<p class="examples__text" data-aos="fade-up">
			Хочу такую мебель
			<svg width="11.505859" height="14.708496" viewBox="0 0 11.5059 14.7085" fill="none">
				<path
					d="M6.37 0.62C6.37 0.45 6.31 0.3 6.19 0.18C6.07 0.06 5.91 0 5.75 0C5.58 0 5.42 0.06 5.31 0.18C5.19 0.3 5.12 0.45 5.12 0.62L6.37 0.62ZM5.12 0.62L5.12 13.95L6.37 13.95L6.37 0.62L5.12 0.62Z"
					fill="#3F2C24" />
				<path d="M10.75 8.95L5.75 13.95L0.75 8.95" stroke="#3F2C24" stroke-width="1.500000" />
			</svg>
		</p>

		<ul bind:this={sliderRef} class="examples__items" data-aos="fade-up">
			<li class="examples__item keen-slider__slide">
				<a href="" class="examples__item-link">
					<img src="/img/Home/examples/1.jpeg" alt="" class="examples__item-image" />
					<p class="examples__item-description">«Современная кухня в белом глянце»</p>
					<p class="examples__item-price">Цена XX руб.</p>
				</a>
			</li>
			<li class="examples__item keen-slider__slide">
				<a href="" class="examples__item-link">
					<img src="/img/Home/examples/2.jpeg" alt="" class="examples__item-image" />
					<p class="examples__item-description">«Современная кухня в белом глянце»</p>
					<p class="examples__item-price">Цена XX руб.</p>
				</a>
			</li>
			<li class="examples__item keen-slider__slide">
				<a href="" class="examples__item-link">
					<img src="/img/Home/examples/3.jpeg" alt="" class="examples__item-image" />
					<p class="examples__item-description">«Современная кухня в белом глянце»</p>
					<p class="examples__item-price">Цена XX руб.</p>
				</a>
			</li>
			<li class="examples__item keen-slider__slide">
				<a href="" class="examples__item-link">
					<img src="/img/Home/examples/4.jpeg" alt="" class="examples__item-image" />
					<p class="examples__item-description">«Современная кухня в белом глянце»</p>
					<p class="examples__item-price">Цена XX руб.</p>
				</a>
			</li>
			<li class="examples__item keen-slider__slide">
				<a href="" class="examples__item-link">
					<img src="/img/Home/examples/5.jpeg" alt="" class="examples__item-image" />
					<p class="examples__item-description">«Современная кухня в белом глянце»</p>
					<p class="examples__item-price">Цена XX руб.</p>
				</a>
			</li>
			<li class="examples__item keen-slider__slide">
				<a href="" class="examples__item-link">
					<img src="/img/Home/examples/6.jpeg" alt="" class="examples__item-image" />
					<p class="examples__item-description">«Современная кухня в белом глянце»</p>
					<p class="examples__item-price">Цена XX руб.</p>
				</a>
			</li>
		</ul>
	</div>
</section>

<style lang="scss">
	.examples {
		// padding-top: rem(60);
		// padding-bottom: rem(60);
		// @include adaptiveValue('padding-top', 60, 20, 991, 479, 1);
		@include adaptiveValue('padding-bottom', 60, 20, 991, 479, 1);
		/* .examples__container */
		&__container {
		}
		/* .examples__title */
		&__title {
			color: #7b5e57;
			font-size: rem(40);
			@include adaptiveValue('font-size', 40, 30, 991, 767, 1);
			font-weight: 300;
			line-height: 150%;
			letter-spacing: rem(-1.1);
			text-transform: uppercase;
			margin-bottom: rem(60);
			@include adaptiveValue('margin-bottom', 60, 20, 991, 767, 1);

			@media (max-width: $mobile) {
				@include adaptiveValue('font-size', 30, 16, 767, 479, 1);
			}
		}
		/* .examples__heading */
		&__heading {
			color: #3f2c24;
			// font-size: rem(80);
			@include adaptiveValue('font-size', 80, 40, 767, 479, 1);
			font-weight: 500;
			line-height: 110%;
			letter-spacing: -1.1%;

			// margin-bottom: rem(60);
			@include adaptiveValue('margin-bottom', 60, 40, 991, 767, 1);
			// padding-left: rem(340);
			@include adaptiveValue('padding-left', 340, 0, 1300, 991, 1);

			@media (max-width: $mobileSmall) {
				@include adaptiveValue('font-size', 40, 36, 479, 320, 1);
			}

			p {
				font-weight: 300;
				font-style: italic;
			}
		}
		/* .examples__text */
		&__text {
			display: flex;
			flex-direction: column;
			align-items: center;

			color: rgba(#3f2c24b8, 0.72);
			// font-size: rem(40);
			@include adaptiveValue('font-size', 40, 20, 767, 479, 1);

			line-height: 150%;
			letter-spacing: -1.1%;
			text-align: center;

			margin: 0 auto rem(30);
			// margin-bottom: rem(30);

			svg {
				// transition: transform 0.3s ease 0s;
				animation: pulse-transform 2s ease-in-out infinite;
			}
		}

		/* .examples__items */
		&__items {
			display: flex;
			// justify-content: center;
			// gap: rem(20);
			overflow: hidden;
		}
		/* .examples__item */
		&__item {
			flex: 0 0 rem(329);

			display: flex;
			flex-direction: column;
			gap: rem(10);
			/* .examples__item-image */
			&-image {
				// max-width: rem(329);
				width: 100%;
				height: rem(329);
			}
			/* .examples__item-description */
			&-description {
				color: rgba(#3f2c24b8, 0.72);
				font-family: Montserrat;
				font-size: rem(22);
				line-height: 150%;
				letter-spacing: -1.1%;
			}
			/* .examples__item-price */
			&-price {
				color: rgba(#3f2c24b8, 0.72);
				font-family: Montserrat;
				font-size: rem(22);
				line-height: 150%;
				letter-spacing: -1.1%;
			}
		}
	}

	@keyframes pulse-transform {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(rem(6));
		}
		100% {
			transform: translateY(0);
		}
	}
</style>
