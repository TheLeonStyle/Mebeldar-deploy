<script>
	import KeenSlider from 'keen-slider';
	import { onMount } from 'svelte';

	const reviews = [
		{
			text: 'Все сделали точно в срок, проект совпал с реальностью на 100%. Установили быстро и аккуратно. Очень довольны — теперь вся семья собирается на кухне!',
			name: 'Ирина'
		},
		{
			text: 'Все сделали точно в срок, проект совпал с реальностью на 100%. Установили быстро и аккуратно. Очень довольны — теперь вся семья собирается на кухне!',
			name: 'Антон'
		},
		{
			text: 'Все сделали точно в срок, проект совпал с реальностью на 100%. Установили быстро и аккуратно. Очень довольны — теперь вся семья собирается на кухне!',
			name: 'Мария'
		},
		{
			text: 'Все сделали точно в срок, проект совпал с реальностью на 100%. Установили быстро и аккуратно. Очень довольны — теперь вся семья собирается на кухне!',
			name: 'Сергей'
		},
		{
			text: 'Все сделали точно в срок, проект совпал с реальностью на 100%. Установили быстро и аккуратно. Очень довольны — теперь вся семья собирается на кухне!',
			name: 'Екатерина'
		}
	];

	let sliderRef = $state(null);
	let slider;
	let currentSlide = $state(0);
	let totalSlides = $state(0);

	const prevSlide = () => slider.prev();
	const nextSlide = () => slider.next();

	onMount(() => {
		slider = new KeenSlider(sliderRef, {
			mode: 'free-snap',
			slides: {
				perView: 1,
				spacing: 20
			},
			slideChanged(s) {
				currentSlide = s.track.details.rel;
			},
			created(s) {
				totalSlides = s.track.details.slides.length;
			}
		});
	});
</script>

<section class="reviews">
	<div class="reviews__container">
		<ul bind:this={sliderRef} class="reviews__items" data-aos="fade-up">
			<li class="reviews__item keen-slider__slide">
				«Все сделали точно в срок, проект совпал с реальностью на 100%. Установили быстро и
				аккуратно. Очень довольны — теперь вся семья собирается на кухне!»
			</li>
			<li class="reviews__item keen-slider__slide">
				«Все сделали точно в срок, проект совпал с реальностью на 100%. Установили быстро и
				аккуратно. Очень довольны — теперь вся семья собирается на кухне!»
			</li>
			<li class="reviews__item keen-slider__slide">
				«Все сделали точно в срок, проект совпал с реальностью на 100%. Установили быстро и
				аккуратно. Очень довольны — теперь вся семья собирается на кухне!»
			</li>
			<li class="reviews__item keen-slider__slide">
				«Все сделали точно в срок, проект совпал с реальностью на 100%. Установили быстро и
				аккуратно. Очень довольны — теперь вся семья собирается на кухне!»
			</li>
			<li class="reviews__item keen-slider__slide">
				«Все сделали точно в срок, проект совпал с реальностью на 100%. Установили быстро и
				аккуратно. Очень довольны — теперь вся семья собирается на кухне!»
			</li>
		</ul>

		<div class="reviews__bottom">
			<p class="reviews__name">— {reviews[currentSlide].name}</p>
			<div class="reviews__navigation">
				<button class="reviews__button reviews__button--prev" onclick={prevSlide}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M19 12L5 12" stroke="#7B5E57" stroke-width="2" />
						<path d="M12 5L5 12L12 19" stroke="#7B5E57" stroke-width="2" />
					</svg>
				</button>
				<p class="reviews__count">
					<span>0{currentSlide + 1}</span>
					/0{totalSlides}
				</p>
				<button class="reviews__button reviews__button--next active" onclick={nextSlide}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M19 12L5 12" stroke="#7B5E57" stroke-width="2" />
						<path d="M12 5L5 12L12 19" stroke="#7B5E57" stroke-width="2" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.reviews {
		@include adaptiveValue('padding-top', 115, 45, 991, 767, 1);
		@include adaptiveValue('padding-bottom', 115, 45, 991, 767, 1);
		background-color: #ddd0c8;

		/* .reviews__container */
		&__container {
			max-width: rem(1375);
		}
		/* .reviews__items */
		&__items {
			display: flex;
			overflow: hidden;

			// margin-bottom: rem(75);
			@include adaptiveValue('margin-bottom', 75, 10, 991, 767, 1);
		}
		/* .reviews__item */
		&__item {
			color: #3f2c24;
			font-family: Montserrat;
			@include adaptiveValue('font-size', 36, 18, 767, 479, 1);
			font-weight: 600;
			line-height: 160%;
			letter-spacing: -3%;
		}
		/* .reviews__bottom */
		&__bottom {
			display: flex;
			justify-content: space-between;

			@media (max-width: $mobile) {
				flex-direction: column;
				gap: rem(20);
			}
		}
		/* .reviews__name */
		&__name {
			color: #3f2c24;
			// font-size: rem(20);
			@include adaptiveValue('font-size', 20, 16, 767, 479, 1);
			font-weight: 600;
			line-height: 180%;
		}
		/* .reviews__navigation */
		&__navigation {
			display: flex;
			align-items: center;
			// gap: rem(40);
			@include adaptiveValue('gap', 40, 20, 767, 479, 1);
		}
		/* .reviews__button */
		&__button {
			display: flex;
			justify-content: center;
			align-items: center;

			width: rem(88);
			height: rem(56);
			box-sizing: border-box;
			border: rem(1) solid #3f2c24;
			border-radius: rem(70);
			transition: background-color 0.3s ease 0s;

			@media (max-width: $mobile) {
				width: rem(68);
				height: rem(36);
			}

			/* .reviews__button--prev */
			&--prev {
			}
			/* .reviews__button--next */
			&--next {
				transform: rotate(-180deg);
			}

			&:hover,
			&.active {
				border: none;
				background-color: rgb(63, 44, 36);
				path {
					stroke: #ffffff;
				}
			}
		}
		/* .reviews__count */
		&__count {
			color: #7b5e57;
			font-weight: 600;
			line-height: 180%;

			span {
				color: #3f2c24;
				text-decoration: underline;
			}
		}
	}
</style>
