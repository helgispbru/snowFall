//<?php
/**
 * snowFall
 *
 * Snowflakes for your website
 *
 * @category    plugin
 * @version     0.2.1
 * @license     http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal    @events OnWebPageInit
 * @internal    @properties {"snow_templates":[{"label":"ID шаблонов где падают снежинки","type":"text","value":"","default":"","desc":"id через запятую"}],"snow_max":[{"label":"Количество снежинок","type":"number","value":"60","default":"60","desc":""}],"snow_color":[{"label":"Цвета снежинок","type":"text","value":"b9dff5,7fc7ff,7fb0ff,7fc7ff,b9dff5","default":"b9dff5,7fc7ff,7fb0ff,7fc7ff,b9dff5","desc":"коды цветов css через запятую"}],"snow_type":[{"label":"Шрифты","type":"text","value":"Times,Arial,Verdana","default":"Times,Arial,Verdana","desc":"названия шрифтов через запятую"}],"snow_letter":[{"label":"Символ снежинки","type":"text","value":"❅","default":"❅","desc":""}],"snow_speed":[{"label":"Скорость падения","type":"text","value":"0.6","default":"0.6","desc":"0.5 - это очень медленно, 1 - нормально"}],"snow_size_min":[{"label":"Размер min","type":"text","value":"22","default":"22","desc":""}],"snow_size_max":[{"label":"Размер max","type":"text","value":"8","default":"8","desc":""}],"snow_zone":[{"label":"Зона появления","type":"text","value":"1","default":"1","desc":"1 - везде, 2 - слева, 3 - центр, 4 - справа"}]}
 * @internal    @modx_category Manager and Admin
 * @author      plugin author Grinyaha
 * @lastupdate  03/12/2025
 */

$src = '<script type="text/javascript">
// Количество снежинок
const snowMax = ' . $snow_max . ';

// Цвета снежинок
const snowColor = ["#' . implode('", "#', array_map('trim', explode(',', $snow_color))) . '"];

// Шрифты
const snowType = ["' . implode('", "', explode(',', $snow_type)) . '"];

// Символ
const snowLetter = "' . $snow_letter . '";

// Скорость падения (теперь 0.5 - это очень медленно, 1 - нормально)
// Я поставил 0.6 для плавного падения
const sinkSpeed = ' . $snow_speed . ';

// Размеры
const snowMaxSize = ' . $snow_size_min . ';
const snowMinSize = ' . $snow_size_max . ';

// Зоны: 1 - везде, 2 - слева, 3 - центр, 4 - справа
const snowingZone = ' . $snow_zone . ';
</script>
<script src="/assets/plugins/snowfall/snow-fall.js?v=1.01"></script>';
$cur_tpl = $modx->getDocument($modx->documentIdentifier)['template'];

if(!empty($snow_templates)) {
    $tpls = explode(',', $snow_templates);
    if (in_array($cur_tpl, $tpls)) {
        $modx->regClientScript($src, true);
    }
} else {
    $modx->regClientScript($src, true);
}