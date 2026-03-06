<section class="company">
	<div class="company__container">
		<h2 class="company__title" data-aos="fade-up">о компании</h2>

		<header class="company__header" data-aos="fade-up">
			<h3 class="company__heading">
				Производитель,
				<p>которому доверяют</p>
			</h3>
			<p class="company__text">Мы рядом с Вами — от идеи до сборки</p>
		</header>

		<div class="company__content">
			<img src="/img/About/company/image.jpg" alt="" class="company__image" data-aos="zoom-in" />

			<div class="company__wrapper">
				<ul class="company__items">
					<li class="company__item company__item--big" data-aos="zoom-in">
						<div class="company__item-top">
							<p class="company__item-text">
								<span>12 лет</span>
								опыта
							</p>
						</div>

						<div class="company__item-bottom">
							<p class="company__item-text">Работаем с 2013 года.</p>
							<p class="company__item-text">Более 1500 реализованных кухонь.</p>
						</div>
					</li>

					<li class="company__item" data-aos="zoom-in">
						<div class="company__item-top">
							<p class="company__item-text">
								<span>3D</span>
								проект за 1 день
							</p>
						</div>

						<div class="company__item-bottom">
							<p class="company__item-text">
								Бесплатно на этапе консультации — вы сразу увидите будущую мебель
							</p>
						</div>
					</li>
				</ul>
				<ul class="company__items">
					<li class="company__item" data-aos="zoom-in">
						<div class="company__item-top">
							<svg viewBox="0 0 71.25 71.25" width="71.25" height="71.25" fill="none">
								<path
									d="M68.25 35.625C68.25 53.6412 53.6412 68.25 35.625 68.25C17.6088 68.25 3 53.6412 3 35.625C3 17.6088 17.6088 3 35.625 3C53.6412 3 68.25 17.6088 68.25 35.625Z"
									stroke="rgb(123,94,87)"
									stroke-width="6" />

								<path
									d="M35.625 3C53.6413 3 68.25 17.6088 68.25 35.625"
									stroke="rgb(255,111,32)"
									stroke-width="6">
									<animateTransform
										attributeName="transform"
										attributeType="XML"
										type="rotate"
										from="0 35.625 35.625"
										to="360 35.625 35.625"
										dur="3s"
										repeatCount="indefinite" />
								</path>
							</svg>

							<p class="company__item-text">от эскиза до установки</p>
						</div>

						<div class="company__item-bottom">
							<p class="company__item-text">Собственная фабрика</p>
						</div>
					</li>

					<li class="company__item company__item--big" data-aos="zoom-in">
						<div class="company__item-top">
							<p class="company__item-text">
								<span>98%</span>
								довольных клиентов
							</p>
						</div>

						<div class="company__item-bottom">
							<p class="company__item-text">По итогам опросов и повторных обращений</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.company {
		@include adaptiveValue('padding-bottom', 65, 35, 991, 767, 1);

		/* .company__container */
		&__container {
		}
		/* .company__title */
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
		/* .company__header */
		&__header {
			display: flex;
			justify-content: space-between;
			gap: rem(20);

			@include adaptiveValue('margin-bottom', 60, 30, 991, 767, 1);

			@media (max-width: $tablet) {
				flex-direction: column;
			}
		}
		/* .company__heading */
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
		/* .company__text */
		&__text {
			color: #3f2c24;
			font-family: Montserrat;
			@include adaptiveValue('font-size', 32, 16, 767, 479, 1);
			line-height: 140%;
			letter-spacing: rem(-1);
			text-align: right;

			@include adaptiveValue('max-width', 330, 170, 767, 479, 1);

			@media (max-width: $tablet) {
				margin: 0 0 0 auto;
			}
		}

		/* .company__content */
		&__content {
			display: grid;
			grid-template-columns: minmax(auto, rem(910)) minmax(auto, rem(910));
			gap: rem(20);
			@media (max-width: em(1300)) {
				display: flex;
				flex-direction: column;
			}
		}
		/* .company__image */
		&__image {
			max-width: rem(910);
			width: 100%;
			height: rem(490);
			@include adaptiveValue('height', 490, 314, 991, 767, 1);
			object-fit: cover;
			@media (max-width: em(1300)) {
				max-width: 100%;
			}
		}
		/* .company__wrapper */
		&__wrapper {
			display: flex;
			// gap: rem(20);
			@include adaptiveValue('gap', 20, 10, 991, 767, 1);
			@media (max-width: $mobile) {
				flex-direction: column;
			}
		}
		/* .company__items */
		&__items {
			flex: 1;

			display: flex;
			flex-direction: column;
			@include adaptiveValue('gap', 20, 10, 991, 767, 1);
		}
		/* .company__item */
		&__item {
			flex: 1;

			display: flex;
			flex-direction: column;
			gap: rem(10);

			background-color: #ddd0c8;
			// padding: rem(22);
			@include adaptiveValue('padding', 22, 12, 767, 479, 1);

			&--big {
				flex: 2;
				max-height: rem(294);
			}

			/* .company__item-top */
			&-top {
				display: flex;
				align-items: flex-end;
				gap: rem(20);
			}
			/* .company__item-text */
			&-text {
				color: #7b5e57;
				font-family: Montserrat;
				// font-size: rem(20);
				@include adaptiveValue('font-size', 20, 18, 767, 479, 1);

				// line-height: 110%;
				letter-spacing: rem(-1.1);

				span {
					// font-size: rem(80);
					@include adaptiveValue('font-size', 80, 40, 767, 479, 1);
				}
			}
			/* .company__item-bottom */
			&-bottom {
				flex: 1;
				align-content: flex-end;
			}
			/* .company__item-icon */
			&-icon {
			}
		}
	}
</style>
