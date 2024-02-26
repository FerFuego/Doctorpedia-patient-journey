<?php

new RedirectRules();

class RedirectRules
{
    public function __construct()
    {
        $this->homepage();
    }

    function homepage()
    {
        $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        if (home_url() == $actual_link || home_url() . '/' == $actual_link) {
            global $wp_query;
            $wp_query->set_404();
            status_header(404);
            get_template_part(404);
            exit();
        }
    }
}
