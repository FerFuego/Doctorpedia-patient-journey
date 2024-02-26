<?php
	//ACF
	$wysiwyg = get_sub_field('description');
?>

<div class="m-basic-text">

	<div class="container">

		<?php WcanvasSEOTextField::display('title', ['class' => 'm-basic-text__title']); ?>

		<?php if($wysiwyg): ?>

			<div class="m-basic-text__wysiwyg"><?php echo $wysiwyg; ?></div>

		<?php endif; ?>

	</div>

</div>
