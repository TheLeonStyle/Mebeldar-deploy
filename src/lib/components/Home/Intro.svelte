<script>
	import { goto } from '$app/navigation';

	const scrollToElement = (id) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	};

	const handleLinkPortfolio = (event) => {
		goto('/portfolio').then(() => {
			setTimeout(() => scrollToElement('portfolio'), 200);
		});
	};
</script>

<section class="intro">
	<div class="intro__container">
		<div class="intro__content" data-aos="zoom-in-right">
			<h1 class="intro__title">
				Сoберите мебель <p>своей Мeчты —</p>
			</h1>

			<a href="/portfolio" class="intro__link" onclick={handleLinkPortfolio}>
				<div class="intro__link-text">
					<p>Посмотреть</p>
					готовые варианты
				</div>

				<svg width="60" height="60" viewBox="0 0 60 60">
					<rect x="60" rx="30" width="60" height="60" transform="rotate(90 60 0)" fill="#FF6F20" />
					<path d="M41 22.58L41 40.95L39.68 40.95L39.68 22.58L41 22.58Z" fill="#FFFFFF" />
					<path d="M22.62 39.64L41 39.64L41 40.95L22.62 40.95L22.62 39.64Z" fill="#FFFFFF" />
					<path d="M20.94 20L40.34 39.4L39.41 40.33L20.01 20.92L20.94 20Z" fill="#FFFFFF" />
				</svg>
			</a>
			<img src="/img/Home/intro/image.jpeg" alt="" class="intro__image" loading="lazy" />
		</div>

		<div class="intro__media" data-aos="zoom-in-left">
			<header class="intro__header">
				<p class="intro__header-text">
					Получите расчёт стоимости мебели прямо на сайте — за несколько минут
				</p>
				<a href="/calculator" class="intro__header-link">
					<p>Рассчитать</p>
					стоимость мебели
				</a>
			</header>

			<div class="intro__video">
				<video src="/video/Home/intro/video.mp4" autoplay muted></video>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.intro {
		// padding-top: rem(200);
		@include adaptiveValue('padding-top', 200, 110, 991, 767, 1);

		@media (max-width: $mobile) {
			padding-top: rem(30);
		}
		/* .intro__container */
		&__container {
			display: flex;
			gap: rem(20);
			overflow: hidden; // ???

			@media (max-width: em(1300)) {
				flex-direction: column;
				gap: 0;
			}
		}
		/* .intro__content */
		&__content {
			flex: 0 1 rem(678);

			display: flex;
			flex-direction: column;

			@media (max-width: em(1300)) {
				display: contents;
			}
		}
		/* .intro__title */
		&__title {
			color: #3f2c24;
			// font-size: rem(80);
			@include adaptiveValue('font-size', 80, 34, 767, 479, 1);
			font-weight: 500;
			line-height: 150%;
			letter-spacing: -1.1%;
			margin-bottom: rem(40);

			p {
				font-weight: 300;
				font-style: italic;
			}
			@media (max-width: em(1300)) {
				order: 1;
				margin-bottom: rem(30);
			}
		}
		/* .intro__link */
		&__link {
			flex: 1;

			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: rem(25);

			@media (max-width: em(1300)) {
				order: 3;
			}

			&-text {
				color: #3f2c24;
				font-family: Montserrat;
				// font-size: rem(32);
				@include adaptiveValue('font-size', 32, 22, 767, 479, 1);
				line-height: math.div(36, 32);
				letter-spacing: rem(-1.1);
				text-transform: uppercase;
			}

			svg {
				@include adaptiveValue('width', 60, 40, 767, 479, 1);
				@include adaptiveValue('height', 60, 40, 767, 479, 1);
			}
		}
		/* .intro__image */
		&__image {
			max-width: rem(678);
			max-height: rem(475);
			width: 100%;
			height: auto;
			@media (max-width: em(1300)) {
				order: 4;
				max-width: 100%;
				max-height: rem(710);
				height: 100%;
			}

			@media (max-width: $mobile) {
				// max-height: rem(400);
				@include adaptiveValue('max-height', 400, 250, 767, 479, 1);
			}
		}
		/* .intro__media */
		&__media {
			flex: 1;
			// padding-top: rem(25);
			align-content: flex-end;

			@media (max-width: em(1300)) {
				order: 2;
			}
		}
		/* .intro__header */
		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: rem(20);
			margin-bottom: rem(25);

			@include adaptiveValue('margin-bottom', 25, 15, 991, 767, 1);

			@media (max-width: $mobileSmall) {
				flex-direction: column;
			}
			/* .intro__header-text */
			&-text {
				color: #3f2c24;
				font-family: Montserrat;
				// font-size: rem(32);
				@include adaptiveValue('font-size', 32, 22, 767, 479, 1);

				line-height: math.div(36, 32);
				letter-spacing: rem(-1);
				max-width: rem(670);
			}
			/* .intro__header-link */
			&-link {
				color: #3f2c24;
				font-size: rem(22);
				line-height: 130%;
				letter-spacing: rem(-1);
				text-align: right;
				transition:
					color 1s ease 0s,
					transform 1s ease 0s;

				@media (any-hover: hover) {
					&:hover {
						color: #ff6f20;
						transform: translateX(rem(-20));
					}
				}

				@media (max-width: $tablet) {
					white-space: nowrap;
				}

				@media (max-width: $mobileSmall) {
					display: flex;
					gap: rem(7);
					align-self: flex-start;
				}
			}
		}
		/* .intro__video */
		&__video {
			position: relative;
			// height: rem(710);
			height: 100%;
			width: 100%;

			// width: 704px;
			// height: 675px;
			@media (max-width: em(1920)) {
				// max-height: rem(710);
				height: 100%;

				// height: 100%;
				margin-bottom: rem(30);
			}

			@media (max-width: $mobile) {
				// max-height: rem(400);
				@include adaptiveValue('max-height', 400, 250, 767, 479, 1);
				overflow: hidden;
			}

			video {
				width: rem(1182);
				height: 100%;
				object-fit: cover;

				position: absolute;
				top: 0;
				left: 0;

				@media (max-width: em(1920)) {
					position: static;
					width: 100%;
				}
			}
		}
	}
</style>
