<section class="workflow">
	<div class="workflow__container">
		<h2 class="workflow__title" data-aos="fade-up">Как это работает</h2>

		<div class="workflow__wrapper">
			<div class="workflow__inner" data-aos="fade-up">
				<ul class="workflow__lists">
					<li class="workflow__list">
						<span>01/</span>
						Заполните конструктор на сайте
					</li>
					<li class="workflow__list">
						<span>02/</span>
						Получите приглашение на бесплатную консультацию в шоу-рум
					</li>
					<li class="workflow__list">
						<span>03/</span>
						Получите 3D проект и цену
					</li>
					<li class="workflow__list">
						<span>04/</span>
						Мы делаем замер и финальный проект
					</li>
					<li class="workflow__list">
						<span>05/</span>
						Производим и монтируем мебель
					</li>
					<li class="workflow__list">
						<a href="/calculator" class="workflow__list-link">
							<svg width="33.603516" height="26.012695" viewBox="0 0 33.6035 26.0127" fill="none">
								<path
									d="M1.43 14.44C1.05 14.44 0.69 14.29 0.42 14.02C0.15 13.75 0 13.38 0 13C0 12.62 0.15 12.25 0.42 11.98C0.69 11.72 1.05 11.56 1.43 11.56L1.43 14.44ZM1.43 11.56L32.1 11.56L32.1 14.44L1.43 14.44L1.43 11.56Z"
									fill="#FF6F20" />
								<path d="M20.6 1.5L32.1 13L20.6 24.5" stroke="#FF6F20" stroke-width="3.000000" />
							</svg>
							<div>
								<p>Перейти</p>
								в калькулятор
							</div>
						</a>
					</li>
				</ul>
			</div>

			<div class="workflow__content" data-aos="fade-up">
				<h3 class="workflow__heading">
					Как заказать <p>мебель?</p>
				</h3>
				<a href="/calculator" class="workflow__link">Запустить калькулятор</a>
			</div>

			<img src="/img/Home/workflow/image.jpeg" alt="" class="workflow__image" data-aos="fade-up" />
		</div>
	</div>
</section>

