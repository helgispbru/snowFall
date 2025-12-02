//<?php
/**
 * snowFall
 *
 *
 * @category    plugin
 * @version     0.1
 * @license     http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @package     Evolution CMS
 * @internal    @events OnWebPageInit
 * @internal    @modx_category Content
 * @internal    @properties
 * @internal    @installset base
 * @reportissues
 * @documentation
 * @author      plugin author Grinyaha
 * @lastupdate  02/12/2025
 */

$src = '<script src="/assets/plugins/snowfall/snow-fall.js?v=1"></script>';
$modx->regClientScript($src, true);