<section class="feedback">
	<div class="feedback__container">
		<h2 class="feedback__title" data-aos="fade-up">
			Получите подборку проектов, которые мы не публиковали на сайте — с реальными планировками,
			цветами и стилями.
		</h2>
		<p class="feedback__subtitle" data-aos="fade-up">
			Оставьте контакт и наш менеджер подберёт подходящие идеи для вашего пространства.
		</p>

		<form action="" class="feedback__form" data-aos="fade-up">
			<input type="text" class="feedback__input" placeholder="Имя" />
			<input type="tel" class="feedback__input" placeholder="+7 (XXX) XXX-XX-XX" />
			<button type="submit" class="feedback__submit">
				<svg viewBox="0 0 11.8535 11.8535" width="11.853516" height="11.853516">
					<path
						d="M0.353516 0L11.8535 0L11.8535 11.5L10.8535 11.5L10.8535 0.5L11.3535 0.5L11.3535 1L0.353516 1L0.353516 0ZM11.7071 0.853553L0.707069 11.8536L-3.77595e-05 11.1464L11 0.146447L11.7071 0.853553Z"
						fill="rgb(250,248,245)" />
				</svg>
			</button>
		</form>
	</div>
</section>

<style lang="scss">
	.feedback {
		background-color: #ddd0c8;
		@include adaptiveValue('padding-top', 85, 30, 991, 767, 1);
		@include adaptiveValue('padding-bottom', 85, 30, 991, 767, 1);
		@include adaptiveValue('padding-left', 140, 0, 991, 767, 1);
		@include adaptiveValue('padding-right', 140, 0, 991, 767, 1);

		/* .feedback__container */
		&__container {
		}
		/* .feedback__title */
		&__title {
			color: #3f2c24;
			font-family: Montserrat;
			@include adaptiveValue('font-size', 36, 20, 767, 479, 1);
			font-weight: 600;
			line-height: 160%;
			letter-spacing: -3%;

			max-width: rem(1200);
			@include adaptiveValue('margin-bottom', 60, 20, 767, 479, 1);
		}
		/* .feedback__subtitle */
		&__subtitle {
			color: #3f2c24;
			font-family: Montserrat;
			@include adaptiveValue('font-size', 24, 18, 767, 479, 1);
			line-height: 140%;
			letter-spacing: rem(-1);
			text-align: right;

			max-width: rem(790);
			margin-left: auto;
			@include adaptiveValue('margin-bottom', 60, 20, 767, 479, 1);
		}

		/* .feedback__form */
		&__form {
			display: flex;
			align-items: center;
			gap: rem(10);
			@media (max-width: em(640)) {
				flex-direction: column;
			}
		}
		/* .feedback__input */
		&__input {
			color: #7b5e57;
			@include adaptiveValue('font-size', 20, 18, 767, 479, 1);

			line-height: 131%;
			letter-spacing: -0.5%;

			max-width: rem(265);
			width: 100%;
			border-radius: rem(40);
			background-color: rgba(#ffffff, 0.4);
			padding: rem(18) rem(20);
			transition: outline 0.3s ease 0s;

			&::placeholder {
				color: rgba(#7b5e57, 0.4);
			}

			&:focus {
				outline: rem(2) solid #ff6f20;
			}
		}
		/* .feedback__submit */
		&__submit {
			width: rem(41);
			height: rem(41);
			background-color: #ff6f20;
			border-radius: 50%;
		}
	}
</style>
