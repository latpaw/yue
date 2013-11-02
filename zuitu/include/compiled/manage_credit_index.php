<?php include template("manage_header");?>

<div id="bdw" class="bdw">
<div id="bd" class="cf">
<div id="coupons">
	<div class="dashboard" id="dashboard">
		<ul><?php echo mcurrent_credit('index'); ?></ul>
	</div>
    <div id="content" class="coupons-box clear mainwide">
		<div class="box clear">
            <div class="box-top"></div>
            <div class="box-content">
                <div class="head">
                    <h2>积分记录</h2>
                    <ul class="filter">
						<li><form action="/manage/credit/index.php" method="get">用户：<input type="text" name="uemail" class="h-input" value="<?php echo htmlspecialchars($uemail); ?>" >&nbsp;<select name="action" style="width:120px;"><?php echo Utility::Option($option_action, $action, '所有操作'); ?></select>&nbsp;<input type="submit" value="筛选" class="formbutton"  style="padding:1px 6px;"/><form></li>
					</ul>
				</div>
                <div class="sect">
					<table id="orders-list" cellspacing="0" cellpadding="0" border="0" class="coupons-table">
					<tr><th width="50">ID</th><th width="200">Email/用户名</th><th width="100" nowrap>姓名/城市</th><th width="40">积分</th><th width="400">详情</th><th width="100">操作</th></tr>
					<?php if(is_array($credits)){foreach($credits AS $index=>$one) { ?>
					<tr <?php echo $index%2?'':'class="alt"'; ?> id="team-list-id-<?php echo $one['id']; ?>">
						<td><?php echo $one['id']; ?></td>
						<td><?php echo $users[$one['user_id']]['email']; ?><br/><?php echo $users[$one['user_id']]['username']; ?><?php if(Utility::IsMobile($users[$one['user_id']]['mobile'])){?>&nbsp;&raquo;&nbsp;<a href="/ajax/misc.php?action=sms&v=<?php echo $users[$one['user_id']]['mobile']; ?>" class="ajaxlink">短信</a><?php }?></td>
						<td><?php echo $users[$one['user_id']]['realname']?$users[$one['user_id']]['realname']:'----';; ?><br/><?php if($users[$one['user_id']]['city_id']){?><?php echo $allcities[$users[$one['user_id']]['city_id']]['name']; ?><?php } else { ?>其他<?php }?></td>
						<td><span class="currency"></span><?php echo moneyit($one['score']); ?></td>
						<td><?php echo ZCredit::Explain($one); ?></td>
						<td>操作</td>
					</tr>
					<?php }}?>
					<tr><td colspan="8"><?php echo $pagestring; ?></tr>
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
