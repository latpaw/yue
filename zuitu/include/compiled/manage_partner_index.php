<?php include template("manage_header");?>

<div id="bdw" class="bdw">
<div id="bd" class="cf">
<div id="coupons">
	<div class="dashboard" id="dashboard">
		<ul><?php echo mcurrent_partner('index'); ?></ul>
	</div>
    <div id="content" class="coupons-box clear mainwide">
		<div class="box clear">
            <div class="box-top"></div>
            <div class="box-content">
                <div class="head">
                    <h2>商户</h2>
					<ul class="filter"><li><form method="get">商户名称：<input type="text" name="ptitle" class="h-input" value="<?php echo htmlspecialchars($ptitle); ?>" >&nbsp;<select name="open" class="h-input"><?php echo Utility::Option($option_open, $open, '展示'); ?></select>&nbsp;<select name="city_id" class="h-input"><?php echo Utility::Option(option_category('city'), $city_id, '全部城市'); ?></select>&nbsp;<select name="group_id" class="h-input"><?php echo Utility::Option(option_category('partner'), $group_id, '全部分类'); ?></select>&nbsp;<input type="submit" value="筛选" class="formbutton"  style="padding:1px 6px;"/><form></li></ul>
				</div>
                <div class="sect">
					<table id="orders-list" cellspacing="0" cellpadding="0" border="0" class="coupons-table">
					<tr><th width="40">ID</th><th width="320">名称</th><th width="60">分类</th><th width="120">联系人</th><th width="130">电话号码</th><th width="60">展示</th><th width="40">排序</th><th width="100">操作</th></tr>
					<?php if(is_array($partners)){foreach($partners AS $index=>$one) { ?>
					<tr <?php echo $index%2?'':'class="alt"'; ?> id="team-list-id-<?php echo $one['id']; ?>">
						<td><?php echo $one['id']; ?></td>
						<td style="text-align:left;"><a class="deal-title" href="/manage/partner/edit.php?id=<?php echo $one['id']; ?>"><?php echo $one['title']; ?></a></td>
						<td nowrap><?php echo $groups[$one['group_id']]; ?><br/><?php echo $cities[$one['city_id']]; ?></td>
						<td nowrap><?php echo $one['contact']; ?></td>
						<td nowrap><?php echo $one['phone']; ?><br/><?php echo $one['mobile']; ?></td>
						<td nowrap><?php echo $one['open']; ?></td>
						<td nowrap><?php echo $one['head']; ?></td>
						<td class="op" nowrap><a href="/manage/partner/edit.php?id=<?php echo $one['id']; ?>">编辑</a>｜<a href="/ajax/manage.php?action=partnerremove&id=<?php echo $one['id']; ?>" class="ajaxlink" ask="确定删除本商户？">删除</a></td>
					</tr>
					<?php }}?>
					<tr><td colspan="8"><?php echo $pagestring; ?></td></tr>
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
