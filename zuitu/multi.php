<?php
require_once(dirname(__FILE__) . '/app.php');

if (!$teams) { redirect( WEB_ROOT . '/team/index.php'); }

$now = time();
$detail = array();

foreach($teams AS $index => $team) {

	if($team['end_time']<$team['begin_time']){$team['end_time']=$team['begin_time'];}
	$diff_time = $left_time = $team['end_time']-$now;
	if ( $team['team_type'] == 'seconds' && $team['begin_time'] >= $now ) {
		$diff_time = $left_time = $team['begin_time']-$now;
	}

	/* progress bar size */
	$detail[$team['id']]['bar_size'] = ceil(190*($team['now_number']/$team['min_number']));
	$detail[$team['id']]['bar_offset'] = ceil(5*($team['now_number']/$team['min_number']));

	$left_day = floor($diff_time/86400);
	$left_time = $left_time % 86400;
	$left_hour = floor($left_time/3600);
	$left_time = $left_time % 3600;
	$left_minute = floor($left_time/60);
	$left_time = $left_time % 60;

	$detail[$team['id']]['diff_time'] = $diff_time;
	$detail[$team['id']]['left_day'] = $left_day;
	$detail[$team['id']]['left_hour'] = $left_hour;
	$detail[$team['id']]['left_minute'] = $left_minute;
	$detail[$team['id']]['left_time'] = $left_time;
	$detail[$team['id']]['is_today'] = $team['begin_time'] + 3600*24 > time() ? 1:0;

	/* state */
	$team['state'] = team_state($team);
	$teams[$index] = $team;
}
$team = null;
if($INI['option']['indexmultimeituan'] == 'Y'){
	if (count($teams)%2 == 1) {
		$first_big = true;
		$first = array_shift($teams);
	}
	include template('team_meituan');
}else {
	include template('team_multi');
};
