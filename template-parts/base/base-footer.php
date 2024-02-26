<div class="b-footer">
    <div class="b-footer__body">
		<a href="<?php echo esc_url( home_url() ); ?>">
			<img 
				width="260"
				height="40"
				class="b-footer__logo" 
				src="<?php echo (get_field('footer__icon','option')) ? get_field('footer__icon','option')['url'] : get_template_directory_uri().'/icons/doctorpedia-logo.svg'; ?>" 
				alt="Doctorpedia Logo">
		</a>
		<div class="b-footer__content">
			<?php echo get_field('footer__copy','option'); ?>
		</div>
	</div>
	<div class="b-footer__container">
		<span class="b-footer__copy">© <?php echo date('Y'); ?> Doctorpedia™</span>
		<a class="b-footer__email" href="mailto:<?php the_field('email_contact','option');?>" target="_blank"><?php the_field('email_contact','option') ?></a>
		<ul class="b-footer__social">
			<?php if (get_field('social','option')) :
				foreach (get_field('social','option') as $social) : 
					if (isset($social['social__link'])) : ?>
						<li class="b-footer__social-item">
							<a class="b-footer__social-link" href="<?php echo $social['social__link']['url']; ?>" target="<?php echo $social['social__link']['target']; ?>">
								<?php if (isset($social['social__icon'])) : ?>
									<img 
										width="32" 
										height="32" 
										class="b-footer__social-icon" 
										src="<?php echo $social['social__icon']['url']; ?>"
										alt="doctorpedia social icon">
								<?php endif; ?>
							</a>
						</li>
					<?php endif;
				endforeach;
			endif; ?>
		</ul>
	</div>
</div>