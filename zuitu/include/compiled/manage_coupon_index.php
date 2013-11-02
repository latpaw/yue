<?php include template("manage_header");?>

<div id="bdw" class="bdw">
<div id="bd" class="cf">
<div id="coupons">
	<div class="dashboard" id="dashboard">
		<ul><?php echo mcurrent_coupon('index'); ?></ul>
	</div>
    <div id="content" class="coupons-box clear mainwide">
		<div class="box clear">
            <div class="box-top"></div>
            <div class="box-content">
                <div class="head">
                    <h2>未消费<?php echo $INI['system']['couponname']; ?></h2>
					<ul class="filter">
						<li><form method="get">项目ID：<input type="text" class="h-input" name="tid" value="<?php echo htmlspecialchars($tid); ?>" >&nbsp;用户：<input type="text" class="h-input" name="uname" value="<?php echo htmlspecialchars($uname); ?>" >&nbsp;券编号：<input type="text" class="h-input" name="coupon" value="<?php echo htmlspecialchars($coupon); ?>" >&nbsp;<input type="submit" value="筛选" class="formbutton"  style="padding:1px 6px;"/><form></li>
					</ul>
				</div>
                <div class="sect">
					<table id="orders-list" cellspacing="0" cellpadding="0" border="0" class="coupons-table">
					<tr><th width="100">编号</th><th width="420">项目</th><th width="180">用户</th><th width="80" nowrap>截至日期</th><th width="40" nowrap>短信</th><th width="40" nowrap>操作</th></tr>
					<?php if(is_array($coupons)){foreach($coupons AS $index=>$one) { ?>
					<tr <?php echo $index%2?'':'class="alt"'; ?> id="order-list-id-<?php echo $one['id']; ?>">
						<td><?php echo $one['id']; ?></td>
						<td><?php echo $one['team_id']; ?>&nbsp;(<a class="deal-title" href="/team.php?id=<?php echo $one['team_id']; ?>" target="_blank"><?php echo $teams[$one['team_id']]['title']; ?></a>)</td>
						<td nowrap><?php echo $users[$one['user_id']]['email']; ?><br/><?php echo $users[$one['user_id']]['username']; ?></td>
						<td nowrap><?php echo date('Y-m-d',$one['expire_time']); ?></td>
						<td><?php echo $one['sms']; ?></td>
						<td class="op"><a href="/ajax/coupon.php?action=sms&id=<?php echo $one['id']; ?>" class="ajaxlink">短信</a></td>
					</tr>
					<?php }}?>
					<tr><td colspan="7"><?php echo $pagestring; ?></tr>
                    </table>
				</div>
            </div>
            <div class="box-bottom"></div>
        </div>
    </div>
</div>
</div> <!-- bd end -->
</div> <!-- bdw end -->

<?php include template("manage_footer");?>
