<?php
	//ACF
	$description = get_sub_field('description');

	//Media Content
	$mediaSelector = get_sub_field('media_selector');
	$image = get_sub_field('image');
	$video = get_sub_field('video');
	$form = get_sub_field('form');
	$text = get_sub_field('text');

	//Option
	$reverseOrder = get_sub_field('content_order');
?>

<div class="m-left-right">

	<div class="container">

		<?php WcanvasSEOTextField::display('title', ['class' => 'm-left-right__title']); ?>
	
		<div class="m-left-right__container<?php echo $reverseOrder ? ' m-left-right__container--reverse-order' : ''; ?>">

			<?php //Text Container ?>
			<div class="m-left-right__text-content">

				<?php WcanvasSEOTextField::display('title_section_text', ['class' => 'm-left-right__text-content-title']); ?>

				<?php if($description): ?>

					<div class="m-left-right__text-content-description"><?php echo $description; ?></div>

				<?php endif; ?>
	
			</div>
				
			<?php //Media Container ?>
			<div class="m-left-right__media-content">

				<?php if($mediaSelector == 'image' && $image): ?>

					<img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_url($image['url']) ?>">
				
				<?php elseif($mediaSelector == 'video' && $video): ?>

					<?php echo $video; ?>

				<?php elseif($mediaSelector == 'form' && $form): ?>

					<?php echo do_shortcode('[gravityform id="' . $form . '" title="false" description="false" ajax="true" tabindex="49"]'); ?>

				<?php elseif($mediaSelector == 'text' && $text): ?>

					<div><?php echo $text; ?></div>

				<?php endif; ?>

			</div>
	
		</div>
	
		<?php buttonSupport('m-left-right__cta'); ?>

	</div>

</div>