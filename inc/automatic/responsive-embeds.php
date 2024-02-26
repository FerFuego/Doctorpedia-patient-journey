<?php
//This function makes your wysiwyg videos resposive

add_filter('embed_oembed_html', 'cyb_oembed_html');
function cyb_oembed_html($output)
{
    return '<div class="embed-container full">' . $output . '</div>';
}
