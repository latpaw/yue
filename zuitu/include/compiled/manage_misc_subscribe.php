<?php include template("manage_header");?>

<div id="bdw" class="bdw">
<div id="bd" class="cf">
<div id="coupons">
	<div class="dashboard" id="dashboard">
		<ul><?php echo mcurrent_misc('subscribe'); ?></ul>
	</div>
    <div id="content" class="coupons-box clear mainwide">
		<div class="box clear">
            <div class="box-top"></div>
            <div class="box-content">
                <div class="head">
                    <h2>邮件订阅列表</h2>
					<ul class="filter">
						<li><a href="/manage/misc/ajax.php?action=importemail" class="ajaxlink">导入邮件列表</a></li>
					</ul>
				</div>
				<div class="sect" style="padding:0 10px;">
					<form method="get">
						<p style="margin:5px 0;">城市：<input type="text" name="cs" value="<?php echo htmlspecialchars($cs); ?>" class="h-input" />&nbsp;邮件：<input type="text" name="like" value="<?php echo htmlspecialchars($like); ?>" class="h-input" />&nbsp;<input type="submit" value="筛选" class="formbutton"  style="padding:1px 6px;"/><form></p>
				</div>
                <div class="sect">
					<table id="orders-list" cellspacing="0" cellpadding="0" border="0" class="coupons-table">
					<tr><th width="350">邮件地址</th><th width="80">城市</th><th width="350">密钥</th><th width="80">操作</th></tr>
					<?php if(is_array($subscribes)){foreach($subscribes AS $index=>$one) { ?>
					<tr <?php echo $index%2?'':'class="alt"'; ?> id="team-list-id-<?php echo $one['id']; ?>">
						<td nowrap><?php echo $one['email']; ?></td>
						<td nowrap><?php echo $cities[$one['city_id']]['name']; ?></td>
						<td nowrap><?php echo $one['secret']; ?></td>
						<td class="op" nowrap><a ask="删不删？" href="/ajax/manage.php?action=subscriberemove&id=<?php echo $one['id']; ?>" class="ajaxlink">删除</a></td>
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
