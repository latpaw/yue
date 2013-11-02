<?php include template("manage_header");?>

<div id="bdw" class="bdw">
<div id="bd" class="cf">
<div id="coupons">
	<div class="dashboard" id="dashboard">
		<ul><?php echo mcurrent_misc('logger'); ?></ul>
	</div>
    <div id="content" class="coupons-box clear mainwide">
		<div class="box clear">
            <div class="box-top"></div>
            <div class="box-content">
                <div class="head">
                     <h2>管理员操作日志</h2>
						<ul class="filter">
							<li><form action="/manage/misc/logger.php" method="get">项目：
								<input type="text" class="h-input" name="search" value="<?php echo htmlspecialchars($title); ?>" >&nbsp;<select name="type"><?php echo Utility::Option($option_logger, $type, '分类'); ?></select>&nbsp;<input type="submit" value="筛选" class="formbutton"  style="padding:1px 6px;"/>
								</form></li>
							<li><form action="/manage/misc/logger.php" method="post">
								<input type="hidden" name="clear_data" value="1" />
								<input type="submit" value="清空操作日志" class="formbutton"  style="padding:1px 6px;" onclick="return confirm('确定清空数据？')";/>
								</form></li>
						</ul>
				</div>
                <div class="sect">
					<table id="orders-list" cellspacing="0" cellpadding="0" border="0" class="coupons-table">
					<tr>
						<th width="60">记录id</th>
						<th width="60">用户id</th>
						<th width="100">邮箱</th>
						<th width="50">类型</th>
						<th width="300">操作</th>
						<th width="260">相关数据</th>
						<th width="80">时间</th>
					</tr>
					<?php if(is_array($logs)){foreach($logs AS $index=>$one) { ?>
					<tr <?php echo $index%2?'':'class="alt"'; ?> id="team-list-id-<?php echo $one['id']; ?>">
						<td><?php echo $one['id']; ?></td>
						<td><?php echo $one['user_id']; ?></td>
						<td><?php echo $one['user_email']; ?></td>
						<td><?php echo $one['type']; ?></td>
						<td><?php echo htmlspecialchars($one['operation']); ?></td>
						<td><a href="/ajax/logger.php?action=relate_data&id=<?php echo $one['id']; ?>" class="ajaxlink">查看详细数据</a></td>
						<td><?php echo $one['create_on']; ?></td>
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
