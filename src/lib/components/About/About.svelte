<section class="about">
	<div class="about__container">
		<h2 class="about__title" data-aos="fade-up">О Нас</h2>

		<header class="about__header" data-aos="fade-up">
			<h3 class="about__heading">
				Про мебель
				<p>и людей</p>
			</h3>
			<div class="about__text">
				<h4 class="about__text-title">Официальная гарантия 30 месяцев</h4>
				<p class="about__text-subtitle">
					Мы уверенны в своей мебели — и подтверждаем это документально. Все изделия сопровождаются
					договором, в котором прописаны условия и срок гарантии: 30 месяцев.
				</p>
				<p class="about__text-subtitle">
					Если вдруг что-то случится — Вы не останетесь один на один с проблемой.
				</p>
			</div>
		</header>

		<div class="about__wrapper">
			<div class="about__item" data-aos="fade-up">
				<img src="/img/About/about/item.jpg" alt="" class="about__item-image" />
				<h3 class="about__item-title">Собственное производство</h3>
				<p class="about__item-text">
					Мы не просто собираем кухни — мы производим их сами, на собственной фабрике. Это значит,
					что каждый этап — от распила до упаковки — находится под строгим контролем.
				</p>
				<p class="about__item-text">
					Никаких посредников, задержек или компромиссов по качеству. Только проверенные материалы,
					современное оборудование и команда, которая работает с душой.
				</p>
			</div>

			<div class="about__content" data-aos="fade-up">
				<div class="about__left">
					<div class="about__block">
						<h3 class="about__block-title">
							Монтаж под ключ — вы просто наслаждаетесь результатом
						</h3>
						<p class="about__block-text">
							Вам не нужно искать замерщика, дизайнера и установщика отдельно. Мы берём на себя весь
							процесс: от бесплатного замера и 3D-визуализации до аккуратной установки на месте.
						</p>
						<p class="about__block-text">Всё — по договору, со сроками и с гарантией</p>
					</div>

					<img
						src="/img/About/about/block1.jpg"
						alt=""
						class="about__block-image about__block-image--left" />
				</div>

				<div class="about__right" data-aos="fade-up">
					<div class="about__block">
						<h3 class="about__block-title">Индивидуальные размеры — под любое пространство</h3>
						<p class="about__block-text">Ваш интерьер уникален — и мы это уважаем.</p>
					</div>

					<img
						src="/img/About/about/block2.jpg"
						alt=""
						class="about__block-image about__block-image--right" />
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.about {
		@include adaptiveValue('padding-top', 65, 35, 991, 767, 1);
		@include adaptiveValue('padding-bottom', 65, 35, 991, 767, 1);
		/* .about__container */
		&__container {
		}
		/* .about__title */
		&__title {
			color: #7b5e57;
			@include adaptiveValue('font-size', 40, 30, 991, 767, 1);
			font-weight: 300;
			line-height: 150%;
			letter-spacing: rem(-1.1);
			text-transform: uppercase;

			@include adaptiveValue('margin-bottom', 50, 20, 991, 767, 1);

			@media (max-width: $mobile) {
				@include adaptiveValue('font-size', 30, 16, 767, 479, 1);
			}
		}
		/* .about__header */
		&__header {
			display: flex;
			justify-content: space-between;
			gap: rem(20);
			margin-bottom: rem(10);

			@media (max-width: $tablet) {
				flex-direction: column;
			}
		}
		/* .about__heading */
		&__heading {
			color: #3f2c24;
			@include adaptiveValue('font-size', 80, 40, 767, 479, 1);
			font-weight: 300;
			line-height: 110%;
			letter-spacing: -1.1%;
			font-weight: 500;
			white-space: nowrap;

			@include adaptiveValue('padding-left', 340, 0, 1300, 991, 1);

			@media (max-width: $mobileSmall) {
				@include adaptiveValue('font-size', 40, 36, 479, 320, 1);
			}

			p {
				font-weight: 300;
				font-style: italic;
			}
		}
		/* .about__text */
		&__text {
			display: flex;
			flex-direction: column;
			gap: rem(10);
			max-width: rem(680);

			@media (max-width: $tablet) {
				align-self: flex-end;
			}
			/* .about__text-title */
			&-title {
				color: #3f2c24;
				font-family: Montserrat;
				// font-size: rem(28);
				@include adaptiveValue('font-size', 28, 18, 767, 479, 1);

				font-weight: 500;
				line-height: 130%;
				letter-spacing: rem(-1.1);
				text-align: right;
				text-transform: uppercase;
			}
			/* .about__text-subtitle */
			&-subtitle {
				color: #3f2c24;
				font-family: Montserrat;
				// font-size: rem(20);
				@include adaptiveValue('font-size', 20, 16, 767, 479, 1);

				line-height: 110%;
				letter-spacing: rem(-1.1);
				text-align: right;
			}
		}

		/* .about__wrapper */
		&__wrapper {
			display: flex;
			justify-content: space-between;
			gap: rem(20);
			@media (max-width: $tablet) {
				flex-direction: column;
			}
		}
		/* .about__item */
		&__item {
			flex: 0 1 rem(445);
			justify-content: flex-end;

			display: flex;
			flex-direction: column;
			@include adaptiveValue('gap', 16, 10, 767, 479, 1);
			/* .about__item-image */
			&-image {
				max-width: rem(329);
				width: 100%;
				// height: rem(329);
				@include adaptiveValue('height', 329, 280, 767, 479, 1);
				object-fit: cover;
				@media (max-width: $tablet) {
					max-width: 100%;
				}
			}
			/* .about__item-title */
			&-title {
				color: #3f2c24;
				font-family: Montserrat;
				@include adaptiveValue('font-size', 28, 18, 767, 479, 1);
				font-weight: 500;
				line-height: 130%;
				letter-spacing: rem(-1.1);
				text-transform: uppercase;
			}
			/* .about__item-text */
			&-text {
				color: #3f2c24;
				font-family: Montserrat;
				@include adaptiveValue('font-size', 20, 16, 767, 479, 1);
				line-height: 110%;
				letter-spacing: rem(-1.1);
			}
		}

		/* .about__content */
		&__content {
			display: flex;
			@include adaptiveValue('gap', 20, 10, 767, 479, 1);

			@media (max-width: $mobile) {
				flex-direction: column;
			}
		}
		/* .about__left */
		&__left {
			flex: 0 1 rem(560);

			display: flex;
			flex-direction: column;
			gap: rem(10);

			@media (max-width: $mobile) {
				flex: 0 1 auto;
			}
		}
		/* .about__right */
		&__right {
			flex: 0 1 rem(677);
			align-self: flex-end;

			display: flex;
			flex-direction: column;
			gap: rem(10);

			@media (max-width: $tablet) {
				align-self: center;
			}
			@media (max-width: $mobile) {
				flex: 0 1 auto;
			}
		}
		/* .about__block */
		&__block {
			display: flex;
			flex-direction: column;
			gap: rem(10);
			/* .about__block-image */
			&-image {
				&--left {
					max-width: rem(560);
					width: 100%;
					// height: rem(592);
					@include adaptiveValue('height', 592, 280, 767, 479, 1);

					object-fit: cover;

					@media (max-width: $mobile) {
						max-width: 100%;
					}
				}
				&--right {
					max-width: rem(677);
					width: 100%;
					@include adaptiveValue('height', 502, 280, 767, 479, 1);

					object-fit: cover;

					@media (max-width: $mobile) {
						max-width: 100%;
					}
				}
			}
			/* .about__block-title */
			&-title {
				color: #3f2c24;
				font-family: Montserrat;
				@include adaptiveValue('font-size', 28, 18, 767, 479, 1);
				font-weight: 500;
				line-height: 130%;
				letter-spacing: rem(-1.1);
				text-transform: uppercase;
			}
			/* .about__block-text */
			&-text {
				color: #3f2c24;
				font-family: Montserrat;
				@include adaptiveValue('font-size', 20, 16, 767, 479, 1);
				line-height: 110%;
				letter-spacing: rem(-1.1);
			}
		}
	}
</style>
