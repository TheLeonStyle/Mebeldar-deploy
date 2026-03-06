<script>
	const slides = [
		{ src: '/img/About/intro/1.jpg', alt: 'Слайд 1' },
		{ src: '/img/About/intro/2.jpg', alt: 'Слайд 2' },
		{ src: '/img/About/intro/3.jpg', alt: 'Слайд 3' },
		{ src: '/img/About/intro/4.jpg', alt: 'Слайд 4' }
	];

	let activeIndex = $state(0);

	const setActiveIndex = (i) => {
		activeIndex = ((i % slides.length) + slides.length) % slides.length;
	};

	const prevSlide = () => {
		setActiveIndex(activeIndex - 1);
	};

	const nextSlide = () => {
		setActiveIndex(activeIndex + 1);
	};

	const getSlidePosition = (i) => (i - activeIndex + slides.length) % slides.length;
</script>

<section class="intro">
	<div class="intro__container">
		<div class="intro__content" data-aos="zoom-in-right">
			<h1 class="intro__title">
				Mebeldar
				<p>Производство корпусной мебели</p>
			</h1>

			<div class="intro__text">
				<p class="intro__subtitle intro__subtitle--weight">
					В Mebeldar мы верим, что мебель — это не просто предмет, а часть жизни.
				</p>
				<p class="intro__subtitle">
					Мы ценим честность в работе, внимание к деталям и долговечность во всём: от материалов до
					отношений с клиентами.
				</p>
				<p class="intro__subtitle">
					Каждый проект мы создаём так, как сделали бы для себя — с уважением к пространству,
					времени и будущим воспоминаниям, которые родятся в этих интерьерах.
				</p>
			</div>
		</div>

		<div class="intro__wrapper" data-aos="zoom-in-left">
			<div class="intro__arrows">
				<button class="intro__arrow intro__arrow--prev" onclick={prevSlide}>
					<svg viewBox="0 0 10.3604 21.0042" width="10.360352" height="21.004150" fill="none">
						<path
							d="M0 8.56759e-07L9.23077 9.04632C9.43478 9.24625 9.71148 9.35858 10 9.35858C10.2885 9.35858 10.5652 9.24625 10.7692 9.04632L20 0"
							stroke="#DDD0C8"
							transform="matrix(1.19249e-08,1,-1,1.19249e-08,9.8584,0.502075)" />
					</svg>
				</button>
				<button class="intro__arrow intro__arrow--next active" onclick={nextSlide}>
					<svg viewBox="0 0 10.3604 21.0042" width="10.360352" height="21.004150" fill="none">
						<path
							d="M0 8.56759e-07L9.23077 9.04632C9.43478 9.24625 9.71148 9.35858 10 9.35858C10.2885 9.35858 10.5652 9.24625 10.7692 9.04632L20 0"
							stroke="#DDD0C8"
							transform="matrix(1.19249e-08,1,-1,1.19249e-08,9.8584,0.502075)" />
					</svg>
				</button>
			</div>

			<ul class="intro__slider">
				{#each slides as slide, index}
					<li
						class="intro__slide intro__slide--{getSlidePosition(index)}"
						onclick={() => setActiveIndex(index)}>
						<img src={slide.src} alt={slide.alt} class="intro__image" />
					</li>
				{/each}
			</ul>

			<div class="intro__bullets" aria-label="Буллеты слайдера">
				{#each slides as _, index}
					<button
						class="intro__bullet"
						class:active={index === activeIndex}
						onclick={() => setActiveIndex(index)}>
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.intro {
		@include adaptiveValue('padding-top', 200, 110, 991, 767, 1);

		@media (max-width: $mobile) {
			padding-top: rem(30);
		}
		/* .intro__container */
		&__container {
			display: flex;
			gap: rem(20);
			@media (max-width: $tablet) {
				flex-direction: column;
			}
		}
		/* .intro__content */
		&__content {
			flex: 0 1 percent(795, 1840);
		}
		/* .intro__title */
		&__title {
			color: #3f2c24;
			@include adaptiveValue('font-size', 80, 40, 767, 479, 1);
			font-weight: 500;
			line-height: 110%;
			text-transform: uppercase;

			max-width: rem(675);
			// margin-bottom: rem(75);
			@include adaptiveValue('margin-bottom', 75, 30, 991, 767, 1);

			@media (max-width: $mobileSmall) {
				@include adaptiveValue('font-size', 40, 36, 479, 320, 1);
			}

			p {
				font-weight: 300;
				font-style: italic;
				text-transform: none;
			}
		}
		/* .intro__text */
		&__text {
		}
		/* .intro__subtitle */
		&__subtitle {
			color: #3f2c24;
			font-family: Montserrat;
			// font-size: rem(32);
			@include adaptiveValue('font-size', 32, 18, 767, 479, 1);

			line-height: 130%;
			letter-spacing: rem(-1.1);

			&:not(:last-child) {
				@include adaptiveValue('margin-bottom', 20, 10, 767, 479, 1);
			}
			/* .intro__subtitle--weight */
			&--weight {
				font-weight: 500;
			}
		}

		/* .intro__wrapper */
		&__wrapper {
			flex: 1;
			// overflow: hidden;

			display: flex;
			flex-direction: column;

			@include adaptiveValue('padding-top', 75, 20, 991, 767, 1);
			@include adaptiveValue('padding-bottom', 45, 20, 991, 767, 1);

			position: relative;

			&:after {
				content: '';
				position: absolute;
				top: 0;
				right: rem(-15);

				// width: 788px;
				width: 75%;
				// height: 739px;
				height: 100%;
				background-color: #ddd0c842;
				z-index: -1;
			}
		}
		/* .intro__arrows */
		&__arrows {
			align-self: flex-end;

			display: flex;
			justify-content: space-between;
			align-items: center;
			max-width: rem(76);
			width: 100%;

			@include adaptiveValue('margin-bottom', 30, 10, 991, 767, 1);
			@include adaptiveValue('margin-right', 100, 20, 991, 767, 1);
		}
		/* .intro__arrow */
		&__arrow {
			background: transparent;
			border: none;
			cursor: pointer;
			padding: rem(6);
			border-radius: rem(6);

			&:hover,
			&.active {
				path {
					stroke: #7b5e57;
				}
			}
			/* .intro__arrow--prev */
			&--prev {
			}
			/* .intro__arrow--next */
			&--next {
				transform: rotate(-180deg) translate(0, 17%);
			}
		}

		/* .intro__slider */
		&__slider {
			flex: 1;

			/* display: flex; */
			overflow: hidden;
			align-items: center;
			gap: rem(20);

			@include adaptiveValue('margin-bottom', 50, 20, 991, 767, 1);

			position: relative;
			@media (max-width: $tablet) {
				min-height: rem(400);
			}
		}
		/* .intro__slide */
		&__slide {
			width: rem(213);
			height: rem(200);
			cursor: pointer;

			position: absolute;
			top: 50%;
			transform: translateY(-50%);

			transition:
				left 1s cubic-bezier(0.2, 0.8, 0.2, 1),
				width 1s cubic-bezier(0.2, 0.8, 0.2, 1),
				height 1s cubic-bezier(0.2, 0.8, 0.2, 1),
				transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);

			@media (max-width: $mobile) {
				width: 100%;
			}

			&--0 {
				left: 0;
				z-index: 2;

				width: rem(561);
				height: rem(505);
				@media (max-width: $mobile) {
					width: 100%;
				}
			}

			&--1 {
				left: percent(345, 1025);
				z-index: 1;

				width: rem(331);
				height: rem(419);
				@media (max-width: $mobile) {
					width: 100%;
				}
			}

			&--2 {
				left: percent(695, 1025);
			}

			&--3 {
				left: percent(928, 1025);
			}
		}
		/* .intro__image */
		&__image {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		/* .intro__bullets */
		&__bullets {
			align-self: flex-end;

			display: flex;
			align-items: center;
			gap: rem(15);

			@include adaptiveValue('margin-right', 100, 20, 991, 767, 1);
		}
		/* .intro__bullet */
		&__bullet {
			width: rem(8);
			height: rem(8);
			border-radius: 50%;
			cursor: pointer;
			background-color: #ddd0c8;
			border: none;
			padding: 0;

			&.active {
				width: rem(10);
				height: rem(10);
				background-color: #7b5e57;
			}
		}
	}
</style>
