<?php
/**
 * This is a version of the heading field that allows for users to select text in admin and have it display with formatting that is passed
 * This file assumes that formatting comes in line as part of a span tag
 */
?>
<<?php echo $type; ?> class="<?php echo esc_attr( $class ); ?>"><?php echo strip_tags( $content, '<span>' ); ?></<?php echo $type; ?>>
