<?php include template("manage_header");?>

<div id="bdw" class="bdw">
<div id="bd" class="cf">
<div id="coupons">
	<div class="dashboard" id="dashboard">
		<ul><?php echo mcurrent_misc('invite'); ?></ul>
	</div>
    <div id="content" class="coupons-box clear mainwide">
		<div class="box clear">
            <div class="box-top"></div>
            <div class="box-content">
                <div class="head">
				<?php if('index'==$s){?>
                    <h2>待返邀请 (总金额：<span class="currency"><?php echo $currency; ?></span><?php echo $summary; ?>)</h2>
				<?php } else if('record'==$s) { ?>
                    <h2>返利邀请 (总金额：<span class="currency"><?php echo $currency; ?></span><?php echo $summary; ?>)</h2>
				<?php } else { ?>
                    <h2>违规记录</h2>
				<?php }?>
					<ul class="filter"><?php echo mcurrent_misc_invite($s); ?></ul>
				</div>
				<div class="sect" style="padding:0 10px;">
					<form method="get">
						<input type="hidden" name="s" value="<?php echo $s; ?>" />
						<p style="margin:5px 0;">邀请用户：<input type="text" name="iuser" value="<?php echo htmlspecialchars($iuser); ?>" class="h-input" />&nbsp;被邀用户：<input type="text" name="puser" value="<?php echo htmlspecialchars($puser); ?>" class="h-input" />&nbsp;项目ID：<input type="text" name="tid" value="<?php echo abs(intval($tid)); ?>" class="h-input" /></p>
						<p stype="margin:5px 0;">邀请日期：<input type="text" class="h-input" onFocus="WdatePicker({isShowClear:false,readOnly:true})" name="iday" value="<?php echo $iday; ?>" />&nbsp;购买日期：<input type="text" class="h-input" onFocus="WdatePicker({isShowClear:false,readOnly:true})" name="pday" value="<?php echo $pday; ?>" />&nbsp;<input type="submit" value="筛选" class="formbutton"  style="padding:1px 6px;"/></p>
					<form>
				</div>
                <div class="sect">
					<table id="orders-list" cellspacing="0" cellpadding="0" border="0" class="coupons-table">
					<tr><th width="350">项目</th><th width="150">主动用户</th><th width="150">被邀用户</th><th width="140">邀买时间</th><?php if('index'==$s){?><th width="150">操作</th><?php } else { ?><th width="150">操作员</th><?php }?></tr>
					<?php if(is_array($invites)){foreach($invites AS $index=>$one) { ?>
					<tr <?php echo $index%2?'':'class="alt"'; ?> id="order-list-id-<?php echo $one['id']; ?>">
						<td><a class="deal-title" href="/team.php?id=<?php echo $one['team_id']; ?>" target="_blank"><?php echo $one['team_id']; ?>(<?php echo $teams[$one['team_id']]['title']; ?>)</a></td>
						<td nowrap><a class="ajaxlink" href="/ajax/manage.php?action=userview&id=<?php echo $one['user_id']; ?>"><?php echo $users[$one['user_id']]['email']; ?></a><br/><?php echo $users[$one['user_id']]['username']; ?><br/><?php echo $one['user_ip']; ?><?php if(Utility::IsMobile($users[$one['user_id']]['mobile'])){?><br/><a href="/ajax/misc.php?action=sms&v=<?php echo $users[$one['user_id']]['mobile']; ?>" class="ajaxlink"><?php echo $users[$one['user_id']]['mobile']; ?></a><?php }?></td>
						<td nowrap><a class="ajaxlink" href="/ajax/manage.php?action=userview&id=<?php echo $one['other_user_id']; ?>"><?php echo $users[$one['other_user_id']]['email']; ?></a><br/><?php echo $users[$one['other_user_id']]['username']; ?><br/><?php echo $one['other_user_ip']; ?><?php if(Utility::IsMobile($users[$one['user_id']]['mobile'])){?><br/><a href="/ajax/misc.php?action=sms&v=<?php echo $users[$one['other_user_id']]['mobile']; ?>" class="ajaxlink"><?php echo $users[$one['other_user_id']]['mobile']; ?></a><?php }?></td>
						<td nowrap><?php echo date('Y-m-d H:i', $one['create_time']); ?><br/><?php echo date('Y-m-d H:i', $one['buy_time']); ?><br/>返利：<?php echo $currency; ?><?php echo $one['credit']; ?></td>
						<td class="op" nowrap><?php if('index'==$s){?><a href="/ajax/manage.php?action=inviteok&id=<?php echo $one['id']; ?>" class="ajaxlink" ask="确认邀请返利成功？">确认</a>｜<a href="/ajax/manage.php?action=inviteremove&id=<?php echo $one['id']; ?>" ask="确定取消本条待返记录？" class="ajaxlink">取消</a><?php } else { ?><?php echo $users[$one['admin_id']]['email']; ?><br/><?php echo $users[$one['admin_id']]['username']; ?><?php }?></td>
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