<style lang="scss">
	.workflow {
		// @include adaptiveValue('padding-top', 65, 45, 991, 479, 1);
		@include adaptiveValue('padding-bottom', 65, 45, 991, 479, 1);

		/* .workflow__container */
		&__container {
			@media (max-width: em(1300)) {
				display: grid;
				grid-template-columns: 1fr minmax(auto, rem(270));
			}
		}
		/* .workflow__title */
		&__title {
			color: #7b5e57;
			// font-size: rem(40);
			@include adaptiveValue('font-size', 40, 30, 991, 767, 1);
			font-weight: 300;
			line-height: 150%;
			letter-spacing: rem(-1.1);
			text-transform: uppercase;

			// margin-bottom: rem(50);
			@include adaptiveValue('margin-bottom', 50, 20, 991, 767, 1);

			@media (max-width: em(1300)) {
				grid-column: 1/3;
				grid-row: 1/2;
			}

			@media (max-width: $mobile) {
				@include adaptiveValue('font-size', 30, 16, 767, 479, 1);
				margin-bottom: rem(10);
			}
		}
		/* .workflow__wrapper */
		&__wrapper {
			display: grid;
			grid-template-columns: minmax(auto, rem(445)) minmax(auto, rem(678)) auto;
			gap: rem(20);
			// padding-left: rem(115);
			@include adaptiveValue('padding-left', 115, 0, 1920, 1300, 1);

			@media (max-width: em(1300)) {
				display: contents;
			}
		}
		/* .workflow__inner */
		&__inner {
			position: relative;

			&::before,
			&::after {
				content: '';
				position: absolute;
				left: 0;
				width: 100%;
				// height: rem(120);
				@include adaptiveValue('height', 120, 60, 991, 767, 1);
				z-index: 2;
			}

			&::before {
				top: 0;
				background: linear-gradient(to bottom, rgba(#faf8f5, 0.9), transparent);
			}

			&::after {
				bottom: 0;
				background: linear-gradient(to top, rgba(#faf8f5, 0.9), transparent);
			}

			@media (max-width: em(1300)) {
				grid-column: 1/2;
				grid-row: 4/5;
				margin-right: rem(20);
			}

			@media (max-width: em(700)) {
				grid-column: 1/4;
				grid-row: 5/6;
				width: 100%;
			}
		}
		/* .workflow__lists */
		&__lists {
			// height: rem(450);
			@include adaptiveValue('height', 450, 270, 991, 767, 1);
			overflow: auto;
			scrollbar-width: none;

			// padding: rem(120) 0;
			@include adaptiveValue('padding-top', 120, 60, 991, 767, 1);
			@include adaptiveValue('padding-bottom', 120, 60, 991, 767, 1);
		}
		/* .workflow__list */
		&__list {
			display: flex;
			align-items: center;
			// gap: rem(60);
			@include adaptiveValue('gap', 60, 20, 767, 479, 1);

			color: #3f2c24;
			font-family: Montserrat;
			// font-size: rem(22);
			@include adaptiveValue('font-size', 22, 18, 767, 479, 1);
			font-weight: 500;
			line-height: 130%;
			letter-spacing: rem(-1.1);

			&:not(:last-child) {
				// margin-bottom: rem(60);
				@include adaptiveValue('margin-bottom', 60, 30, 767, 479, 1);
			}

			span {
				flex: 0 0 rem(70);
				font-size: rem(40);
				font-weight: 300;
				line-height: 150%;
				text-transform: uppercase;
			}

			&-link {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;

				color: #ff6f20;
				font-family: Montserrat;
				font-size: rem(22);
				font-weight: 500;
				line-height: 130%;
				letter-spacing: rem(-1.1);

				svg {
					flex: 0 0 rem(50);
				}
			}
		}
		/* .workflow__content */
		&__content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			@media (max-width: em(1300)) {
				display: contents;
			}
		}
		/* .workflow__heading */
		&__heading {
			color: #3f2c24;
			// font-size: rem(80);
			@include adaptiveValue('font-size', 80, 34, 767, 479, 1);
			font-weight: 500;
			line-height: 110%;
			letter-spacing: -1.1%;
			text-align: center;

			// margin-bottom: rem(45);
			@include adaptiveValue('margin-bottom', 45, 20, 991, 767, 1);

			@media (max-width: em(1300)) {
				grid-column: 1/3;
				grid-row: 2/3;
			}

			p {
				font-weight: 300;
				font-style: italic;
			}
		}
		/* .workflow__link */
		&__link {
			color: #ff6f20;
			font-size: rem(24);
			line-height: 150%;
			letter-spacing: rem(-1);

			position: relative;

			@media (max-width: em(1300)) {
				grid-column: 1/3;
				grid-row: 3/4;
				text-align: center;

				margin-bottom: rem(30);
			}

			&:before {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: -1;

				display: block;
				// width: rem(100);
				// height: rem(100);

				@include adaptiveValue('width', 100, 70, 991, 767, 1);
				@include adaptiveValue('height', 100, 70, 991, 767, 1);
				border-radius: 50%;
				background: radial-gradient(circle, #ff6f20 0%, rgba(#faf8f5, 0.6) 60%, transparent 100%);
				opacity: 0;
				animation: pulse-opacity 2s infinite ease-in-out;
			}
		}
		/* .workflow__image */
		&__image {
			// width: rem(600);
			height: rem(456);
			@include adaptiveValue('width', 600, 270, 1300, 767, 1);
			@include adaptiveValue('height', 456, 260, 1300, 767, 1);
			object-fit: cover;

			@media (max-width: em(1300)) {
				grid-column: 2/3;
				grid-row: 4/5;
				align-self: flex-end;
			}

			@media (max-width: em(700)) {
				grid-column: 1/3;
				grid-row: 4/5;
				width: 100%;
				@include adaptiveValue('height', 260, 84, 700, 479, 1);
				margin-bottom: rem(20);
			}
		}
	}

	@keyframes pulse-opacity {
		0%,
		100% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
	}
</style>
