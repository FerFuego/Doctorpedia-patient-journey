<!-- Paginator -->
<div class="paginator">
    <?php
        // Previous page
        if ( $current_page > 1 ) {
            $prev_page = $current_page - 1;
            echo '<a href="javascript:void();" data-page="'. $prev_page .'" class="page-numbers"> < </a>';
        }  

        $edge_number_count = 2;            
        $start_number = $current_page - $edge_number_count;
        $end_number = $current_page + $edge_number_count;

        if ( ($start_number - 1) < 1 ) {
            $start_number = 1;
            $end_number = min($num_pages, $start_number + ($edge_number_count*2));
        }
        
        if ( ($end_number + 1) > $num_pages ) {
            $end_number = $num_pages;
            $start_number = max(1, $num_pages - ($edge_number_count*2));
        }
        
        if ($start_number > 1) echo '<a href="javascript:void(0);" data-page="1" class="page-numbers">1</a> ... ';
        
        for($i=$start_number; $i<=$end_number; $i++) {
            if ( $i == $current_page ) echo "<span class='page-numbers current'>$i</span>";
            else echo '<a href="javascript:void(0);" data-page="'. $i .'" class="page-numbers">'. $i .'</a>';
        }
        
        if ($end_number < $num_pages) echo ' ... <a href="javascript:void(0);" class="page-numbers" data-page="'. $num_pages .'">'. $num_pages .'</a> '; 

        // Next page
        if ( $current_page < $num_pages ) {
            $next_page = $current_page + 1;
            echo '<a href="javascript:void(0);" data-page="'. $next_page .'" class="page-numbers"> > </a>';
        }
    ?>
</div>