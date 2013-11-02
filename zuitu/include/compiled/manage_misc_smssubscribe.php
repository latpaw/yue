<?php include template("manage_header");?>

<div id="bdw" class="bdw">
<div id="bd" class="cf">
<div id="coupons">
	<div class="dashboard" id="dashboard">
		<ul><?php echo mcurrent_misc('smssubscribe'); ?></ul>
	</div>
    <div id="content" class="coupons-box clear mainwide">
		<div class="box clear">
            <div class="box-top"></div>
            <div class="box-content">
                <div class="head">
                    <h2>短信订阅列表</h2>
					<ul class="filter">
						<li><form method="get">城市：<input type="text" name="cs" value="<?php echo htmlspecialchars($cs); ?>" class="h-input" />&nbsp;手机号：<input type="text" name="like" value="<?php echo htmlspecialchars($like); ?>" class="h-input" />&nbsp;<input type="submit" value="筛选" class="formbutton"  style="padding:1px 6px;"/><form></li>
					</ul>
				</div>
                <div class="sect">
					<table id="orders-list" cellspacing="0" cellpadding="0" border="0" class="coupons-table">
					<tr><th width="350">手机号</th><th width="80">城市</th><th width="350">密钥</th><th width="80">操作</th></tr>
					<?php if(is_array($subscribes)){foreach($subscribes AS $index=>$one) { ?>
					<tr <?php echo $index%2?'':'class="alt"'; ?> id="team-list-id-<?php echo $one['id']; ?>">
						<td nowrap><?php if(!empty($one['mobile'])){?><a href="/ajax/misc.php?action=sms&v=<?php echo $one['mobile']; ?>" class="ajaxlink" target="_blank" title="点击给该手机发送短信！"><?php echo $one['mobile']; ?></a><?php }?></td>
						<td nowrap><?php echo $cities[$one['city_id']]['name']; ?></td>
						<td nowrap><?php echo $one['secret']; ?></td>
						<td class="op" nowrap><a ask="删不删？" href="/ajax/manage.php?action=smssubscriberemove&id=<?php echo $one['id']; ?>" class="ajaxlink">删除</a></td>
					</tr>
					<?php }}?>
					<tr><td colspan="6"><?php echo $pagestring; ?></tr>
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
