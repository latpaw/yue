<?php include template("manage_header");?>

<div id="bdw" class="bdw">
<div id="bd" class="cf">
<div id="coupons">
	<div class="dashboard" id="dashboard">
		<ul><?php echo mcurrent_misc('comment'); ?></ul>
	</div>
    <div id="content" class="coupons-box clear mainwide">
		<div class="box clear">
            <div class="box-top"></div>
            <div class="box-content">
                <div class="head">
                    <h2>订单点评</h2>
                    <ul class="filter">
						<li><form action="/manage/misc/comment.php" method="get">项目ID：<input type="text" name="tid" value="<?php echo abs(intval($tid)); ?>" class="h-input" />&nbsp;内容：<input type="text" name="like" value="<?php echo htmlspecialchars($like); ?>" class="h-input" />&nbsp;<select name="cate"><?php echo Utility::Option($option_commentgrade, $cate, '所有分类'); ?></select>&nbsp;<input type="submit" value="筛选" class="formbutton"  style="padding:1px 6px;"/><form></li>
					</ul>
				</div>
                <div class="sect">
					<table id="orders-list" cellspacing="0" cellpadding="0" border="0" class="coupons-table">
					<tr><th width="80">项目ID</th><th width="80">类型</th><th width="360">内容</th><th width="80">状态</th><th width="80">日期</th><th width="100">操作</th></tr>
					<?php if(is_array($orders)){foreach($orders AS $index=>$one) { ?>
					<tr <?php echo $index%2?'':'class="alt"'; ?> id="team-list-id-<?php echo $one['id']; ?>">
						<td nowrap><?php echo $one['team_id']; ?></td>
						<td><?php echo htmlspecialchars($users[$one['user_id']]['username']); ?><br/><?php echo htmlspecialchars($users[$one['user_id']]['email']); ?></td>
						<td><?php echo htmlspecialchars($one['comment_content']); ?></td>
						<td nowrap><?php echo $one['comment_grade']; ?></td>
						<td nowrap><?php echo date('Y-n-j',$one['comment_time']); ?></td>
						<td class="op" nowrap><a href="/manage/misc/comment.php?action=r&id=<?php echo $one['id']; ?>&r=<?php echo $currefer; ?>" class="remove-record">删除</a>&nbsp;&nbsp;&nbsp;<?php if($one['comment_display'] == 'Y' ){?><a href="/manage/misc/comment.php?action=none&id=<?php echo $one['id']; ?>" class="display-none-record">在显示</a><?php } else { ?> <a href="/manage/misc/comment.php?action=block&id=<?php echo $one['id']; ?>" class="display-block-record">已屏蔽</a><?php }?></td>
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
